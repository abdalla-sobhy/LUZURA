import { useEffect, useMemo, useState } from "react";
import Header from "./Header";
import countryList from 'react-select-country-list'
import Select from 'react-select';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Link } from "react-router-dom";

export default function Profile(){
    
    const [userData,setUsertData] = useState([])
    const [country, setCountry] = useState('')
    const options = useMemo(() => countryList().getData(), [])

    const changeHandler = value => {
    setCountry(value)
    }

    const [value, setValue] = useState()

    useEffect(()=>{
    let result
    async function fetchData() {
        let userData = localStorage.getItem('userInfo')
        const specificString = '"id":'
        let index = userData.indexOf(specificString)
        const id = userData[index + specificString.length]
        result = await fetch(`http://localhost:8000/api/getUserData/${id}`);
        result = await result.json();
        setUsertData(result)
    }
    fetchData();
},[])

const handleChange = (event) =>{
    const {name, value} = event.target
    setUsertData((prevValues) => ({
        ...prevValues,
        [name]: value
    }))
}

    async function deleteAccount(){
        let userData = localStorage.getItem('userInfo')
        const specificString = '"id":'
        let index = userData.indexOf(specificString)
        const id = userData[index + specificString.length]
        await fetch(`http://localhost:8000/api/DeleteAccount/${id}`,{
            method:"DELETE"
        })
        localStorage.clear();
        window.location.href = '/Register'
    }

    return(
        <>
            <Header 
            page=""
            />
            <div className="h-full w-full bg-gradient-to-r from-70% from-white to-yellow-300 pt-12">
                <div className="w-full flex justify-center">
                    <div className="w-2/5 flex justify-center flex-col gap-12">
                        <div className="w-full">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="text" name="name" id="username" value={userData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username.example" required="" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                            <input type="email" name="email" id="email" value={userData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email.example" required="" />
                        </div>
                        <div className="w-full">
                        {/* <label htmlFor="country">Country</label><span style="color: red !important; display: inline; float: none;">*</span>       */}
                        <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country you currently live in</label>
                        <Select options={options} id="country" value={country} onChange={changeHandler} />

                        </div>
                        <div className="w-full">
                            {/* <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label> */}
                            <PhoneInput
                                placeholder="Enter phone number"
                                value={value}
                                onChange={setValue}/>
                        </div>
                        <div className="w-full flex flex-row gap-60">
                                <div className="px-4 py-2">
                                    <Link to="/ChangePassword" className={"text-blue-600 block w-fit  text-left text-sm"}>Change Password</Link>                                
                                </div>
                                <div className="px-4 py-2">
                                    <button onClick={deleteAccount} className={"text-red-600 block w-fit  text-left text-sm"}>Delete Account</button>                                
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}