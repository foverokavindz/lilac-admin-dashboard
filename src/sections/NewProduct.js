import StockColorInput from '../components/StockColorInput';
import { useState, useRef, useEffect } from 'react';
import StockSizeInput from '../components/StockSizeInput';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '../Firabase';
const BASE_URL = process.env.REACT_APP_API_URL;

const NewProduct = () => {
  const refFeatureImage = useRef(null);
  const refimageOne = useRef(null);
  const refimageTwo = useRef(null);
  const refimageThree = useRef(null);

  const [imageFeatured, setImage] = useState(undefined);
  const [images, setImages] = useState([]);
  const [uploadPrecentage, setUploadPrecentage] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState([
    { color: '', sizeCount: [{ size: '', count: 0 }] },
  ]);

  const [submitData, setSubmitData] = useState({});

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  // only chnage updated values
  const handleChnage = (e) => {
    setSubmitData({ ...submitData, [e.target.id]: e.target.value });
    console.log('submitData  ', submitData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...submitData,
      isFeatured: isChecked,
      stock: formData,
      category: selectedCategories,
      image: imageFeatured,
      images,
    };

    const token = localStorage.getItem('lilac-auth-token');
    //console.log('token', token);
    try {
      //dispatch(userUpdateStart());
      const res = await fetch(BASE_URL + `/product/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(dataToSubmit),
      });

      const data = await res.json();

      // if (data.success === false) {
      //   dispatch(userUpdateFailure(data));
      //   return;
      // }

      //dispatch(userUpdateSuccess(data));
      console.log('data  ', data);
    } catch (error) {
      console.log('error', error);
      // dispatch(userUpdateFailure(error));
    }

    //console.log('dataToSubmit    ', dataToSubmit);
  };

  const addColorFeild = () => {
    let object = { color: '', sizeCount: [{ size: '', count: 0 }] };
    setFormData([...formData, object]);
  };

  const addStockSizeFeild = (index) => {
    let object = { size: '', count: 0 };
    const updatedFormData = [...formData];
    updatedFormData[index].sizeCount = [
      ...updatedFormData[index].sizeCount,
      object,
    ];
    setFormData(updatedFormData);
  };

  const handleChnageColor = (index, event) => {
    let updatedFormData = [...formData];
    updatedFormData[index][event.target.id] = event.target.value;
    setFormData(updatedFormData);
  };

  const handleStockSizeChange = (index, indexTwo, event) => {
    let updatedFormData = [...formData];
    let updatedStockSize = [...updatedFormData[index].sizeCount];
    updatedStockSize[indexTwo][event.target.id] = event.target.value;

    updatedFormData[index] = {
      ...updatedFormData[index],
      sizeCount: updatedStockSize,
    };

    setFormData(updatedFormData);
  };

  const handleFileUpload = async (image, featured) => {
    // console.log('imageData', image);
    const storage = getStorage(app);
    const fileName = image.name + Date.now();
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapShot) => {
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setUploadPrecentage(Math.round(progress));

        console.log('progrss - ', progress);
      },

      (error) => {
        setImageError(true);
      },

      featured
        ? () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImage(downloadURL);
              console.log('downloadURL featured -  ', downloadURL);
            });
          }
        : () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImages((prevData) => [...prevData, downloadURL]);
            });
          }
    );
  };

  const toggleSelectedCategory = (categoryId) => {
    const targetCategory = selectedCategories.find((cat) => cat === categoryId);

    if (targetCategory) {
      setSelectedCategories([
        ...selectedCategories.filter((item) => item !== categoryId),
      ]);
    } else {
      setSelectedCategories((prevData) => [...prevData, categoryId]);
    }
  };

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchCategoryData = async () => {
      try {
        // get category data
        const response = await fetch(BASE_URL + '/category', {
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
  }, []);

  console.log('imageFeatured  ', imageFeatured);
  console.log('images   ', images);

  return (
    <>
      <div className="px-8">
        <h3 className="py-4 text-lg  font-semibold  text-gray-700 ">
          Enter new product details
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-6 border-b border-gray-300">
            <dl className="divide-y divide-gray-300">
              {/* name */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    placeholder="Enter Product Name"
                    id="name"
                    onChange={handleChnage}
                    className="block w-full rounded-md border-0 px-5 py-3 text-gray-600 text-base font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>

              {/* description */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Description
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    placeholder="Product description"
                    id="description"
                    onChange={handleChnage}
                    className="block w-full rounded-md border-0 px-5 py-3 text-gray-600 text-base font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>

              {/* Brand */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Brand
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    placeholder="Brand"
                    id="brand"
                    onChange={handleChnage}
                    className="block w-full rounded-md border-0 px-5 py-3 text-gray-600 text-base font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>

              {/* Featured Image */}
              <div className="  px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Featured Image
                </dt>
                <dd className="relative mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-row justify-start gap-28 items-center">
                  <div>
                    <img
                      src={
                        imageFeatured ||
                        'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=1060'
                      }
                      className="w-56 h-56 rounded-full object-cover  "
                      alt="Profile picture"
                      width={'100px'}
                    />

                    <input
                      type="file"
                      ref={refFeatureImage}
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        handleFileUpload(e.target.files[0], true);
                      }}
                    />
                    <div className="t-0 absolute left-40 bottom-1  ">
                      <p
                        onClick={() => refFeatureImage.current.click()}
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
                  <div className="mt-3 ">
                    {imageError ? (
                      <p>
                        Error uploading image (should be image file and less
                        than 2 MB)
                      </p>
                    ) : uploadPrecentage > 0 && uploadPrecentage < 100 ? (
                      <p className="text-base text-gray-700 font-medium bg-gray-200 px-7 py-3 rounded-xl">
                        Uploading ... {uploadPrecentage}%
                      </p>
                    ) : uploadPrecentage === 100 ? (
                      <p className="text-base font-medium text-green-800 bg-green-300 px-7 py-3 rounded-xl">
                        Upload Successfully
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                </dd>
              </div>

              {/* other Images */}
              <div className="  px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Other Images
                </dt>
                <dd className=" mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-row gap-5">
                  {/** image1 */}
                  <div className=" relative">
                    <img
                      src={
                        images[0] ||
                        'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=1060'
                      }
                      className="w-32 h-32 rounded-full  object-cover  "
                      alt="Product picture"
                      width={'100px'}
                    />

                    <input
                      type="file"
                      ref={refimageOne}
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        handleFileUpload(e.target.files[0], false);
                      }}
                    />
                    <div className="t-0 absolute left-20 bottom-1  ">
                      <p
                        onClick={() => refimageOne.current.click()}
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

                  {/** image2 */}
                  <div className=" relative">
                    <img
                      src={
                        images[1] ||
                        'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=1060'
                      }
                      className="w-32 h-32 rounded-full  object-cover  "
                      alt="Product picture"
                      width={'100px'}
                    />

                    <input
                      type="file"
                      ref={refimageTwo}
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        handleFileUpload(e.target.files[0], false);
                      }}
                    />
                    <div className="t-0 absolute left-20 bottom-1  ">
                      <p
                        onClick={() => refimageTwo.current.click()}
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

                  {/** image3 */}
                  <div className=" relative">
                    <img
                      src={
                        images[2] ||
                        'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=1060'
                      }
                      className="w-32 h-32 rounded-full  object-cover  "
                      alt="Product picture"
                      width={'100px'}
                    />

                    <input
                      type="file"
                      ref={refimageThree}
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        handleFileUpload(e.target.files[0], false);
                      }}
                    />
                    <div className="t-0 absolute left-20 bottom-1  ">
                      <p
                        onClick={() => refimageThree.current.click()}
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

              {/* Categories */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Categories
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div className="gap-2 flex flex-row  w-full flex-wrap">
                    {categoryData.map((el) => {
                      const targetCategory = selectedCategories.find(
                        (cat) => cat === el._id
                      );

                      return (
                        <span
                          onClick={() => toggleSelectedCategory(el._id)}
                          key={el._id}
                          className={` ${
                            targetCategory
                              ? 'bg-gray-800 text-white border-gray-800 hover:border-gray-700'
                              : 'bg-gray-200 text-gray-800 border-gray-300 hover:border-gray-400'
                          } cursor-pointer py-1 px-4 font-medium text-1xl rounded-full  border-2 flex flex-row gap-3 justify-center items-center  `}
                        >
                          {el.name}
                        </span>
                      );
                    })}
                  </div>
                </dd>
              </div>

              {/* price */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Price
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    placeholder="Price"
                    id="price"
                    onChange={handleChnage}
                    className="block w-full rounded-md border-0 px-5 py-3 text-gray-600 text-base font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>

              {/* stock */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Stock
                </dt>
                <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0 w-3/4">
                  {formData.map((item, index) => {
                    return (
                      <div className="border p-3 mb-3 rounded-xl">
                        <StockColorInput
                          key={index}
                          addColorFeild={addColorFeild}
                          handleChnageColor={handleChnageColor}
                          index={index}
                          data={item.color}
                        />

                        {item.sizeCount.map((stockSize, indexSecond) => {
                          return (
                            <StockSizeInput
                              key={indexSecond}
                              addStockSize={addStockSizeFeild}
                              handleStockSizeChange={handleStockSizeChange}
                              indexSecond={indexSecond}
                              index={index}
                              data={stockSize}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </dd>
              </div>

              {/* featured */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Featured product
                </dt>
                <dd className="mt-1 text-sm leading-6 font-medium text-gray-800 sm:col-span-2 sm:mt-0">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />{' '}
                  Featured
                </dd>
              </div>

              {/* submit */}
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
