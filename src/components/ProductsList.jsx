import { useEffect, useState } from "react"
import Header from "./Header"
import ProductsListCSS from '/public/styles/ProductList.module.css'

export default function ProductsList(){

    const [isScrolled, setIsScrolled] = useState(false);

        useEffect(() => {
            const handleScroll = () => {
            setIsScrolled(window.scrollY > 200);
            };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll',
            handleScroll);
        }, []);

        const [searchbar, setSearchbar] = useState('')
        const [productData, setProductData] = useState([])
        const [isAdded, setIsAdded] = useState(false)

function changeAddedState(name, id) {
    if(localStorage.getItem(`${name}`)){
        localStorage.removeItem(`${name}`)
    }else{
        localStorage.setItem(`${name}`,id)
    }
    setIsAdded(prevState => !prevState)
}

async function fetchData() {
    let result = await fetch("http://localhost:8000/api/list");
    result = await result.json();
    setProductData(result)
}

    useEffect(() => {
        fetchData();
    }, []);

    function handleSearch(event) {
        setSearchbar(event.target.value)
    }

    async function sendSearch(){
        if(searchbar == ''){fetchData()}
        else{
            let reslut = await fetch(`http://localhost:8000/api/search/${searchbar}`)
            reslut = await reslut.json()
            setProductData(reslut)
        }
    }
    return(
        <>
            <Header 
            page="ProductsList"
            />
            
            <div className="w-full mt-12 justify-center flex">   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative w-2/3">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search"value={searchbar} onChange={handleSearch} name="searchbar" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Products..." required />
        <button type="button" onClick={sendSearch} className="cursor-pointer bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-white absolute end-2.5 bottom-2 from-yellow-700 to-yellow-300 hover:bg-yellow-300 dark:bg-yellow-300 dark:hover:bg-yellow-300 dark:focus:ring-yellow-300">Search</button>
    </div>
</div>
{productData.length === 0 && <div className="w-full justify-center text-center h-2/4 items-center flex text-2xl">Sorry, we couldn’t find what you’re looking for.</div>}

            <div className="w-full flex justify-center">
        <div className={ProductsListCSS.allProductsGridWrapper}>
{


    productData.map((product)=>

        
    // eslint-disable-next-line react/jsx-key
    <div className={`${ProductsListCSS.productContainer} flex flex-col w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>
        <a href={`/Product?id=${product.id}`} className="block h-fit">
            <img className="p-8 rounded-t-lg" src={product.product_image} alt="product image" />
        </a>
        <div className="px-5 pb-5 flex-grow flex flex-col">
            <a href={`/Product?id=${product.id}`}>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white overflow-hidden overflow-ellipsis whitespace-pre-wrap h-20">{product.name}</h5>
            </a>
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
            <div className="flex justify-between flex-grow items-end">
                <span className="text-3xl font-bold text-red-600 dark:text-white">${Number(product.price).toLocaleString('en-US')}</span>
                <a onClick={()=>changeAddedState(product.name, product.id)} className={`cursor-pointer text-white bg-gradient-to-br focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${ !localStorage.getItem(`${product.name}`)  ? `from-yellow-700 to-yellow-300 hover:bg-yellow-300 focus:ring-yellow-300 dark:bg-yellow-300 dark:hover:bg-yellow-300 dark:focus:ring-yellow-300` : `from-green-700 to-green-300 hover:bg-green-300 focus:ring-green-300 dark:bg-green-300 dark:hover:bg-green-300 dark:focus:ring-green-300` }`}>{ localStorage.getItem(`${product.name}`) ? `remove from cart` : `Add to cart`}</a>
            </div>
        </div>
        <div></div>
    </div>
    )
}

        </div>
        </div>
        {isScrolled &&
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`${ProductsListCSS.scrollupButton} w-14 sticky bottom-4`}><img src="/src/assets/arrow.png" alt="" className="w-full" /></button>
        }
        </>
    )
}