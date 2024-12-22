//import React from 'react'
import { useForm } from "react-hook-form";
import authService from "../../appwrite/auth";
import service from "../../appwrite/config";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Input";
import Button from "../Button";


function Register() {

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitHandler = async(data) => {
    const checkUser = await service.checkUserExist(data.email)
    if(checkUser){
      navigate("/login")
    }else{
      //console.log("user not exist")
      const userData = await authService.createAccount(data);
      //const startDate = new Date();
      if(userData){
        //console.log(userData);
        //console.log(typeof userData)
        await service.UserProfile(userData);
        navigate("/login")
        //console.log('userProfile created')
      }else{
        const errormsg = document.querySelector('#errorMsg')
        errormsg.innerHTML = 'All fields are necessary'
      }
    }
  }

  return (
    <div className="w-[100vw] h-[100vh] p-3 mx-auto bg-transparent flex justify-center items-center">
      <div className="w-[40vw] bg-[#151c2991]  p-6 rounded-3xl backdrop-blur-lg border-2 border-[#FFD700]">
        <h1 className="w-full text-center text-2xl font-sans font-bold mb-3 text-[#985398]">Register</h1>
        <p className="mt-2 text-center text-base text-white">
             Already have an account?&nbsp;
             <Link
                 to="/login"
                 className="font-medium text-primary transition-all text-[#FFD700] duration-200 hover:underline"
             >
                 Login In
             </Link>
        </p>
        <p id="errorMsg" className="text-red-900"></p>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className='space-y-5'>
                <Input
                label="Full Name: "
                placeholder="Enter your full name"
                id= "name"
                {...register("name", {
                    required: true,
                })}
                />
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                id="email"
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
                id="password"
                {...register("password", {
                    required: true,})}
                />
                <Button type="submit" className="w-full">
                    Register
                </Button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Register
