import React from 'react';
import { useSelector } from 'react-redux';
import Rating from '../components/Rating';

const ProductPreview = () => {
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

  return (
    <section className="text-gray-700 body-font  bg-white">
      <div className="container px-5 py-5 mx-auto ">
        <div className="lg:w-4/5 mx-auto flex flex-wrap ">
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
                    {stock.map((item) => {
                      return (
                        <tr class="bg-gray-100 border-b " key={item._id}>
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            {item.color}
                          </th>
                          <td class="px-6 py-4">
                            {item.sizeCount.map((el) => {
                              return <p> {el.size} </p>;
                            })}
                          </td>
                          <td class="px-6 py-4">
                            {item.sizeCount.map((el) => {
                              return <p> {el.count} </p>;
                            })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-row justify-end items-center">
              <div>
                <p className="title-font font-bold text-2xl text-gray-900">
                  Price - ${price}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;
