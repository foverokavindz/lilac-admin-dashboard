import React from 'react';
import { useSelector } from 'react-redux';

const OrderPreview = () => {
  const { activeOrder } = useSelector((state) => state.product);
  return (
    <div>
      <p>{activeOrder}</p>
    </div>
  );
};

export default OrderPreview;
