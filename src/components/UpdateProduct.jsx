import { useEffect, useState } from "react";
import Header from "./Header";
import NavbarCSS from "/public/styles/Navbar.module.css";
import { useNavigate } from "react-router-dom";
import FileUploader from "./FileUploader";


export default function UpdateProduct(){
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        details:"",
        stars: ""
      });
      console.log(form)
    
      const [errors, setErrors] = useState({
        nameError: "",
        descriptionError: "",
        detailsError:"",
        priceError: "",
        imageError: "",
        starsError:"",
      });
    
      const [product_image, setProductImage] = useState(null);
    
      const navigateTo = useNavigate();
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };
    
      useEffect(()=>{
        let result
        async function fetchData() {
            result = await fetch(`http://localhost:8000/api/product/${window.location.href.split('=')[1]}`);
            result = await result.json();
            setForm(result)

        }
        fetchData();
    },[])

      async function addProduct() {
        let result;
        if(form.stars >= 0 && form.stars <= 5){
          try {
            const _form = new FormData();
            _form.append("product_image", product_image);
            _form.append("name", form.name);
            _form.append("description", form.description);
            _form.append("details", form.details);
            _form.append("price", form.price);
            _form.append("stars", form.stars)
            _form.append("user_id", localStorage.userInfo.split('id')[1].substr(2,1))
            result = await fetch(`http://localhost:8000/api/updateProduct/${window.location.href.split('=')[1]}`, {
              method: "POST",
              body: _form,
              headers: {
                Accept: "application/json",
              },
            });
            if (result.ok) {
                navigateTo("/");        
            } else {
              throw result;
            }
          } catch (error) {
            let inErrors = await error.json()
            setErrors((prevErrors) => ({
              ...prevErrors,
              nameError: inErrors.errors.name,
              descriptionError: inErrors.errors.description,
              detailsError: inErrors.errors.details,
              priceError: inErrors.errors.price,
              imageError: inErrors.errors.product_image,
              starsError: inErrors.errors.stars,
            }))
          }
        }
      }
    return (
        <div className="root">
          <Header page="UpdateProduct" />
          <div className="flex justify-center pt-8">
            <div className={`${NavbarCSS.world_s} w-fit`}>Edit your Product for Sale</div>
          </div>
          <div className="flex flex-row h-fit w-full">
            <div className="formDiv w-2/3 h-fit mt-16 flex">
              <form
                className="max-w-sm mx-auto w-full"
                onSubmit={(e) => e.preventDefault()}
                encType="multipart/form-data"
              >
                <div className="mb-5">
                  <label
                    htmlFor="productName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    id="productName"
                    className={`shadow-sm border ${errors.nameError ? `border-red-600` : `border-gray-300` } bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                    // required
                  />
                  <span className="text-red-600">{errors.nameError}</span>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="productDescription"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    id="productDescription"
                    rows="4"
                    className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${errors.descriptionError ? `border-red-600` : `border-gray-300`} focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  ></textarea>
                  <span className="text-red-600">{errors.descriptionError}</span>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="productdetails"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product details
                  </label>
                  <textarea
                    name="details"
                    value={form.details}
                    onChange={handleChange}
                    id="productdetails"
                    rows="4"
                    className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${errors.detailsError ? `border-red-600` : `border-gray-300`} focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  ></textarea>
                  <span className="text-red-600">{errors.detailsError}</span>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="productPrice"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    id="productPrice"
                    className={`shadow-sm bg-gray-50 border ${errors.priceError ? `border-red-500` : `border-gray-300`} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                    // required
                  />
                  <span className="text-red-600">{errors.priceError}</span>
                  <label
                    htmlFor="productPrice"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-6"
                  >
                    Product Stars
                  </label>
                  <input
                    type="number"
                    name="stars"
                    value={form.stars}
                    onChange={handleChange}
                    id="productStars"
                    className={`shadow-sm bg-gray-50 border ${errors.starsError ? `border-red-500` : `border-gray-300`} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                    // required
                    max={5}
                    min={0}
                    step="1"
                    
                  />
                  <span className="text-red-600">{errors.starsError}</span>
                </div>
               
                <div className="flex w-full justify-center">
                  <button
                    type="submit"
                    onClick={addProduct}
                    className="text-white bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Edit the product
                  </button>
                </div>
              </form>
            </div>
    
            <div className="imageDiv w-1/4 flex justify-center items-center">
            <div className="mb-5 w-full">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="productImage"
                  >
                    Product Image
                  </label>
                  <FileUploader
                    // name="product_image"
                    file={product_image}
                    setFile={setProductImage}
                    // className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    // id="productImage"
                    // type="file"
                    // accept="image/*"
                  />
                  <span className="text-red-600">{errors.imageError}</span>
                </div>        </div>
          </div>
        </div>
      );
    }
    
    export const convertImageToBlob = (image) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
        resolve(reader.result);
        };
        reader.readAsDataURL(image);
    });
