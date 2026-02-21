import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({type: 'leave', description: '', startDate: '', endDate: ''});

    useEffect(() => { fetchRequests(); }, []);

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/requests', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRequests(response.data);
        } catch (err) {
            console.error('Error fetching requests:', err);
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/requests', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchRequests();
            setShowForm(false);
            setFormData({type: 'leave', description: '', startDate: '', endDate: ''});
        } catch (err) {
            console.error('Error creating request:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 درخواست‌ها</h1>
                <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mb-6">
                    ➕ درخواست جدید
                </button>
                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6">
                        <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4">
                            <option value="leave">مرخصی</option>
                            <option value="mission">مأموریت</option>
                            <option value="other">سایر</option>
                        </select>
                        <textarea name="description" placeholder="توضیحات" value={formData.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4" />
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4" />
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4" />
                        <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
                            ✅ ارسال
                        </button>
                    </form>
                )}
                <div className="space-y-4">
                    {requests.length === 0 ? (
                        <p className="text-gray-500 text-center">هنوز درخواستی وجود ندارد</p>
                    ) : (
                        requests.map(req => (
                            <div key={req._id} className="bg-white rounded-lg shadow p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-800">{req.type === 'leave' ? '🏖️ مرخصی' : req.type === 'mission' ? '🚀 مأموریت' : '📝 سایر'}</h3>
                                        <p className="text-gray-600">{req.description}</p>
                                        <p className="text-sm text-gray-500 mt-2">{new Date(req.startDate).toLocaleDateString('fa-IR')} تا {new Date(req.endDate).toLocaleDateString('fa-IR')}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded text-white font-bold ${req.status === 'pending' ? 'bg-yellow-500' : req.status === 'approved' ? 'bg-green-500' : 'bg-red-500'}`}>{req.status === 'pending' ? '⏳ در انتظار' : req.status === 'approved' ? '✅ تایید شد' : '❌ رد شد'}</span>
                                </div>
                            </div>
                        )))
                    }
                </div>
            </div>
        </div>
    );
};

export default Requests;