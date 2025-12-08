import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Activity, AlertCircle, Truck } from 'lucide-react';

const data = [
    { name: 'Jan', Fever: 40, Dengue: 24, Covid: 24 },
    { name: 'Feb', Fever: 30, Dengue: 13, Covid: 22 },
    { name: 'Mar', Fever: 20, Dengue: 58, Covid: 22 },
    { name: 'Apr', Fever: 27, Dengue: 39, Covid: 20 },
    { name: 'May', Fever: 18, Dengue: 48, Covid: 21 },
    { name: 'Jun', Fever: 23, Dengue: 38, Covid: 25 },
];

const pieData = [
    { name: 'Normal', value: 400 },
    { name: 'Urgent', value: 300 },
    { name: 'Critical', value: 100 },
];

const COLORS = ['#28a745', '#ffc107', '#dc3545'];

const StatCard = ({ icon, label, value, color }) => (
    <div className="card flex items-center gap-4">
        <div style={{ padding: '1rem', borderRadius: '50%', background: `${color}20`, color: color }}>
            {icon}
        </div>
        <div>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{value}</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{label}</p>
        </div>
    </div>
);

const Dashboard = () => {
    return (
        <div className="container" style={{ paddingBottom: '2rem' }}>
            <h2 className="mb-4" style={{ color: 'var(--primary)' }}>District Health Analytics</h2>

            {/* Stats Row */}
            <div className="flex gap-4 mb-4" style={{ flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}><StatCard icon={<Users />} label="Total Patients" value="1,284" color="#138808" /></div>
                <div style={{ flex: '1 1 200px' }}><StatCard icon={<Activity />} label="Active Cases" value="342" color="#FF9933" /></div>
                <div style={{ flex: '1 1 200px' }}><StatCard icon={<AlertCircle />} label="Critical Alerts" value="12" color="#dc3545" /></div>
                <div style={{ flex: '1 1 200px' }}><StatCard icon={<Truck />} label="Ambulances Active" value="8" color="#007bff" /></div>
            </div>

            <div className="flex gap-4 flex-col md:flex-row">
                {/* Main Chart */}
                <div className="card" style={{ flex: 2, minHeight: '400px' }}>
                    <h3 className="mb-4">Disease Trends (Last 6 Months)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Fever" fill="#8884d8" />
                            <Bar dataKey="Dengue" fill="#82ca9d" />
                            <Bar dataKey="Covid" fill="#ffc658" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="card" style={{ flex: 1, minHeight: '400px' }}>
                    <h3 className="mb-4">Triage Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
