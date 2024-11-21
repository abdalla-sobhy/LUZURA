import { useEffect, useState } from "react";
import Header from "./Header";

export default function Cart(){
    const [productData, setProductData] = useState([])

    let CartProductsIds = [];
    for (let index = 0; index < localStorage.length; index++) {
        if(localStorage.key(index)!='userInfo'){
            let element = localStorage.key(index);
            let elementId = localStorage.getItem(element);
            CartProductsIds.push(elementId)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        let result = await fetch(`http://localhost:8000/api/getCartProducts/${CartProductsIds}`);
        result = await result.json();
        setProductData(result)
    }
    
    function changeAddedState(name) {
        localStorage.removeItem(`${name}`)
        window.location.reload();
    }

    return(
        <>
            <Header 
            page=""
            />
            
{ productData.length == 0 &&
    <div className="w-full justify-center text-center h-2/4 items-center flex text-2xl">No items in the cart</div>
}
{productData.length !=0 &&
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 w-2/5">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    image
                </th>
                <th scope="col" className="px-6 py-3">
                    stars
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
        productData.map((product)=>
    
        // eslint-disable-next-line react/jsx-key
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white overflow-hidden overflow-ellipsis whitespace-nowrap absolute w-2/5">
                    {product.name}
                </th>
                <td className="px-6 py-4">
                    <a href={`/Product?id=${product.id}`} className="block h-fit">
                        <img className="rounded-t-lg w-24" src={product.product_image} alt="product image" />
                    </a>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <svg className={`w-4 h-4 ${Math.round(product.stars) >= 1 ? `text-yellow-300` : `text-gray-200` } `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg className={`w-4 h-4 ${Math.round(product.stars) >= 2 ? `text-yellow-300` : `text-gray-200` } `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg className={`w-4 h-4 ${Math.round(product.stars) >= 3 ? `text-yellow-300` : `text-gray-200` } `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg className={`w-4 h-4 ${Math.round(product.stars) >= 4 ? `text-yellow-300` : `text-gray-200` } `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg className={`w-4 h-4 ${Math.round(product.stars) >= 5 ? `text-yellow-300` : `text-gray-200` } `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{product.stars}{product.stars.includes('.') ? "" : ".0"}</span>
            </div>
                </td>
                <td className="px-6 py-4">
                <span className="text-2xl font-semibold text-red-600 dark:text-white"><span className="font-thin text-gray-500"></span> ${Number(product.price).toLocaleString('en-US')}</span>
                </td>
                <td className="px-6 py-4">
                <a onClick={()=>changeAddedState(product.name)} className={`cursor-pointer text-white bg-gradient-to-br focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center from-yellow-700 to-yellow-300 hover:bg-yellow-300 focus:ring-yellow-300 dark:bg-yellow-300 dark:hover:bg-yellow-300 dark:focus:ring-yellow-300`}>remove from cart</a>
                </td>
            </tr>
    )
}
        </tbody>
    </table>
</div>
}
        </>
    )
}