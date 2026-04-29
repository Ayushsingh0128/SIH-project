import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import './chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    // Add the initial welcome message when the chat opens for the first time
    useEffect(() => {
        if (isOpen && chatHistory.length === 0) {
            setChatHistory([{
                sender: 'ai',
                text: "Hello! I'm your AI assistant for making your task easier. How can I help you today? You can ask me about finding services, getting best and nearby professional workers for any kind of services, or anything else related to our platform."
            }]);
        }
    }, [isOpen]);

    // Automatically scroll to the latest message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const newUserMessage = { sender: 'user', text: userInput };
        const currentHistory = [...chatHistory, newUserMessage];
        setChatHistory(currentHistory);
        setUserInput('');
        setIsLoading(true);

        try {
            const prompt = `You are a helpful AI assistant for a website called "Local Link". Your goal is to assist users, who can be either here for finding local services like electricians, pg flats , tiffin services, plumber, carpenter. or recruiters for adding services. Keep your answers helpful, concise, and friendly.

            Previous conversation:
            ${historyToText(currentHistory)}

            User's new question: "${userInput}"

            Your response:`;

            const aiResponse = await getAiResponse(prompt);

            if (aiResponse) {
                setChatHistory(prev => [...prev, { sender: 'ai', text: aiResponse }]);
            }
        } catch (error) {
            // Error is handled inside getAiResponse
        } finally {
            setIsLoading(false);
        }
    };

    const getAiResponse = async (prompt) => {
        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
            const payload = { contents: [{ parts: [{ text: prompt }] }] };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error:", errorData);
                toast.error("The AI assistant is currently unavailable.");
                return null;
            }

            const result = await response.json();
            return result.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error("Fetch Error:", error);
            toast.error("Could not connect to the AI assistant.");
            return null;
        }
    };

    const historyToText = (history) => {
        return history.map(msg => `${msg.sender === 'ai' ? 'AI' : 'User'}: ${msg.text}`).join('\n');
    };

    return (
        <div className="chatbot-container">
            <div className={`chat-window ${isOpen ? 'open' : ''}`}>
                <div className="chat-header">
                    <h2>AI Assistant</h2>
                    <button onClick={() => setIsOpen(false)}>&times;</button>
                </div>
                <div className="chat-messages">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message ai typing-indicator">
                            <span></span><span></span><span></span>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                <form className="chat-input-form" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ask a question..."
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading}>Send</button>
                </form>
            </div>
            <button className="chatbot-toggle-button" onClick={() => setIsOpen(!isOpen)}>
                {/* Chat Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="white">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
            </button>
        </div>
    );
};

export default Chatbot;
