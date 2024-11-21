import NavbarCSS from '/public/styles/Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom';
export default function Header(props){

    const navigateTo = useNavigate();

    function dropdown(){
        let dropdown = document.querySelector('.drop');
        if(dropdown.className.includes('hidden')){
            dropdown.className = 'drop absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
        }else{
            dropdown.className = 'drop hidden absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
        }
    }

    function logOut(){
        localStorage.clear();
        navigateTo('/Register')
    }

    return(
        <div>
    <nav className={NavbarCSS.nav}>
        <div className="justify-between flex-row w-full max-w-screen-xl flex flex-wrap items-center">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/src/assets/Screenshot_2024-10-12_001528-removebg-preview.png" className="w-36 h-24" alt="Flowbite Logo" />
        </a>
        
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">

            
                {
                    localStorage.getItem('userInfo') ?
                    <>
                        <li>
                        <Link to="/AddProduct" className={props.page == "AddProduct" ? "block py-2 px-3 md:p-0 text-white bg-yellow-500 rounded md:bg-transparent md:text-yellow-500 md:dark:text-yellow-500 dark:bg-yellow-600 md:dark:bg-transparent" : "block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-300 dark:text-white md:dark:hover:text-yellow-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"} aria-current="page">Add Products</Link>
                        </li>
                        {/* <li>
                            <Link to="/UpdateProduct" className={props.page == "UpdateProduct" ? "block py-2 px-3 md:p-0 text-white bg-yellow-500 rounded md:bg-transparent md:text-yellow-500 md:dark:text-yellow-500 dark:bg-yellow-500 md:dark:bg-transparent" : "block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-400 dark:text-white md:dark:hover:text-yellow-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>Update Products</Link>
                        </li> */}
                        <li>
                            <Link to="/" className={props.page == "ProductsList" ? "block py-2 px-3 md:p-0 text-white bg-yellow-500 rounded md:bg-transparent md:text-yellow-500 md:dark:text-yellow-500 dark:bg-yellow-500 md:dark:bg-transparent" : "block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-400 dark:text-white md:dark:hover:text-yellow-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>Products</Link>
                        </li>
                        {/* <li>
                            <Link className={`${NavbarCSS.username} text-2xl mt-14`}>{JSON.parse(localStorage.getItem('userInfo')).name}</Link>
                        </li> */}
                    </>
                    :
                    <>
                        <li>
                            <Link to="/Login" className={props.page == "Login" ? "block py-2 px-3 md:p-0 text-white bg-yellow-500 rounded md:bg-transparent md:text-yellow-500 md:dark:text-yellow-500 dark:bg-yellow-500 md:dark:bg-transparent" : "block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-400 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>Login</Link>
                        </li>
                        <li>
                            <Link to="/Register" className={props.page == "Register" ? "block py-2 px-3 md:p-0 text-white bg-yellow-500 rounded md:bg-transparent md:text-yellow-500 md:dark:text-yellow-500 dark:bg-yellow-500 md:dark:bg-transparent" : "block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-400 dark:text-white md:dark:hover:text-yellow-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>Register</Link>
                        </li>
                    </>
                }

            </ul>
        </div>
        </div>
        
        {
                    localStorage.getItem('userInfo') ?
                    <div className={`${NavbarCSS.username} text-2xl`}>{JSON.parse(localStorage.getItem('userInfo')).name}</div>
            :
                    null
        }

        {
            localStorage.getItem('userInfo') ?
                <div className="relative inline-block text-left">
                    <div>
                        <button onClick={dropdown} type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                        <img src='/src/assets/images.png' className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="drop hidden absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                        <div className="py-1" role="none">
                        {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                        {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-2">License</a> */}
                        {/* <form method="POST" action="#" role="none"> */}
                            <button onClick={()=> navigateTo('/Cart') } className="text-black font-bold block w-full px-4 py-2 text-left text-sm hover:bg-slate-200" role="menuitem" tabIndex="-1" id="menu-item-3">Cart</button>
                            <button onClick={()=> navigateTo('/Profile')} className="text-black font-bold block w-full px-4 py-2 text-left text-sm hover:bg-slate-200" role="menuitem" tabIndex="-1" id="menu-item-3">Profile</button>
                            <button onClick={logOut} className="text-red-700 font-bold block w-full px-4 py-2 text-left text-sm hover:bg-slate-200" role="menuitem" tabIndex="-1" id="menu-item-3">Sign Out</button>
                        {/* </form> */}
                        </div>
                    </div>
                </div>
        :
        null
}

    </nav>
</div>
    )
}