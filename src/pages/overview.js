import React from 'react';
import OverviewCard from '../components/OverviewCard';
import { UseSelector, useSelector } from 'react-redux';

const dummyData = [
  {
    key: 1,
    name: 'Order',
    value: 201,
    href: '/order',
  },
  {
    key: 2,
    name: 'Pending Payments',
    value: 100,
    href: '/product',
  },
  {
    key: 3,
    name: 'Users',
    value: 50,
    href: '/user',
  },
  {
    key: 4,
    name: 'Product Count',
    value: 20,
    href: '/product',
  },
];

const Overview = () => {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="px-4 sm:px-0">
          <h3 className="text-2xl font-semibold leading-7 text-gray-900">
            Analytics overview
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Insight from data.
          </p>
        </div>
        <div className="text-xl font-semibold bg-gray-200 px-6 py-3 rounded-2xl">
          Welcome {currentUser.firstName} 👋
        </div>
      </div>
      <div className="mt-10 flex flex-row flex-wrap gap-8 w-full justify-start ">
        {dummyData.map(({ key, name, value, href }) => {
          return (
            <OverviewCard key={key} name={name} value={value} href={href} />
          );
        })}
      </div>
    </div>
  );
};

export default Overview;
