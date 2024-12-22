//import React from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import Input from "../Input";
import Button from "../Button";

function Login() {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const submitHandler = async(data) => {
      const login = await authService.login(data);
      const errorDiv = document.querySelector('#errorMsg');
      if(login){
        navigate("/home")
      }else{
        console.log("login error")
        errorDiv.innerHTML = 'Incorrect credentials , please enter correct Email or Password ';
        //navigate("/login")

      }
    }

    

  return (
    <div className="w-[100vw] h-[100vh] p-3 mx-auto bg-transparent flex justify-center items-center">
      <div className="w-[40vw] bg-[#151c2991]  p-6 rounded-3xl backdrop-blur-lg border-2 border-[#FFD700]">
        <h1 className="w-full text-center text-2xl font-sans font-bold mb-3 text-[#985398]">Login</h1>
        <p className="mt-2 text-center text-base text-white">
             Don&apos;t have an account?&nbsp;
             <Link
                 to="/register"
                 className="font-medium text-primary transition-all text-[#FFD700] duration-200 hover:underline"
             >
                 Register
             </Link>
        </p>
        <p className='text-red-900' id="errorMsg"></p>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,})}
                />
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </div>
        </form>
      </div>
    </div>
  )
}
export default Login;
