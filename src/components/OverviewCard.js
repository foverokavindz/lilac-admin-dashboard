import React from 'react';
import { useNavigate } from 'react-router-dom';

const OverviewCard = ({ name, value, href }) => {
  const navigate = useNavigate();
  return (
    <div className="w-60 px-7 py-5 bg-gray-200 rounded-2xl hover:bg-gray-300 transition-all hover:scale-105 hover:shadow-lg flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-xl text-gray-500 text-balance">
          {name}
        </p>
        <button
          className="bg-gray-200 hover:bg-gray-400 p-2 rounded-xl"
          onClick={() => navigate(href)}
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
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
        </button>
      </div>
      <div className="mt-2">
        <p className="font-semibold text-5xl text-gray-700">{value}</p>
      </div>
    </div>
  );
};

export default OverviewCard;
