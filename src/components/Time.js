import React from 'react';

const Time = () => {
  const date = new Date();
  const showTime =
    date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  return (
    <div>
      <h2> {showTime}</h2>
    </div>
  );
};

export default Time;
