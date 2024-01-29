import React from 'react';
import StockSizeInput from './StockSizeInput';

const StockColorInput = () => {
  return (
    <div>
      <div className="mb-3 flex flex-row justify-between items-center gap-3">
        <input
          type="text"
          id="color"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Color"
          required
        />

        <a className="p-3  drop-shadow-lg bg-gray-800 text-white rounded-2xl text-base font-medium flex flex-row gap-3 items-center border-2 hover:bg-gray-100 hover:text-gray-800 border-gray-800 transition-all">
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
        </a>
      </div>

      <StockSizeInput />
    </div>
  );
};

export default StockColorInput;
