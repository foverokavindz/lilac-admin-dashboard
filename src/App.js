import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './layout/Dashboard';

const App = () => (
  <>
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  </>
);

export default App;
