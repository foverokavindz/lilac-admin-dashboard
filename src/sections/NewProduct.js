import StockInput from '../components/StockInput';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '../Firabase';

const NewProduct = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [uploadPrecentage, setUploadPrecentage] = useState(0);
  const [formData, setFormData] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();

  const { activeProduct } = useSelector((state) => state.product);

  /*
  
  firebase storage rules
  
  match /{allPaths=**} {
      allow read;
      allow write: if  
      request.resource.size < 2 *1024*1024 && 
      request.resource.contentType.matches('image/.*')
    } */

  // only chnage updated values
  const handleChnage = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    //console.log('formData  ', formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log('Data  ', JSON.stringify(formData));
    //const token = localStorage.getItem('lilac-auth-token');
    //console.log('token', token);
    try {
      //dispatch(userUpdateStart());
      const res = await fetch(`http://localhost:3005/api/user/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': 'token',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // if (data.success === false) {
      //   dispatch(userUpdateFailure(data));
      //   return;
      // }

      //dispatch(userUpdateSuccess(data));
      //console.log('data  ', data);
      //navigate('/profile');
    } catch (error) {
      console.log('error', error);
      // dispatch(userUpdateFailure(error));
    }
  };

  useEffect(() => {
    if (image) handleFileUpload(image);
    // Function to fetch data from the backend
    const fetchCategoryData = async () => {
      try {
        // get category data
        const response = await fetch('http://localhost:3005/api/category', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlhM2E0MzIzMWZiYjIyNzAyZjNjMDUiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3MDQ2MTE5Njd9.x0QmX8-Uw0Idq2d6MO6p9uHxd-1IashW5rp7GBHCwRw',
          },
        });
        const data = await response.json();

        // Update state or perform any other actions with the fetched data
        // For example, assuming there is a setData function to update state:
        setCategoryData(data);
      } catch (error) {
        console.error('Error fetching data from backend:', error);
      }
    };

    // Call the fetchData function
    fetchCategoryData();
  }, [image]);

  // methna nomal image upload ekai other images upload eki hdnna one

  const handleFileUpload = async (image) => {
    // console.log('imageData', image);
    const storage = getStorage(app);
    const fileName = activeProduct._id;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapShot) => {
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setUploadPrecentage(Math.round(progress));

        //console.log('progrss - ', progress);
      },

      (error) => {
        setImageError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Get the previous array of image URLs
          const previousImages = image || [];
          // Combine the previous URLs with the new one
          const updatedImages = [...previousImages, downloadURL];
          // Update the state with the updated array
          setFormData({ ...formData, image: updatedImages });
        });
      }
    );
  };

  return (
    <>
      <div className="p-7">newProduct</div>

      <div className="px-8">
        <form onSubmit={handleSubmit}>
          <div className="mt-6 border-b border-gray-300">
            <dl className="divide-y divide-gray-300">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Product Name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    placeholder="firstname"
                    id="firstName"
                    onChange={handleChnage}
                    autoComplete="firstname"
                    className="block w-full rounded-md border-0 px-5 py-3 text-gray-600 text-base font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={activeProduct.name}
                  />
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Description
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    placeholder="firstname"
                    id="firstName"
                    onChange={handleChnage}
                    autoComplete="firstname"
                    className="block w-full rounded-md border-0 px-5 py-3 text-gray-600 text-base font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={activeProduct.description}
                  />
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Brand
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    placeholder="firstname"
                    id="firstName"
                    onChange={handleChnage}
                    autoComplete="firstname"
                    className="block w-full rounded-md border-0 px-5 py-3 text-gray-600 text-base font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={activeProduct.brand}
                  />
                </dd>
              </div>

              {/* featured image */}
              <div className="  px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Featured Image
                </dt>
                <dd className="relative mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div className="overflow-hidden w-56 h-56 rounded-full">
                    <img
                      src="https://img.freepik.com/free-photo/white-cloud-with-download-icon-cloud-computing-technology-sign-symbol-3d-rendering_56104-1285.jpg?w=1380&t=st=1706543372~exp=1706543972~hmac=4e26f6bfdc849f5bc4ac1beba8001ad8d252af9c6532286b26fa3f9dc9b3ff3f"
                      className="w-56  h-56 rounded-full object-cover hover:scale-110 transition-all "
                      alt="Profile picture"
                      width={'100px'}
                    />
                    {/* <div>
                    {imageError ? (
                      <p>
                        Error uploading image (should be image file and less
                        than 2 MB)
                      </p>
                    ) : uploadPrecentage > 0 && uploadPrecentage < 100 ? (
                      <p>Uploading ... {uploadPrecentage}%</p>
                    ) : uploadPrecentage === 100 ? (
                      <p>Upload Successfully</p>
                    ) : (
                      ''
                    )}
                  </div> */}
                    <input
                      type="file"
                      ref={fileRef}
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                      }}
                    />
                    <div className="t-0 absolute left-40 bottom-1  ">
                      <p
                        onClick={() => fileRef.current.click()}
                        className="h-12 cursor-pointer w-12 shadow-lg flex items-center justify-center rounded-full bg-white p-2.5  text-xs text-gray-800 hover:-rotate-12 hover:scale-110 transition-all hover:bg-gray-800 hover:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>
                      </p>
                    </div>
                  </div>
                </dd>
              </div>
              {/* other images */}

              <div className="  px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Other Images
                </dt>
                <dd className=" mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-row gap-5">
                  {activeProduct.images.map((item, index) => {
                    return (
                      <div className=" relative  " key={index}>
                        <img
                          src="https://img.freepik.com/free-photo/white-cloud-with-download-icon-cloud-computing-technology-sign-symbol-3d-rendering_56104-1285.jpg?w=1380&t=st=1706543372~exp=1706543972~hmac=4e26f6bfdc849f5bc4ac1beba8001ad8d252af9c6532286b26fa3f9dc9b3ff3f"
                          className="w-32 h-32 rounded-full  object-cover  "
                          alt="Product picture"
                          width={'100px'}
                        />

                        <input
                          type="file"
                          ref={fileRef}
                          hidden
                          accept="image/*"
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                          }}
                        />
                        <div className="t-0 absolute left-20 bottom-1  ">
                          <p
                            onClick={() => fileRef.current.click()}
                            className="h-12 cursor-pointer w-12 shadow-lg flex items-center justify-center rounded-full bg-white p-2.5  text-xs text-gray-800 hover:-rotate-12 hover:scale-110 transition-all hover:bg-gray-800 hover:text-white"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                              />
                            </svg>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Price
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    placeholder="firstname"
                    id="firstName"
                    onChange={handleChnage}
                    autoComplete="firstname"
                    className="block w-full rounded-md border-0 px-5 py-3 text-gray-600 text-base font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={activeProduct.price}
                  />
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Categories
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div className="gap-2 flex flex-row  w-full flex-wrap">
                    {categoryData.map((el) => {
                      const targetCategory = activeProduct.category.find(
                        (cat) => cat.name === el.name
                      );

                      return (
                        <span
                          key={el._id}
                          className={` ${
                            targetCategory
                              ? 'bg-gray-800 text-white border-gray-800 hover:border-gray-700'
                              : 'bg-gray-200 text-gray-800 border-gray-300 hover:border-gray-400'
                          } py-1 px-4  rounded-full  border-2 flex flex-row gap-3 justify-center items-center  `}
                        >
                          {el.name}

                          {targetCategory ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-5 h-5 bg-gray-600 rounded-full p-1 hover:scale-110 transition-all hover:bg-gray-500"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5 12h14"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-5 h-5 bg-gray-300 rounded-full p-1 hover:scale-110 transition-all hover:bg-gray-400 "
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                              />
                            </svg>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Stock
                </dt>
                <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0 w-3/4">
                  <StockInput />
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Make it Featured Product
                </dt>
                <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0">
                  <div class="flex items-center mb-4">
                    <input
                      checked={activeProduct.isFeatured ? true : false}
                      id="default-radio-2"
                      type="radio"
                      value=""
                      name="default-radio"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                    />
                    <label
                      for="default-checkbox"
                      class="ms-2 text-sm font-medium text-gray-700"
                    >
                      Featured
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value=""
                      name="default-radio"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                    />
                    <label
                      for="checked-checkbox"
                      class="ms-2 text-sm font-medium text-gray-700 "
                    >
                      Not Featured
                    </label>
                  </div>
                </dd>
              </div>

              <div className="flex flex-row justify-end pt-5">
                <button className="flex flex-row justify-center items-center px-6 py-3 rounded-xl  gap-2  transition-all bg-gray-800 text-white hover:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  Add
                </button>
              </div>
            </dl>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewProduct;
