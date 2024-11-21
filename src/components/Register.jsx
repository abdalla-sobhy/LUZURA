import Header from "./Header"
import { useEffect, useState } from 'react';
import LoginCSS from '/public/styles/Login.module.css'
import { useNavigate } from "react-router-dom";

export default function Register(){

    const [form, setForm] = useState({
        name:"",
        password:"",
        email:""
    })

    const [errors, setErrors] = useState({
        nameError:'',
        passwordError:'',
        emailError:''
    })

    const navigateTo = useNavigate();

    const handleChange = (event) =>{
        const {name, value} = event.target
        setForm((prevValues) => ({
            ...prevValues,
            [name]: value
        }))
}

    async function signUp(){
            try {
            let userInfo = {...form};
            let result = await fetch("http://localhost:8000/api/register", {
                method:"POST",
                body:JSON.stringify(userInfo),
                headers:{
                    "content-type":'application/json',
                    "Accept":'application/json'
                }
            })
            if(result.ok){
                result = await result.json()
                localStorage.setItem("userInfo",JSON.stringify(result))
                navigateTo('/')
            }else{
                throw result
            }
        } catch (error) {
                let inErrors = await error.json()
                setErrors(prevErrors => ({
                    ...prevErrors,
                    emailError:inErrors.errors.email,
                    nameError:inErrors.errors.name,
                    passwordError:inErrors.errors.password
                }))
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('userInfo')){
            navigateTo('/')
        }
    },[])

    return(
        <div className="root">
            <Header 
            page="Register"
            />
            <div className='w-full h-fit flex items-center justify-center mt-20'>
                <form className={LoginCSS.form} onSubmit={(e) => e.preventDefault()}>

                <span className="flex justify-center">            
                    <img src="/src/assets/Screenshot_2024-10-12_001528-removebg-preview.png" className="w-80 h-60" alt="Flowbite Logo" />
                </span>
                    
<label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
<div className="flex pb-8">
  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
    </svg>
  </span>
  <input type="text" name='name' value={form.name} onChange={handleChange} id="website-admin" className={`name rounded-none rounded-e-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="elonmusk" />
</div>
<span className="nameInv -mt-5 pb-5 text-red-500">{errors.nameError}</span>


<label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
<div className="relative mb-6">
  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
    </svg>
  </div>
  <input type="email" name='email' value={form.email} onChange={handleChange} id="input-group-1" className={`email bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="example@gmail.com" />
</div>
<span className="emailInv -mt-5 pb-5 text-red-500">{errors.emailError}</span>


<label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
<div className="relative mb-6">
  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
    <img src='/src/assets/password-76.svg' className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"></img>
  </div>
  <input type="password" name='password' id="input-group-1" value={form.password} onChange={handleChange} className={`password bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="Password" />
</div>
<span className={`passwordInv -mt-5 pb-5 text-red-500`}>{errors.passwordError}</span>


<button onClick={signUp} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-yellow-700 to-yellow-300 hover:text-white dark:text-white">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 w-full bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
sign up
</span>
</button>
                </form>
            </div>
        </div>
    )
}