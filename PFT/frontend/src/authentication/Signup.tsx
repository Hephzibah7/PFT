import React from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useState } from 'react';
import formDataType from '../interfaces/formDataType';
import ErrorIcon from '@mui/icons-material/Error';
import {useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup=()=>{
  /**
     * State variables:
     * - formData: Stores the user's input data.
     * - checkmsg: Stores the error message when password and confirm password do not match.
     * - navigate: Used to navigate between pages.
     */
    const [formData, setFormData]=useState<formDataType|null>(null);
    const [checkmsg, setCheckMsg]=useState("");
    const navigate = useNavigate();

    /**
     * React Hook Form for form validation.
     * - mode: "onBlur" ensures validation triggers when input loses focus.
     * - errors: Stores validation error messages for form fields.
     */

    const {register, handleSubmit, formState:{errors}}=useForm({
        mode:"onBlur"
    });

    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
       const name=event.target.name;
       const value=event.target.value;
       setFormData(values=>({...values, [name]:value} as formDataType));
    }

     /**
     * Handles form submission.
     * - Sends user data to the backend API for signup.
     * - Displays success or error toast messages.
     * - Redirects to the login page upon successful signup.
     */
    const onSubmit=async()=>{
      try{
        const user={
            username:formData?.username,
            firstname:formData?.firstname,
            lastname:formData?.lastname,
            email:formData?.email,
            password:formData?.password
        }
        console.log(user);
        const response = await axios.post('http://localhost:4000/signup', user);
        if(response.status==200){
          toast.success("SignUp Successfull !", {
            position: "top-right",
            autoClose:2000,
          });
            setTimeout(()=>navigate("/login"), 2000);
        }
      }
      catch(error){
        toast.error("SignUp Failed! Try Again", {
                       position: "top-center",
                     });
      }
    }
    const passwordCheck=()=>{
        if(formData?.confirmpassword!=formData?.password){
            setCheckMsg("Password does not match");
        }
        else{
            setCheckMsg("");
        }

    }
    return (
        <>
       <div className='flex'>
        <div className='w-3/5 h-screen bg-[url(budget.jpg)] bg-contain bg-fixed bg-no-repeat'>
        </div>
        <div className='p-15 w-2/5 font-bold '>
           <div className='flex justify-end '>
            <p>Already member? <span className='text-blue-500 cursor-pointer' onClick={() => navigate("/login")}>Sign In</span></p>
           </div>
           <form onSubmit={handleSubmit(onSubmit)}>
           <div className='ml-15 mt-15'>
            <h1 className='text-5xl'>Sign Up</h1>
            <p className='mt-5 text-gray-400'>Plan Today for a Richer Tomorrow</p>
            <div className='mt-10 w-4/5'>
                <div className='mb-10 relative'>
                {errors.username?.message && <div className=' flex justify-end text-red-500 text-sm '>
                       <ErrorIcon/>
                        <p className='pl-2 pr-2'>{errors.username.message as string}</p>
                </div>}
                    <div>
                   <PersonOutlineIcon className='mr-5 '/>
                    <input
                    {...register("username", {
                      required:{
                        value:true,
                        message:'Username is required'
                      },
                      
                      })}
                     placeholder='Username ' className='outline-none' value={formData?.username} name="username" onChange={handleChange}/>
                    </div>
                    <hr className='mt-2 '></hr>
                </div>
                <div className='mb-10 relative'>
                {errors.firstname?.message && <div className='mb-1 flex justify-end text-red-500 text-sm'>
                       <ErrorIcon/>
                        <p className='pl-2 pr-2'>{errors.firstname.message as string}</p>
                </div>}
                    <div>
                    <PersonOutlineIcon className='mr-5 '/>
                    <input
                    {...register("firstname", {
                        required:{
                          value:true,
                          message:'First name is required'
                        },
                        
                        })}
                     placeholder='First Name' className='outline-none focus:bg-none' value={formData?.firstname} name="firstname" onChange={handleChange}/>
                    </div>
                    <hr className='mt-2'></hr>
                </div>
                <div className='mb-10'>
                {errors.lastname?.message && <div className='mb-1 flex justify-end text-red-500 text-sm'>
                       <ErrorIcon/>
                        <p className='pl-2 pr-2'>{errors.lastname.message as string}</p>
                </div>}
                    <div>
                    <PersonOutlineIcon className='mr-5 '/>
                    <input
                    {...register("lastname", {
                        required:{
                          value:true,
                          message:'Last name is required'
                        },
                        
                        })}
                     placeholder='Last Name' className='outline-none focus:bg-none' value={formData?.lastname} name="lastname" onChange={handleChange}/>
                    </div>
                    <hr className='mt-2'></hr>
                </div>

               <div>
               <div className='mb-10'>
               {errors.email?.message && <div className='flex justify-end text-red-500 text-sm'>
                       <ErrorIcon/>
                        <p className='pl-2 pr-2'>{errors.email.message as string}</p>
                </div>}
                    <div>
                        <AlternateEmailIcon className='mr-5'/>
                    <input
                    {...register("email", {
                        required:{
                          value:true,
                          message:'Email is required'
                        },
                        pattern: {
                          value: /^(.+)@(.+)$/,
                          message: 'Email is not valid'
                        },
                        minLength: {
                          value: 10,
                          message: 'Email should contain atleast 10 characters'
                        },
                        maxLength: {
                          value: 40,
                          message: 'Email not be more than 40 characters'
                        },
                        
                        })}
                     placeholder='Email' className='outline-none focus:bg-none' value={formData?.email} name="email" onChange={handleChange}/>
                    </div>
                    <hr className='mt-2'></hr>
                </div>
                
               </div>
               
                <div className='mb-10'>
                {errors.password?.message && <div className='mb-1 flex justify-end text-red-500 text-sm'>
                       <ErrorIcon/>
                        <p className='pl-2 pr-2'>{errors.password.message as string}</p>
                </div>}
                    <div>
                        <LockOpenIcon className='mr-5'/>
                    <input 
                    {...register("password", {
                        required:{
                          value:true,
                          message:'Password is required'
                        },
                        pattern: {
                          value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                          message: 'Password is not valid'
                        },
                        minLength: {
                          value: 8,
                          message: 'Password should contain atleast 8 characters'
                        },
                        maxLength: {
                          value: 20,
                          message: 'Password not be more than 20 characters'
                        },
                        
                        })}
                    placeholder='Password' type="password" className='outline-none' value={formData?.password} name="password" onChange={handleChange}/>
                    </div>
                    <hr className='mt-2'></hr>
                </div>
                <div className='mb-10'>
                {checkmsg && <div className='mb-1 flex justify-end text-red-500 text-sm'>
                       <ErrorIcon/>
                        <p className='pl-2 pr-2'>{checkmsg}</p>
                </div>}
                    <div>
                        <LockOpenIcon className='mr-5'/>
                    <input placeholder='Retype-Password' type="password" className='outline-none' value={formData?.confirmpassword} name="confirmpassword" onBlur={passwordCheck} onChange={handleChange}/>
                    </div>
                    <hr className='mt-2'></hr>
                </div>
            </div>
            <div>
                <button className='bg-blue-500 pt-3 pb-3 pl-15 pr-15 rounded-3xl text-white cursor-pointer'>SignUp</button>
                <ToastContainer />
            </div>
           </div>
           </form>
        </div>
       </div>
        </>
    )
}

export default Signup;
