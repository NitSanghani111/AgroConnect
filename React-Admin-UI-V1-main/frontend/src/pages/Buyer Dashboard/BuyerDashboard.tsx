import React from 'react';
import BuyerProducts from './BuyerProducts';
import History from './History';
import BuyerAnalytics from './BuyerAnalytics';
import {BuyerProfile} from './BuyerProfile';

const BuyerDashboard = () => {
  return (
    <div>
      <h2>Buyer Dashboard</h2>
      <BuyerProducts />
      <History />
      <BuyerAnalytics />
      <BuyerProfile />
    </div>
  );
};

export default BuyerDashboard;
