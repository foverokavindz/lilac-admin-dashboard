const StockSizeInput = ({
  addStockSize,
  handleStockSizeChange,
  index,
  data,
  indexSecond,
}) => {
  return (
    <div>
      <div className="flex justify-between items-end w-full gap-3 border p-3 rounded-lg ">
        <div className="flex justify-between items-center w-full gap-3">
          <div className="w-full">
            <label
              for="size"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Size
            </label>

            <input
              type="text"
              id="size"
              name="size"
              className=" w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
              value={data.size}
              placeholder="Size"
              onChange={(e) => {
                handleStockSizeChange(index, indexSecond, e);
              }}
            />
          </div>
          <div className="w-full">
            <label
              for="stock"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Stock Count
            </label>

            <input
              type="text"
              id="stock"
              name="stock"
              className=" w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
              value={data.stock}
              placeholder="Stock"
              onChange={(e) => {
                handleStockSizeChange(index, indexSecond, e);
              }}
            />
          </div>
        </div>
        <div>
          <a
            onClick={() => addStockSize(index)}
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
    </div>
  );
};

export default StockSizeInput;
