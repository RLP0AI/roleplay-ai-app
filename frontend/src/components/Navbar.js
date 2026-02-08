'use client';

import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MessageCircle, Coins, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { user, credits, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <MessageCircle className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Roleplay AI</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link 
              href="/buy-credits" 
              className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
            >
              <Coins className="w-5 h-5" />
              <span className="font-semibold">{credits} Credits</span>
            </Link>

            <div className="flex items-center space-x-2 text-gray-700">
              <User className="w-5 h-5" />
              <span>{user?.email}</span>
            </div>

            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
