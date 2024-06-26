import { useState, useEffect } from 'react';
import { addActiveProduct } from '../store/reducers/productSlice';
import { useDispatch } from 'react-redux';
import PopupModal from '../components/PopupModal';
const BASE_URL = process.env.REACT_APP_API_URL;

const tableHeaders = [
  { name: 'Image' },
  { name: 'Id' },
  { name: 'Name' },
  { name: 'Caregories' },
  { name: 'Brand' },
  { name: ' price' },
  { name: 'Featured' },
  { name: 'Action' },
];

const productData = [
  {
    name: 'Apple MacBook Pro 17"',
    color: 'Silver',
    category: 'Laptop',
    price: '$2999',
  },
  {
    name: 'Microsoft Surface Pro',
    color: 'White',
    category: 'Laptop PC',
    price: '$1999',
  },
  {
    name: 'Magic Mouse 2',
    color: 'Black',
    category: 'Accessories',
    price: '$99',
  },
  {
    name: 'Apple Watch',
    color: 'Silver',
    category: 'Accessories',
    price: '$179',
  },
  {
    name: 'iPad',
    color: 'Gold',
    category: 'Tablet',
    price: '$699',
  },
  {
    name: 'Apple iMac 27"',
    color: 'Silver',
    category: 'PC Desktop',
    price: '$3999',
  },
];

const Product = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isPopupModelOpened, setIsPopupModelOpened] = useState(false);
  const [popupModalTopic, setPopupModalTopic] = useState('');
  const [selectedWindow, setSelectedWindow] = useState('');
  const dispatch = useDispatch();

  const toggleIsPopupModelOpened = (modal) => {
    setIsPopupModelOpened(!isPopupModelOpened);
    setSelectedWindow(modal);
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await fetch(BASE_URL + '/product');
        const data = await response.json();
        setAllProducts(data);
        console.log('data   ', data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getAllProducts();
  }, []);

  console.log('allProducts  -  ', allProducts);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="px-4 sm:px-0">
            <h3 className="text-2xl font-semibold leading-7 text-gray-900">
              Product Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Personal details overview.
            </p>
          </div>

          <div className="flex flex-row justify-between items-center gap-4">
            <button
              className="py-3 px-7 drop-shadow-lg bg-gray-800 text-white rounded-2xl text-base font-medium flex flex-row gap-3 items-center border-2 hover:bg-gray-100 hover:text-gray-800 border-gray-800 transition-all"
              onClick={() => {
                toggleIsPopupModelOpened('newCategory');
                setPopupModalTopic('Categories Overview');
              }}
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
                  d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              New Category
            </button>
            <button
              className="py-3 px-7 drop-shadow-lg bg-gray-800 text-white rounded-2xl text-base font-medium flex flex-row gap-3 items-center border-2 hover:bg-gray-100 hover:text-gray-800 border-gray-800 transition-all"
              onClick={() => {
                toggleIsPopupModelOpened('newProduct');
                setPopupModalTopic('Add New Product');
              }}
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              New Product
            </button>
          </div>
        </div>

        {/* table */}
        <div className="mt-10">
          <div class="relative overflow-x-auto  sm:rounded-lg">
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
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 rounded-3xl">
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
                {allProducts.map((item) => {
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
                  } = item;
                  // console.log('item     ', item);
                  return (
                    <tr class="bg-white hover:bg-gray-50 " key={item._id}>
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id={`checkbox-table-search-${item._id}`}
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                          />
                          <label
                            for={`checkbox-table-search-${item._id}`}
                            class="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 m-3 ">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center cursor-pointer hover:scale-110 hover:rotate-6 transition-all"
                            onClick={() => {
                              toggleIsPopupModelOpened('productOverview');
                              setPopupModalTopic('Product Overview');
                              dispatch(
                                addActiveProduct({
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
                                })
                              );
                            }}
                          />
                        </div>
                      </td>
                      <td class="px-6 py-4">{item._id}</td>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {item.name}
                      </th>
                      <td class="px-6 py-4">
                        {item.category.map((el) => el.name + ', ')}
                      </td>
                      <td class="px-6 py-4">{item.brand}</td>
                      <td class="px-6 py-4">{item.price}</td>

                      <td class="px-6 py-4 text-center">
                        {item.isFeatured ? 'Yes' : 'No'}
                      </td>
                      <td class="px-6 py-4">
                        <a
                          onClick={() => {
                            toggleIsPopupModelOpened('updateProduct');
                            setPopupModalTopic('Update Product Information');

                            dispatch(
                              addActiveProduct({
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
                            class="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                          </svg>
                          Edit
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

      <PopupModal
        isOpened={isPopupModelOpened}
        handlePopupClose={toggleIsPopupModelOpened}
        modal={selectedWindow}
        topic={popupModalTopic}
      />
    </>
  );
};

export default Product;
