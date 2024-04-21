import { useState, useEffect } from 'react';
import PopupModal from '../components/PopupModal';
import { addActiveOrder } from '../store/reducers/orderSlice';
import { useDispatch } from 'react-redux';
const BASE_URL = process.env.REACT_APP_API_URL;

const tableHeaders = [
  { name: 'Order Id' },
  { name: 'User Id' },
  { name: 'Name' },
  { name: 'Total' },
  { name: 'Address' },
  { name: 'Status' },
  { name: 'Payment Method' },
  { name: 'Action' },
];

const Order = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [isPopupModelOpened, setIsPopupModelOpened] = useState(false);
  const [selectedWindow, setSelectedWindow] = useState('');
  const dispatch = useDispatch();

  const toggleIsPopupModelOpened = (modal) => {
    setIsPopupModelOpened(!isPopupModelOpened);
    setSelectedWindow(modal);
  };

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const token = localStorage.getItem('lilac-auth-token');
        const response = await fetch(BASE_URL + '/order', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });
        const data = await response.json();
        setAllOrders(data);
        //console.log('data   ', data);
      } catch (error) {
        console.error('Error fetching Orders :', error);
      }
    };

    getAllOrders();
  }, []);

  //console.log('allOrders  ', allOrders);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="px-4 sm:px-0">
            <h3 className="text-2xl font-semibold leading-7 text-gray-900">
              Order Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Customer's orders overview.
            </p>
          </div>
        </div>

        {/* table */}
        <div className="mt-10">
          <div class="relative   sm:rounded-lg">
            <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
              <div>
                <button
                  id="dropdownRadioButton"
                  data-dropdown-toggle="dropdownRadio"
                  class="inline-flex  gap-3 py-3 items-center text-gray-500 bg-white border border-gray-300  hover:bg-gray-100  font-medium rounded-lg text-sm px-3 "
                  type="button"
                >
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
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  Last 30 days
                  <svg
                    class="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
              </div>
              <label for="table-search" class="sr-only">
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 "
                  placeholder="Search for items"
                />
              </div>
            </div>

            {/* table start */}

            <div className="w-full overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 rounded-3xl ">
                <thead class="text-xs text-gray-700 uppercase bg-gray-200 ">
                  <tr>
                    {/* table headers */}
                    <th scope="col" class="p-4">
                      <div class="flex items-center">
                        <input
                          id="checkbox-all-search"
                          type="checkbox"
                          class="w-4 h-4 text-blue-600 bg-gray-300 border-gray-300 rounded "
                        />
                        <label for="checkbox-all-search" class="sr-only">
                          checkbox
                        </label>
                      </div>
                    </th>

                    {tableHeaders.map((header, index) => {
                      return (
                        <th scope="col" class="px-6 py-3" key={index}>
                          {header.name}
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                {/* table body */}
                <tbody>
                  {allOrders.map((order) => {
                    const {
                      _id,
                      user,
                      total,
                      address,
                      numReviews,
                      paymentMethod,
                      status,
                      orderItems,
                      dateOrdered,
                    } = order;
                    // console.log('order     ', order);
                    return (
                      <tr class="bg-white hover:bg-gray-50 " key={order._id}>
                        <td class="w-4 p-4">
                          <div class="flex items-center">
                            <input
                              id={`checkbox-table-search-${order._id}`}
                              type="checkbox"
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                            />
                            <label
                              for={`checkbox-table-search-${order._id}`}
                              class="sr-only"
                            >
                              checkbox
                            </label>
                          </div>
                        </td>
                        <td class="px-3 py-4">{order._id}</td>
                        <td class="px-3 py-4">{order.user._id}</td>
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900  "
                        >
                          {order.user.firstName} {order.user.lastName}
                        </th>
                        <th
                          scope="row"
                          class="px-3 py-4 font-medium text-gray-900  "
                        >
                          {order.total}
                        </th>
                        <td class="px-3 py-4">{order.address}</td>
                        <td class="px-3 py-4 text-center">{order.status}</td>
                        <td class="px-3 py-4 text-center">
                          {order.paymentMethod}
                        </td>

                        <td class="px-4 py-4">
                          <a
                            onClick={() => {
                              toggleIsPopupModelOpened('orderPreview');
                              dispatch(
                                addActiveOrder({
                                  _id,
                                  user,
                                  total,
                                  address,
                                  numReviews,
                                  paymentMethod,
                                  status,
                                  orderItems,
                                  dateOrdered,
                                })
                              );
                            }}
                            href="#"
                            class="font-medium text-slate-800 hover:underline hover:text-gray-800 hover:bg-gray-200  py-3 rounded-xl transition-all px-3 flex justify-center items-center gap-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-4 h-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                              />
                            </svg>
                            View
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <PopupModal
        isOpened={isPopupModelOpened}
        handlePopupClose={toggleIsPopupModelOpened}
        modal={selectedWindow}
        topic={"Order's Info "}
      />
    </>
  );
};

export default Order;
