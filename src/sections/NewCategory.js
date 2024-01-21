import React from 'react';

const dummyData = [
  {
    name: 'T-Shirts',
    description: 'Casual and comfortable T-shirts for everyday wear.',
  },

  {
    name: 'Jeans',
    description: 'Various styles of jeans for a trendy look.',
  },
  {
    name: 'Running Shoes',
    description: 'High-performance running shoes for sports enthusiasts.',
  },

  {
    name: 'Formal Wear',
    description: 'Elegant and sophisticated formal wear for special occasions.',
  },
  {
    name: 'Jackets',
    description: 'Stylish jackets to keep you warm in cold weather.',
  },
  {
    name: 'Men',
    description: 'Cloths for men',
  },
  {
    name: 'Women',
    description: 'Cloths for women',
  },
  {
    name: 'Kids',
    description: 'Cloths for Kids',
  },
  {
    name: 'Unisex',
    description: 'Unisex cloths',
  },
];

const NewCategory = () => {
  const handleSubmit = () => {};
  const handleChnage = () => {};
  return (
    <div className="flex flex-col px-12 w-full gap-5">
      <div className="px-12 bg-gray-100 py-7 rounded-2xl">
        <h3 className="py-4 text-2xl  font-bold  text-gray-700 ">
          Add new category
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-6  border-gray-300">
            <dl className="divide-y divide-gray-300">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Category Name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    placeholder="Enter Cantegory Name"
                    id="category"
                    onChange={handleChnage}
                    autoComplete="category"
                    className="block w-full rounded-md border-0 px-5 py-3 text-gray-600 text-base font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Description
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <textarea
                    onChange={handleChnage}
                    id="message"
                    rows="4"
                    className="block w-full rounded-md border-0 px-5 py-3 text-gray-600 text-base font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Description about the category"
                  ></textarea>
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  Insert
                </button>
              </div>
            </dl>
          </div>
        </form>
      </div>

      <div className=" py-7 rounded-2xl">
        <h3 className="py-4 text-2xl  font-bold  text-gray-700 ">Categories</h3>
        <div className="rounded-3xl overflow-x-auto">
          <table class="w-full text-sm text-center rtl:text-right text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-200 ">
              <tr className="py-10">
                <th scope="col" class="px-6 py-3">
                  Category Id
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((category, index) => {
                return (
                  <tr class="bg-gray-100 border-b " key={index}>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {index}
                    </th>
                    <td class="px-6 py-4">{category.name}</td>
                    <td class="px-6 py-4">{category.description}</td>
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

export default NewCategory;
