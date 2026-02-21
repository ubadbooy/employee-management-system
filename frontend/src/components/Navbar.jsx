import React from 'react';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">💼 سیستم مدیریت کارمندان</h1>
                <div className="flex gap-4">
                    <button onClick={() => navigate('/dashboard')} className="hover:bg-blue-700 px-3 py-2 rounded">🏠 خانه</button>
                    <button onClick={() => navigate('/profile')} className="hover:bg-blue-700 px-3 py-2 rounded">👤 پروفایل</button>
                    <button onClick={() => navigate('/requests')} className="hover:bg-blue-700 px-3 py-2 rounded">📋 درخواست‌ها</button>
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded">🚪 خروج</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;