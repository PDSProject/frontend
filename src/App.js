import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import FindItem from './components/FindItem';
import Register from './components/Register';
import FindOrder from './components/FindOrder';
import StartOrder from './components/StartOrder';
import AcceptDonation from './components/AcceptDonation';
import AllAvailable from './components/AllAvailable';
import DeleteItem from './components/DeleteItem';
import GetDonor from './components/GetDonor';
import SearchItems from './components/SearchItems';
import ItemsAtLocation from './components/ItemsAtLocation';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/finditem" element={<FindItem />} />
        <Route path="/deleteitem" element={<DeleteItem />} />
        <Route path="/getdonor" element={<GetDonor />} />
        <Route path="/findorder" element={<FindOrder />} />
        <Route path="/allavailableitems" element={<AllAvailable />} />
        <Route path="/startorder" element={<StartOrder />} />
        <Route path="/acceptdonation" element={<AcceptDonation />} />
        <Route path="/searchitems" element={<SearchItems />} />
        <Route path="/itemsatlocation" element={<ItemsAtLocation />} />
      </Routes>
    </Router>
  );
}

export default App;
