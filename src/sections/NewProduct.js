import StockColorInput from '../components/StockColorInput';
import React, { useState } from 'react';
import StockSizeInput from '../components/StockSizeInput';

const NewProduct = () => {
  const [formData, setFormData] = useState([
    { color: '', stock: [{ size: '', stock: 0 }] },
  ]);

  // only chnage updated values
  const handleChnage = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    //console.log('formData  ', formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('formData  ', formData);
  };

  const addColorFeild = () => {
    let object = { color: '', stock: [{ size: '', stock: 0 }] };
    setFormData([...formData, object]);
  };

  const addStockSizeFeild = (index) => {
    let object = { size: '', stock: 0 };
    const updatedFormData = [...formData];
    updatedFormData[index].stock = [...updatedFormData[index].stock, object];
    setFormData(updatedFormData);
  };

  const handleChnageColor = (index, event) => {
    let updatedFormData = [...formData];
    updatedFormData[index][event.target.id] = event.target.value;
    setFormData(updatedFormData);
  };

  const handleStockSizeChange = (index, indexTwo, event) => {
    let updatedFormData = [...formData];
    updatedFormData[index].stock = [
      ...updatedFormData[index].stock,
      {
        ...updatedFormData[index].stock[indexTwo],
        [event.target.id]: event.target.value,
      },
    ];
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

                        {item.stock.map((stockSize, indexSecond) => {
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
