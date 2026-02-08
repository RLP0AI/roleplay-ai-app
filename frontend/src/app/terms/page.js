import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-gray-600 mb-8">Last Updated: February 2024</p>

          <div className="prose prose-blue max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using Roleplay AI, you accept and agree to be bound by the terms and provisions of this agreement. 
                If you do not agree to these terms, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Age Requirement</h2>
              <p className="text-gray-700">
                You must be at least 18 years old to use this service. By using Roleplay AI, you represent and warrant that you 
                are at least 18 years of age. We do not knowingly collect information from individuals under 18.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Credits and Payment</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Credits are purchased virtual currency used to access AI chat features</li>
                <li>Conversion rate: ₹1 = 15 credits (subject to change)</li>
                <li>Credits cost: 1 credit per message sent</li>
                <li>Credits have no cash value and cannot be exchanged for money</li>
                <li>Credits are non-refundable once purchased</li>
                <li>Unused credits do not expire</li>
                <li>All payments are processed through secure third-party payment gateways</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4. User Conduct</h2>
              <p className="text-gray-700 mb-2">You agree not to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Use the service for any illegal purposes</li>
                <li>Create characters that promote hate, violence, or illegal activities</li>
                <li>Attempt to manipulate or abuse the AI system</li>
                <li>Share your account credentials with others</li>
                <li>Attempt to reverse engineer or hack the service</li>
                <li>Create content that infringes on intellectual property rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Content and Intellectual Property</h2>
              <p className="text-gray-700">
                You retain ownership of characters you create. By using our service, you grant us a license to use, store, 
                and process your content to provide the service. AI-generated responses are provided as-is and we make no 
                claims to their accuracy or appropriateness.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Service Availability</h2>
              <p className="text-gray-700">
                We strive to maintain service availability but do not guarantee uninterrupted access. We reserve the right 
                to modify, suspend, or discontinue the service at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Limitation of Liability</h2>
              <p className="text-gray-700">
                This service is provided for entertainment purposes only. We are not liable for any direct, indirect, 
                incidental, or consequential damages arising from your use of the service. AI responses are generated 
                automatically and may not always be appropriate or accurate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Privacy</h2>
              <p className="text-gray-700">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, 
                and protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Termination</h2>
              <p className="text-gray-700">
                We reserve the right to terminate or suspend your account at any time for violations of these terms 
                or for any other reason at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">10. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. Continued use of the service after changes 
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">11. Contact</h2>
              <p className="text-gray-700">
                For questions about these terms, please contact us at support@roleplayai.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
