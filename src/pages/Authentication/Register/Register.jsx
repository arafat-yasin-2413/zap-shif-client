import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const {createUser} = useAuth()

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
        .then(result=>{
            console.log(result);
        })
        .catch(error=>{
            console.error(error);
        })
        
    };

    const handleImageUpload = async(e) => {
        const image = e.target.files[0];
        console.log(image);
        const formData = new FormData();
        formData.append('image', image);

    }



    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Create Account</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        {/* name field */}
                        <label className="label">Your Name</label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className="input"
                            placeholder="your name"
                        />

                        {errors.email?.type === "required" && (
                            <p className="text-red-500">Name is Required</p>
                        )}
                        {/* porfile photo field */}
                        <label className="label">Your Profile Photo</label>
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            className="input"
                            placeholder="your profile photo"
                        />

                        
                        {/* email field */}
                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="input"
                            placeholder="Email"
                        />

                        {errors.email?.type === "required" && (
                            <p className="text-red-500">Email is Required</p>
                        )}

                        {/* password field */}
                        <label className="label">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                            })}
                            className="input"
                            placeholder="Password"
                        />

                        {errors.password?.type === "required" && (
                            <p className="text-red-500">Password is required</p>
                        )}

                        {errors.password?.type === "minLength" && (
                            <p className="text-red-500">
                                Password must be 6 characters or long
                            </p>
                        )}

                        
                        <button className="btn btn-primary text-black mt-4">
                            Register
                        </button>
                    </fieldset>
                    <p>
                        Already have an Account? <Link to="/login" className="btn btn-link">Login</Link>
                    </p>
                </form>

                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;
