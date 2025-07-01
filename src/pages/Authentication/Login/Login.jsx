import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
    const {user,signIn} = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location);
    // console.log(location.state.from);

    const from = location.state?.from || '/';

    const onSubmit = (data) => {
        console.log(data);
        signIn(data.email, data.password)
        .then(result => {
            console.log(result);
            navigate(from)
        })
        .catch(error=>{
            console.log(error);
        })
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Please Login</h1>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            className="input"
                            placeholder="Email"
                        />

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

                        <div>
                            <a className="link link-hover">Forgot password?</a>
                        </div>
                    <button className="btn btn-primary mt-4 text-black">Login</button>
                    </fieldset>

                    <p>
                        New to this website? <Link state={{ from }} to="/register" className="btn btn-link">Register</Link>
                    </p>
                </form>

                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;
