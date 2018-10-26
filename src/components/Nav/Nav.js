import React from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {
    return (
        <div>
            <div>
                <Link to='/dashboard'>Home</Link>
            </div>
            <div>
                <Link to='/post/:postid'>Dashboard</Link>
            </div>
            <div>
                <Link to='/'>Logout</Link>
            </div>
        </div>
    );
};

export default Nav;