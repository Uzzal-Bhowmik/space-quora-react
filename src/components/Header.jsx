import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Link to='/' className='me-3'>Home</Link>
            <Link to='/map' className='me-3'>Map</Link>
            <Link to='/cimage'>Celestial Image</Link>
        </div>
    );
};

export default Header;