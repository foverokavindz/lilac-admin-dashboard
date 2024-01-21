import React from 'react';
import { useSelector } from 'react-redux';

const OrderPreview = () => {
  const { activeOrder } = useSelector((state) => state.order);
  console.log('activeOrder    ', activeOrder);
  return (
    <div className="flex flex-col px-7">
      {/* order details */}
      <div>
        <h3 className="py-4 text-lg  font-semibold  text-gray-700 ">
          Order Details{' '}
        </h3>
        <div className="rounded-3xl overflow-x-auto">
          <table class="w-full text-sm text-center rtl:text-right text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-200 ">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" class="px-6 py-3">
                  Total
                </th>
                <th scope="col" class="px-6 py-3">
                  Payment Method
                </th>
                <th scope="col" class="px-6 py-3">
                  Date Orderd
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-gray-100 border-b ">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {activeOrder._id}
                </th>
                <td class="px-6 py-4">$ {activeOrder.total}</td>
                <td class="px-6 py-4">{activeOrder.paymentMethod}</td>
                <td class="px-6 py-4">{activeOrder.dateOrdered}</td>
                <td class="px-6 py-4">{activeOrder.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* customer details */}
      <div className="mt-5">
        <h3 className="py-4 text-lg  font-semibold  text-gray-700 ">
          Customer Details
        </h3>
        <div className="rounded-3xl overflow-x-auto">
          <table class="w-full text-sm text-center rtl:text-right text-gray-500 ">
            <tbody>
              <tr class="bg-gray-100 border-b ">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  <div>
                    <img
                      alt="name"
                      className="w-20 h-20 object-cover object-center rounded-full border border-gray-200"
                      src={activeOrder.user.profilePicture}
                    />
                  </div>
                </th>
                <td class="px-6 py-4 font-medium  text-gray-900">
                  {activeOrder.user.firstName} {activeOrder.user.lastName}
                </td>
                <td class="px-6 py-4">{activeOrder.user.email}</td>
                <td class="px-6 py-4">{activeOrder.address}</td>
                <td class="px-6 py-4">{activeOrder.user.city}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* product details */}

      <div className="mt-5">
        <div>
          <h3 className="py-4 text-lg  font-semibold  text-gray-700 ">
            {activeOrder.user.firstName}’s Ordered List
          </h3>
          <div className="flex flex-col justify-start items-start rounded-3xl bg-gray-100 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            {activeOrder.orderItems.map((product) => {
              return (
                <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                  {/* product Item */}
                  <div className="pb-4 md:pb-8 w-full md:w-40">
                    <img
                      className="w-32 h-32 rounded-2xl"
                      src={product.image}
                      alt="dress"
                    />
                  </div>

                  <div className="border-b border-gray-100 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start">
                      <h6>ID : {product._id}</h6>
                      <h3 className="text-xl  xl:text-2xl font-semibold leading-6 text-gray-700">
                        {product.name}
                      </h3>

                      <div className="flex justify-start items-start flex-col space-y-2 mt-7">
                        <p className="text-sm  leading-none text-gray-700">
                          <span className=" text-gray-500">Size: </span>{' '}
                          {product.size}
                        </p>
                        <p className="text-sm  leading-none text-gray-700">
                          <span className=" text-gray-500">Color: </span>
                          {product.color}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between space-x-8 items-start w-full">
                      <p className="text-base  xl:text-lg leading-6">
                        Price: ${product.price}{' '}
                      </p>
                      <p className="text-base  xl:text-lg leading-6 text-gray-800">
                        Qty: {product.quantity}
                      </p>
                      <p className="text-base  xl:text-lg font-semibold leading-6 text-gray-800">
                        Tot: ${product.total}{' '}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPreview;
