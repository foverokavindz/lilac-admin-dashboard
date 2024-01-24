import React from 'react';
import { useSelector } from 'react-redux';

const ContentSpace = ({ children }) => {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <div
      className={` ${
        currentUser ? 'p-10 ' : ''
      }mx-4  bg-gray-50  rounded-2xl flex flex-grow  overflow-hidden`}
    >
      {children}
    </div>
  );
};

export default ContentSpace;
