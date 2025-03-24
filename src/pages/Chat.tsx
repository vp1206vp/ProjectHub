import React, { useState, useEffect } from 'react';
import { Send, User, Phone, Video } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
}

const teamMembers = [
  { name: "John Doe", role: "Project Manager" },
  { name: "Sarah Smith", role: "Developer" },
  { name: "Alex Johnson", role: "Designer" },
  { name: "Emily Brown", role: "QA Engineer" },
];

const teamResponses = [
  "I'll look into that and get back to you shortly.",
  "That's a great point! Let me add it to our discussion points.",
  "I've updated the task status in our project management system.",
  "The latest metrics show we're on track with our timeline.",
  "I've scheduled a follow-up meeting to discuss these details.",
  "Would you like me to create a new task for this requirement?",
  "I can help you analyze the project data if you'd like.",
  "Let me check the resource availability for this sprint.",
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "John Doe",
      message: "Hey team, how's the progress on the new feature?",
      timestamp: "10:30 AM"
    },
    {
      id: 2,
      sender: "Sarah Smith",
      message: "We're almost done with the implementation. Just need to fix a few bugs.",
      timestamp: "10:32 AM"
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateTeamResponse = () => {
    const randomResponse = teamResponses[Math.floor(Math.random() * teamResponses.length)];
    const randomMember = teamMembers[Math.floor(Math.random() * teamMembers.length)];
    return {
      id: messages.length + 2,
      sender: randomMember.name,
      message: randomResponse,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        sender: "You",
        message: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      setIsTyping(true);

      // Simulate team member response
      setTimeout(() => {
        const teamMessage = generateTeamResponse();
        setMessages(prev => [...prev, teamMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  useEffect(() => {
    const chatContainer = document.getElementById('chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Team Chat</h2>
              <p className="text-sm text-gray-500">5 members</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Video className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div id="chat-messages" className="flex-1 bg-white rounded-lg shadow-sm p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md ${
                  msg.sender === 'You'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                } rounded-lg px-4 py-2 space-y-1`}
              >
                <p className="text-sm font-medium">{msg.sender}</p>
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs opacity-75">{msg.timestamp}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2">
                <p className="text-sm text-gray-500">{teamMembers[Math.floor(Math.random() * teamMembers.length)].name} is typing...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSend} className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;