const StockColorInput = ({ addColorFeild, handleChnageColor, index, data }) => {
  return (
    <div>
      <div className="mb-3 flex flex-row justify-between items-center gap-3 ">
        <label
          for="color"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Color
        </label>

        <input
          type="text"
          id="color"
          name="color"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          value={data.color}
          placeholder="Color"
          onChange={(e) => {
            handleChnageColor(index, e);
          }}
        />

        <a
          onClick={() => addColorFeild()}
          className="p-3  drop-shadow-lg bg-gray-800 text-white rounded-2xl text-base font-medium flex flex-row gap-3 items-center border-2 hover:bg-gray-100 hover:text-gray-800 border-gray-800 transition-all"
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
        </a>
      </div>
    </div>
  );
};

export default StockColorInput;
