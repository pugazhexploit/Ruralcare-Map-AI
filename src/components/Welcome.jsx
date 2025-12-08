import { useNavigate } from 'react-router-dom';
import { Globe, ArrowRight } from 'lucide-react';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-full" style={{ minHeight: '80vh', textAlign: 'center' }}>
            <div className="card" style={{ maxWidth: '500px', width: '100%', padding: '3rem 2rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    {/* Placeholder for India Emblem - using a text representation for now or an icon */}
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🇮🇳</div>
                    <h1 style={{ color: 'var(--primary)', fontSize: '2rem', marginBottom: '0.5rem' }}>Ruralcare Map AI</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>AI Rural Health Assistant System</p>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        className="btn btn-primary"
                        style={{ fontSize: '1.2rem', padding: '1rem' }}
                        onClick={() => navigate('/chat')}
                    >
                        Start Health Checkup <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                    </button>

                    <div className="flex items-center justify-center gap-2" style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
                        <Globe size={16} />
                        <span>Select Language:</span>
                        <select style={{ padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid #ccc' }}>
                            <option>English</option>
                            <option>Hindi</option>
                            <option>Tamil</option>
                            <option>Telugu</option>
                        </select>
                    </div>
                </div>

                <div style={{ marginTop: '3rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <p>Smart India Healthcare Accessibility</p>
                    <p style={{ marginTop: '0.5rem', fontWeight: '500' }}>Project by: Pugazhenthi J</p>
                    <p style={{ fontSize: '0.8rem' }}>B.Sc Computer Science 2nd Year</p>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
