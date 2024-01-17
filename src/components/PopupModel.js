import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const PopupModel = ({ isOpened, handlePopupClose }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);
  const [remainingStock, setRemainingStock] = useState(0);
  const { activeProduct } = useSelector((state) => state.product);
  const dispatch = useDispatch();

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

  return (
    <div
      id="default-modal"
      tabindex="-1"
      aria-hidden="true"
      className={` ${
        !isOpened ? 'hidden' : ''
      } fixed  z-50 flex justify-center items-center w-full  md:inset-0  max-h-full  bg-gray-900 bg-opacity-30 backdrop-blur-sm  `}
    >
      <div className="relative p-4 w-full max-w-6xl  h-full ">
        <div className="relative bg-white rounded-xl shadow  h-full overflow-hidden  ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Product Details
            </h3>
            <button
              onClick={() => handlePopupClose()}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* main Content */}
          <div className="p-4 md:p-5 space-y-4  h-full overflow-y-scroll">
            <section className="text-gray-700 body-font overflow-hidden bg-white">
              <div className="container px-5 py-10 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                  <div className="flex flex-col lg:w-1/2 w-full">
                    <div>
                      <img
                        className="w-full  object-cover object-center rounded-2xl border border-gray-200"
                        src={image}
                        alt={name}
                      />
                    </div>
                    <div className="flex flex-row justify-start items-center mt-5 gap-5">
                      {images.map((item) => {
                        return (
                          <div>
                            <img
                              alt="name"
                              className="w-32 h-32 object-cover object-center rounded-2xl border border-gray-200"
                              src={item}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">
                      {brand}
                    </h2>
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                      {name}
                    </h1>
                    <div className="flex mb-4">
                      <Rating rating={numReviews} />
                      <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                        <a className="text-gray-500">
                          <svg
                            fill="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                          </svg>
                        </a>
                        <a className="ml-2 text-gray-500">
                          <svg
                            fill="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                          </svg>
                        </a>
                        <a className="ml-2 text-gray-500">
                          <svg
                            fill="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                          </svg>
                        </a>
                      </span>
                    </div>
                    <p className="leading-relaxed">{description}</p>
                    <div className="flex border-b-2 border-gray-200 mb-5 mt-5 pb-5 flex-col">
                      <div class="relative overflow-x-auto rounded-2xl">
                        <table class="w-full text-sm text-center rtl:text-right text-gray-500 ">
                          <thead class="text-xs text-gray-700 uppercase bg-gray-200 ">
                            <tr>
                              <th scope="col" class="px-6 py-3">
                                Color
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Size
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Stock
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="bg-gray-100 border-b ">
                                {stock.map((item) => {
                                    return(
                                        
                                    )
                                })}
                              <th
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                              >
                                Red
                              </th>
                              <td class="px-6 py-4">SM</td>
                              <td class="px-6 py-4">14</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div>
                        <p className="title-font font-bold text-3xl text-gray-900">
                          ${price}
                        </p>
                      </div>

                      <div className="flex flex-row justify-between gap-2 items-center">
                        <Link
                          to={'/products-details'}
                          class="flex flex-row gap-3 w-full py-3 px-6 text-center text-white rounded-xl transition bg-gray-700  hover:bg-gray-600 active:bg-gray-700 focus:bg-gray-600 sm:w-max"
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
                              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                          </svg>
                          Buy now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/*       <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b ">
            <button
              data-modal-hide="default-modal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              I accept
            </button>
            <button
              onClick={() => handlePopupClose()}
              data-modal-hide="default-modal"
              type="button"
              className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              Decline
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PopupModel;
