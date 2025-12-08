import { useState, useRef, useEffect } from 'react';
import { Send, Mic, User, Bot, AlertTriangle, CheckCircle, Phone } from 'lucide-react';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Namaste! I am your Ruralcare Map AI assistant. Please describe your symptoms.", sender: 'bot', type: 'text' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user', type: 'text' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Mock AI Analysis Logic
        setTimeout(() => {
            let botResponse = { id: Date.now() + 1, sender: 'bot', type: 'text' };
            const lowerInput = userMsg.text.toLowerCase();

            if (lowerInput.includes('pugazh')) {
                botResponse = {
                    ...botResponse,
                    text: "Hello Pugazh! How can I help you with your health today? I am here to assist you.",
                    status: 'neutral'
                };
            } else if (lowerInput.includes('chest pain') || lowerInput.includes('heart') || lowerInput.includes('breathing')) {
                botResponse = {
                    ...botResponse,
                    text: "CRITICAL ALERT: These symptoms could indicate a serious condition. I am locating the nearest ambulance.",
                    status: 'critical'
                };
            } else if (lowerInput.includes('fever') || lowerInput.includes('fiver') || lowerInput.includes('hot') || lowerInput.includes('headache') || lowerInput.includes('cough') || lowerInput.includes('cold')) {
                botResponse = {
                    ...botResponse,
                    text: "It sounds like you might have a viral infection or fever. Please monitor your temperature, drink plenty of water, and rest. If it persists for more than 3 days, please consult a doctor.",
                    status: 'normal'
                };
            } else {
                botResponse = {
                    ...botResponse,
                    text: "I see. I'm listening. Could you tell me a bit more about how you are feeling? For example, do you have any pain or fever?",
                    status: 'neutral'
                };
            }

            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="container" style={{ maxWidth: '800px', height: 'calc(100vh - 100px)' }}>
            <div className="card h-full flex flex-col" style={{ padding: 0, overflow: 'hidden' }}>

                {/* Chat Header */}
                <div style={{ padding: '1rem', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'white', padding: '0.5rem', borderRadius: '50%', color: 'var(--primary)' }}>
                        <Bot size={24} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0 }}>Dr. AI Assistant</h3>
                        <small style={{ opacity: 0.9 }}>Always here to help</small>
                    </div>
                </div>

                {/* Messages Area */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#f0f2f5' }}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            style={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '80%',
                                display: 'flex',
                                gap: '0.5rem',
                                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
                            }}
                        >
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                background: msg.sender === 'user' ? 'var(--secondary)' : 'var(--primary)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                                flexShrink: 0
                            }}>
                                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div style={{
                                    padding: '1rem',
                                    borderRadius: '1rem',
                                    borderTopLeftRadius: msg.sender === 'bot' ? '0' : '1rem',
                                    borderTopRightRadius: msg.sender === 'user' ? '0' : '1rem',
                                    background: msg.sender === 'user' ? 'var(--primary)' : 'white',
                                    color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                }}>
                                    {msg.text}
                                </div>

                                {/* Status Cards for Bot Responses */}
                                {msg.status === 'critical' && (
                                    <div style={{ background: '#ffebee', border: '1px solid #ef5350', borderRadius: 'var(--radius)', padding: '1rem', color: '#c62828' }}>
                                        <div className="flex items-center gap-2 mb-2" style={{ fontWeight: 'bold' }}>
                                            <AlertTriangle size={20} /> Emergency Detected
                                        </div>
                                        <button className="btn w-full" style={{ background: '#c62828', color: 'white' }}>
                                            <Phone size={18} style={{ marginRight: '0.5rem' }} /> Call Ambulance Now
                                        </button>
                                    </div>
                                )}

                                {msg.status === 'normal' && (
                                    <div style={{ background: '#e8f5e9', border: '1px solid #66bb6a', borderRadius: 'var(--radius)', padding: '0.5rem 1rem', color: '#2e7d32', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <CheckCircle size={16} /> Self-care advised
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div style={{ alignSelf: 'flex-start', marginLeft: '3rem', color: '#888', fontSize: '0.9rem' }}>
                            Dr. AI is typing...
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div style={{ padding: '1rem', background: 'white', borderTop: '1px solid #eee', display: 'flex', gap: '0.5rem' }}>
                    <button className="btn" style={{ background: '#f0f2f5', color: 'var(--text-secondary)', padding: '0.75rem' }}>
                        <Mic size={20} />
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your symptoms here..."
                        style={{
                            flex: 1,
                            padding: '0.75rem 1rem',
                            borderRadius: '2rem',
                            border: '1px solid #ddd',
                            outline: 'none',
                            fontSize: '1rem'
                        }}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={handleSend}
                        style={{ borderRadius: '50%', width: '48px', height: '48px', padding: 0 }}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
