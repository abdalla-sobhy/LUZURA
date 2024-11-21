import { useState } from "react";

export default function CheckOldPassword(){

    const [errors, setErrors] = useState({
        ErrorOldPassword:'',
        ErrorNewPassword:'',
        ErrorConfPassword:'',
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);

    const toggleOldPasswordVisibility = () => {
        setShowOldPassword(!showOldPassword);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [passwordStats, setPasswordStats] = useState({
        oldPassword:'',
        password:'',
        ConfPassword:'',
    })

    const handleChange = (event) =>{
        const {name, value} = event.target
        setPasswordStats((prevValues) => ({
            ...prevValues,
            [name]: value
        }))
    }

    async function changePassword(){
        setErrors((prevErrors) => ({
            ...prevErrors,
            ErrorNewPassword:'',
            ErrorOldPassword:'',
            ErrorConfPassword:''
        }))
        if(passwordStats.ConfPassword == passwordStats.password){
        let result
        try {
            let userData = localStorage.getItem('userInfo')
            const specificString = '"id":'
            let index = userData.indexOf(specificString)
            const id = userData[index + specificString.length]
            let Passwords = {...passwordStats};
            result = await fetch(`http://localhost:8000/api/ChangePassword/${id}`, {
            method: "PUT",
            body:JSON.stringify(Passwords),
            headers:{
                "content-type":'application/json',
                "Accept":'application/json'
            }
        });
        if (result.ok) {
            window.location.href = 'http://localhost:5173/Profile'
        } else {
            throw result;
        }
        } catch (error) {
        let inErrors = await error.json()
        if(inErrors.errors){
            setErrors((prevErrors) => ({
                ...prevErrors,
                ErrorNewPassword: inErrors.errors.password[0],
            }))
        }else{
            setErrors((prevErrors) => ({
                ...prevErrors,
                ErrorOldPassword: 'That’s not the right password.',
            }))
        }
        }
        }else{
            setErrors((prevErrors) => ({
                ...prevErrors,
                ErrorConfPassword: "password doesn’t match",
            }))
        }
    }
    return(
        <>
            <div className="w-full h-full flex items-center">
                <div className="w-full flex justify-center">
                    <div className="w-1/4 flex justify-center flex-col gap-12">
                    <div className="w-full">
                            <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
                                <div className="flex flex-row">
                                    <input type={showOldPassword ? "text" : "password"} name="oldPassword" id="oldPassword" value={passwordStats.oldPassword} onChange={handleChange} className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" />
                                    <button className="bg-transparent -ml-14 z-0" onClick={toggleOldPasswordVisibility}>
                                        <img src={showOldPassword ? "/src/assets/eye.png" : "/src/assets/hidden.png"} className="h-8" alt="" />
                                    </button>
                                </div>
                                <div className="text-red-600">{errors.ErrorOldPassword}</div>
                        </div>
                        <div className="w-full">
                                <div className="flex flex-col">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                        <div className="flex flex-row">
                                            <input type={showPassword ? "text" : "password"} name="password" id="password" value={passwordStats.password} onChange={handleChange} className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" />
                                            <button className="bg-transparent -ml-14 z-0" onClick={togglePasswordVisibility}>
                                                <img src={showPassword ? "/src/assets/eye.png" : "/src/assets/hidden.png"} className="h-8" alt="" />
                                            </button>
                                        </div>
                                        <div className="text-red-600">{errors.ErrorNewPassword}</div>
                                </div>
                        </div>
                        <div className="w-full">
                            <label htmlFor="ConfPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm New Password</label>
                                <div className="flex flex-row">
                                    <input type="Password" name="ConfPassword" id="ConfPassword" value={passwordStats.ConfPassword} onChange={handleChange} className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" />
                                </div>
                                <div className="text-red-600">{errors.ErrorConfPassword}</div>
                        </div>
                        <div className="flex justify-center">
                            <button onClick={changePassword} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-yellow-700 to-yellow-300 hover:text-white dark:text-white">
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 w-full bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Change Password
                                </span>
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}