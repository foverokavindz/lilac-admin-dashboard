import { useState } from 'react';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import ContentSpace from '../components/ContentSpace';
import { Route, Routes } from 'react-router-dom';
import Order from '../pages/order';
import Overview from '../pages/overview';
import Product from '../pages/product';
import User from '../pages/user';
import Help from '../pages/help';
import SignIn from '../pages/SignIn';
import PrivateRoute from '../components/PrivateRoute';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />

      <Route
        path="/dashboard/*"
        element={
          <div className="flex flex-row h-screen">
            <div
              className={`${
                isSidebarCollapsed ? 'w-24' : 'min-w-72'
              }  overflow-hidden`}
            >
              {/* sidebar */}
              <Sidebar />
            </div>

            <div className="flex flex-col flex-grow h-full w-4/5">
              <div className="mb-5 mt-5">
                {/* navbar */}
                <NavBar />
              </div>
              <div className="h-full w-full mb-5 overflow-y-scroll">
                {/* content  */}
                <ContentSpace>
                  <PrivateRoute path="/overview" element={<Overview />} />
                  <PrivateRoute path="/user" element={<User />} />
                  <PrivateRoute path="/product" element={<Product />} />
                  <PrivateRoute path="/order" element={<Order />} />
                  <PrivateRoute path="/help" element={<Help />} />
                </ContentSpace>
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default Dashboard;
