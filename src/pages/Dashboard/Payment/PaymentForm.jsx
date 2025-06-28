import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams();
    const { user } = useAuth();
    const [error, setError] = useState("");
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // console.log(parcelId);

    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ["parcels", parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        },
    });

    if (isPending) {
        return "... loading";
    }

    console.log(parcelInfo);
    const amount = parcelInfo.cost;
    const amountInCents = amount * 100;
    // console.log('amount in cents : ', amountInCents, typeof amountInCents);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        // step-1 -->  validate the card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            setError(error.message);
            console.log("[error]", error);
        } else {
            setError("");
            console.log("[PaymentMethod]", paymentMethod);
            // step:2 --> create payment intent
            const res = await axiosSecure.post("/create-payment-intent", {
                amountInCents,
                parcelId,
            });

            const clientSecret = res.data.clientSecret;

            // step:3 --> confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email,
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
                
            } else {
                setError('');
                if (result.paymentIntent.status === "succeeded") {
                    console.log("Payment Succeed!");
                    const transactionId = result.paymentIntent.id;
                    console.log(result);
                    // step: 4 --> mark parcel "Paid", create payment history
                    const paymentData = {
                        parcelId,
                        email: user.email,
                        amount,
                        transactionId: transactionId,
                        paymentMethod: result.paymentIntent.payment_method_types
                    }

                    const paymentRes = await axiosSecure.post('/payments', paymentData);
                    if(paymentRes.data.insertedId){
                        // console.log('payment successfull');
                        await Swal.fire({
                            icon: 'success',
                            title: 'Payment has been successfull!',
                            html: `<strong>Transaction ID: </strong> <code>${transactionId}</code>`,
                            confirmButtonText: 'Go to My Parcels',
                        });

                        navigate('/dashboard/myParcels');
                    }
                }
            }
        }

        // console.log('response from intent: ', res);
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
            >
                <CardElement className="p-2 border rounded"></CardElement>
                <button
                    type="submit"
                    className="btn btn-primary text-black w-full"
                    disabled={!stripe}
                >
                    Pay ${amount}
                </button>

                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;
