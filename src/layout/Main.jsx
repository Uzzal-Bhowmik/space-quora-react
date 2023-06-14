import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Main = () => {
    return (
        <div>
            {/* <Header /> */}
            <Outlet />
        </div>
    );
};

export default Main;