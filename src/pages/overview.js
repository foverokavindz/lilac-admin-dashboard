import { useState, useEffect } from 'react';
import OverviewCard from '../components/OverviewCard';
import { UseSelector, useSelector } from 'react-redux';
const BASE_URL = process.env.REACT_APP_API_URL;

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

const fetchLinks = [
  { link: `${BASE_URL}/user/count`, name: 'users' },
  { link: `${BASE_URL}/order/count`, name: 'orders' },
  { link: `${BASE_URL}/order/pending-total`, name: 'pending' },
  { link: `${BASE_URL}/product/count`, name: 'products' },
];

const Overview = () => {
  const [analyticData, setAnalyticData] = useState({
    orders: 0,
    pending: 0,
    users: 0,
    products: 0,
  });
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchLinks.map(async ({ link, name }) => {
      try {
        const response = await fetch(link);
        const data = await response.json();
        setAnalyticData((prevState) => ({
          ...prevState,
          [name]: data,
        }));
        //console.log('data   ', data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    });
  }, []);

  console.log('analyticData  ', analyticData);

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
        <OverviewCard
          name={'Orders'}
          value={analyticData.orders}
          href={'/order'}
        />

        <OverviewCard
          name={'Users'}
          value={analyticData.users}
          href={'/user'}
        />

        <OverviewCard
          name={'Products'}
          value={analyticData.products}
          href={'/product'}
        />

        <OverviewCard
          name={'Pending Payments'}
          value={'$' + analyticData.pending.toFixed(2)}
          href={'/order'}
        />
      </div>
    </div>
  );
};

export default Overview;
