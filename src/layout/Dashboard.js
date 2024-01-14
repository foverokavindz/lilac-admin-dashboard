import React from 'react';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import ContentSpace from '../components/ContentSpace';

const Dashboard = () => {
  return (
    <div className="flex flex-row h-screen">
      <div className="w-64  rounded-r-2xl">
        {/* sidebar */}
        <Sidebar />
      </div>

      <div className="flex flex-col flex-grow h-full">
        <div className="mb-5 mt-5">
          {/* navbar */}
          <NavBar />
        </div>
        <div className="h-full mb-5">
          {/* content  */}
          <ContentSpace />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
