import React from 'react';
import { useSelector } from 'react-redux';

const UpdateProduct = () => {
  const { activeProduct } = useSelector((state) => state.product);
  const {
    _id,
    name,
    image,
    brand,
    numReviews,
    price,
    review,
    category,
    description,
    images,
    isFeatured,
    stock,
  } = activeProduct;

  const handleSubmit = () => {};

  const handleChnage = () => {};
  /*
  _id,
    name,
    description,
    brand,
    image,
    images,

    price,

    category, - add new ( callingdata from backend do not add simmiler ones)

    stock,
    isFeatured,

  
  
  
  */

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mt-6 border-t border-gray-300">
          <dl className="divide-y divide-gray-300">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Id
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  placeholder="firstname"
                  id="firstName"
                  onChange={handleChnage}
                  autoComplete="firstname"
                  className="block w-full rounded-md border-0 px-5 py-3 text-gray-600 text-base font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={activeProduct._id}
                />
              </dd>
            </div>

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
                Product Image
              </dt>
              <dd className="relative mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <div className="overflow-hidden w-56 h-56 rounded-full">
                  <img
                    src={formData.profilePicture || activeProduct.image}
                    className="w-56 h-56 rounded-full object-cover hover:scale-110 transition-all "
                    alt="Profile picture"
                    width={'100px'}
                  />
                  <div>
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
                  </div>
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
                      className="h-12 cursor-pointer w-12 shadow-lg flex items-center justify-center rounded-full bg-white p-2.5  text-xs text-gray-800 hover:-rotate-12 hover:scale-105 transition-all"
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
                Product Image
              </dt>
              <dd className="relative mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <div className="overflow-hidden w-56 h-56 rounded-full">
                  <img
                    src={
                      formData.profilePicture || activeProduct.profilePicture
                    }
                    className="w-56 h-56 rounded-full object-cover hover:scale-110 transition-all "
                    alt="Profile picture"
                    width={'100px'}
                  />
                  <div>
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
                  </div>
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
                      className="h-12 cursor-pointer w-12 shadow-lg flex items-center justify-center rounded-full bg-white p-2.5  text-xs text-gray-800 hover:-rotate-12 hover:scale-105 transition-all"
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
                <input
                  type="text"
                  placeholder="lastname"
                  id="lastName"
                  autoComplete="lastname"
                  className="block w-full rounded-md border-0 px-5 py-3 text-gray-600 text-base font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChnage}
                  defaultValue={activeProduct.name}
                />
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Stock
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  placeholder="address"
                  id="address"
                  autoComplete="address"
                  className="block w-full rounded-md border-0 px-5 py-3 text-gray-600 text-base font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChnage}
                  defaultValue={activeProduct.name}
                />
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Make it Featured Product
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  placeholder="city"
                  id="city"
                  autoComplete="city"
                  className="block w-full rounded-md border-0 px-5 py-3 text-gray-600 text-base font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChnage}
                  defaultValue={activeProduct.isFeatured ? 'yes' : 'no'}
                />
              </dd>
            </div>

            <div className="flex flex-row justify-end pt-5">
              <button className="flex flex-row justify-center items-center px-6 py-3 rounded-xl  gap-3  transition-all bg-gray-800 text-white hover:bg-gray-700">
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
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                Update
              </button>
            </div>
          </dl>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
