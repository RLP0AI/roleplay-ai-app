'use client';

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, Sparkles, Users, Shield } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Roleplay AI</span>
          </div>
          <div className="space-x-4">
            <Link 
              href="/login" 
              className="px-6 py-2 text-gray-700 hover:text-blue-600 transition"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Create & Chat with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Custom AI Characters
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Bring your imagination to life. Design unique AI characters with distinct personalities, 
            backstories, and speaking styles. Experience immersive roleplay conversations powered by 
            advanced AI technology.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/signup" 
              className="px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
            <Link 
              href="#features" 
              className="px-8 py-4 bg-white text-blue-600 text-lg rounded-lg hover:bg-gray-50 transition shadow-lg border-2 border-blue-600"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Why Choose Roleplay AI?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Sparkles className="w-12 h-12 text-blue-600" />}
            title="Custom Characters"
            description="Create unique AI characters with personalities, backstories, and distinct speaking styles"
          />
          <FeatureCard
            icon={<MessageCircle className="w-12 h-12 text-purple-600" />}
            title="Immersive Chats"
            description="Experience natural, engaging conversations that stay in character at all times"
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-pink-600" />}
            title="Multiple Characters"
            description="Build a roster of diverse characters for different roleplay scenarios"
          />
          <FeatureCard
            icon={<Shield className="w-12 h-12 text-green-600" />}
            title="Safe & Secure"
            description="Your data is protected with enterprise-grade security and privacy measures"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20 bg-white rounded-3xl shadow-xl">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <StepCard
            number="1"
            title="Sign Up & Buy Credits"
            description="Create your account and purchase credits to start chatting"
          />
          <StepCard
            number="2"
            title="Create Characters"
            description="Design AI characters with unique personalities and backstories"
          />
          <StepCard
            number="3"
            title="Start Chatting"
            description="Engage in immersive roleplay conversations with your characters"
          />
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          Simple, Transparent Pricing
        </h2>
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-5xl font-bold text-blue-600 mb-4">₹1 = 15 Credits</div>
          <p className="text-gray-600 mb-6">Pay only for what you use. No subscriptions.</p>
          <ul className="text-left space-y-3 mb-8">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              1 credit per message
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              No hidden fees
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Top up anytime
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Secure payments
            </li>
          </ul>
          <Link 
            href="/signup" 
            className="block w-full px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MessageCircle className="w-6 h-6" />
                <span className="text-xl font-bold">Roleplay AI</span>
              </div>
              <p className="text-gray-400">
                Create and chat with custom AI characters for immersive roleplay experiences.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white">Features</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/refund" className="hover:text-white">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-gray-400">
                Email: support@roleplayai.com
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Roleplay AI. All rights reserved.</p>
            <p className="mt-2 text-sm">
              Credits are non-refundable and have no cash value. For entertainment purposes only. 18+
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-blue-600 text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
