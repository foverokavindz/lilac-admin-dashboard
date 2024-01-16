import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/product');
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getAllProducts();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="px-4 sm:px-0">
          <h3 className="text-2xl font-semibold leading-7 text-gray-900">
            Product Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details overview.
          </p>
        </div>

        <div>
          <button className="py-4 px-8 drop-shadow-lg bg-gray-800 text-white rounded-xl text-base font-medium">
            New product
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
              {allProducts.map((item, index) => {
                return (
                  <tr class="bg-white hover:bg-gray-50 " key={index}>
                    <td class="w-4 p-4">
                      <div class="flex items-center">
                        <input
                          id={`checkbox-table-search-${index}`}
                          type="checkbox"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                        />
                        <label
                          for={`checkbox-table-search-${index}`}
                          class="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 m-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
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
                        href="#"
                        class="font-medium text-blue-600 hover:underline"
                      >
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
  );
};

export default Product;
