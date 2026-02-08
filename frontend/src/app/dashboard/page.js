'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { characterAPI } from '@/lib/api';
import { Plus, MessageCircle, Edit, Trash2, Coins } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { user, credits, loading } = useAuth();
  const router = useRouter();
  const [characters, setCharacters] = useState([]);
  const [loadingCharacters, setLoadingCharacters] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchCharacters();
    }
  }, [user]);

  const fetchCharacters = async () => {
    try {
      const response = await characterAPI.getAll();
      setCharacters(response.data.characters);
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setLoadingCharacters(false);
    }
  };

  const handleDeleteCharacter = async (id) => {
    if (!confirm('Are you sure you want to delete this character?')) return;

    try {
      await characterAPI.delete(id);
      setCharacters(characters.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting character:', error);
      alert('Failed to delete character');
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your AI characters and start chatting</p>
        </div>

        {/* Credits Warning */}
        {credits < 10 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Coins className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="font-semibold text-yellow-800">Low Credits</p>
                <p className="text-sm text-yellow-700">
                  You have {credits} credits remaining. Buy more to continue chatting.
                </p>
              </div>
            </div>
            <Link
              href="/buy-credits"
              className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
            >
              Buy Credits
            </Link>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-4 mb-8">
          <Link
            href="/characters/create"
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span>Create Character</span>
          </Link>
          <Link
            href="/buy-credits"
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md"
          >
            <Coins className="w-5 h-5" />
            <span>Buy Credits</span>
          </Link>
        </div>

        {/* Characters Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Characters</h2>
          
          {loadingCharacters ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : characters.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No characters yet</h3>
              <p className="text-gray-600 mb-6">Create your first AI character to start roleplaying</p>
              <Link
                href="/characters/create"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Plus className="w-5 h-5" />
                <span>Create Character</span>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {characters.map((character) => (
                <div key={character.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{character.name}</h3>
                        <p className="text-sm text-gray-600">{character.role}</p>
                      </div>
                      {character.nsfw && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded">
                          NSFW
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {character.personality}
                    </p>

                    <div className="flex space-x-2">
                      <Link
                        href={`/chat/${character.id}`}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat</span>
                      </Link>
                      <Link
                        href={`/characters/edit/${character.id}`}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteCharacter(character.id)}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
