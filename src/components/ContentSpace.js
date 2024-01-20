import React from 'react';

const ContentSpace = ({ children }) => {
  return (
    <div className="mx-4 p-10 bg-gray-50  rounded-2xl flex flex-grow  overflow-hidden">
      {children}
    </div>
  );
};

export default ContentSpace;
