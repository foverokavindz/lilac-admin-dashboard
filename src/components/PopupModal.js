import ProductPreview from '../sections/ProductPreview';
import UpdateProduct from '../sections/UpdateProduct';
import NewProduct from '../sections/NewProduct';
import OrderPreview from '../sections/OrderPreview';
import NewCategory from '../sections/NewCategory';
import ViewUser from '../sections/ViewUser';

const PopupModel = ({ isOpened, handlePopupClose, modal, topic }) => {
  return (
    <div
      id="default-modal"
      tabindex="-1"
      aria-hidden="true"
      className={` ${
        !isOpened ? 'hidden' : ''
      } fixed  z-50 flex justify-center items-center w-full  md:inset-0  h-full max-h-full  bg-gray-900 bg-opacity-30 backdrop-blur-sm  `}
    >
      <div className="relative p-4 w-full max-w-6xl  h-full">
        <div className="relative bg-white rounded-xl shadow   h-full flex flex-col">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">{topic}</h3>
            <button
              onClick={() => handlePopupClose()}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Dynamic Content */}
          <div className="py-4 md:p-5 space-y-4 h-full flex-grow  overflow-y-scroll ">
            {modal === 'productOverview' ? (
              <ProductPreview />
            ) : modal === 'updateProduct' ? (
              <UpdateProduct />
            ) : modal === 'newProduct' ? (
              <NewProduct />
            ) : modal === 'orderPreview' ? (
              <OrderPreview />
            ) : modal === 'newCategory' ? (
              <NewCategory />
            ) : modal === 'viewUser' ? (
              <ViewUser />
            ) : (
              ''
            )}
          </div>

          <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b  justify-end">
            <button
              onClick={() => handlePopupClose()}
              data-modal-hide="default-modal"
              type="button"
              class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModel;
