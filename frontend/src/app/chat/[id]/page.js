'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { characterAPI, chatAPI } from '@/lib/api';
import { ArrowLeft, Send, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ChatPage() {
  const { user, credits, refreshCredits } = useAuth();
  const router = useRouter();
  const params = useParams();
  const characterId = params.id;

  const [character, setCharacter] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (characterId) {
      fetchCharacter();
      fetchChatHistory();
    }
  }, [user, characterId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchCharacter = async () => {
    try {
      const response = await characterAPI.getOne(characterId);
      setCharacter(response.data);
    } catch (err) {
      console.error('Error fetching character:', err);
      setError('Failed to load character');
    }
  };

  const fetchChatHistory = async () => {
    try {
      const response = await chatAPI.getHistory(characterId);
      if (response.data.chats && response.data.chats.length > 0) {
        const latestChat = response.data.chats[0];
        setChatId(latestChat.id);
        setMessages(latestChat.messages || []);
      }
    } catch (err) {
      console.error('Error fetching chat history:', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Check credits
    if (credits < 1) {
      setError('Insufficient credits. Please purchase more credits to continue chatting.');
      return;
    }

    setError('');
    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    // Add user message to UI immediately
    const tempUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempUserMessage]);

    try {
      const response = await chatAPI.sendMessage({
        characterId,
        message: userMessage,
        chatId
      });

      // Update chat ID if this was the first message
      if (!chatId && response.data.chatId) {
        setChatId(response.data.chatId);
      }

      // Add AI response
      setMessages(prev => [...prev, response.data.aiMessage]);

      // Refresh credits
      await refreshCredits();
    } catch (err) {
      console.error('Error sending message:', err);
      
      // Remove temp user message on error
      setMessages(prev => prev.slice(0, -1));

      if (err.response?.status === 402) {
        setError('Insufficient credits. Redirecting to purchase page...');
        setTimeout(() => router.push('/buy-credits'), 2000);
      } else {
        setError(err.response?.data?.error || 'Failed to send message');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user || !character) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{character.name}</h1>
                <p className="text-sm text-gray-600">{character.role}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Credits</p>
              <p className="text-lg font-bold text-gray-900">{credits}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border-b border-red-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center space-x-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Start a conversation with {character.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  Each message costs 1 credit
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Character Info:</strong>
                  </p>
                  <p className="text-sm text-blue-700 mt-2">{character.personality}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-900 shadow-md'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.role === 'user' ? 'text-blue-200' : 'text-gray-500'
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg px-4 py-3 shadow-md">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${character.name}...`}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              disabled={loading || credits < 1}
              maxLength={2000}
            />
            <button
              type="submit"
              disabled={loading || !input.trim() || credits < 1}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2">
            1 credit per message • {credits} credits remaining
          </p>
        </div>
      </div>
    </div>
  );
}
