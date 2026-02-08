import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: February 2024</p>

          <div className="prose prose-blue max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Account Information</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Email address</li>
                <li>Display name</li>
                <li>Account credentials (encrypted)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Usage Information</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Characters you create</li>
                <li>Chat messages and conversations</li>
                <li>Credit balance and transaction history</li>
                <li>Service usage patterns</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Payment Information</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Payment information is processed by third-party payment providers</li>
                <li>We store only transaction IDs and amounts</li>
                <li>We do not store credit card details</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>To provide and maintain the service</li>
                <li>To process your payments and manage your credits</li>
                <li>To generate AI responses to your messages</li>
                <li>To improve our service and user experience</li>
                <li>To communicate with you about service updates</li>
                <li>To prevent fraud and ensure security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Data Storage and Security</h2>
              <p className="text-gray-700">
                Your data is stored on secure Firebase servers with industry-standard encryption. We implement appropriate 
                technical and organizational measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Third-Party Services</h2>
              <p className="text-gray-700 mb-2">We use the following third-party services:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Firebase:</strong> Authentication and database storage</li>
                <li><strong>Groq:</strong> AI language model processing</li>
                <li><strong>Razorpay:</strong> Payment processing</li>
              </ul>
              <p className="text-gray-700 mt-2">
                These services have their own privacy policies governing the use of your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Data Retention</h2>
              <p className="text-gray-700">
                We retain your account information and chat history for as long as your account is active. You can request 
                deletion of your account and associated data at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Your Rights</h2>
              <p className="text-gray-700 mb-2">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your account and data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Cookies and Tracking</h2>
              <p className="text-gray-700">
                We use essential cookies to maintain your session and provide the service. We do not use tracking 
                cookies for advertising purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Children's Privacy</h2>
              <p className="text-gray-700">
                Our service is not intended for individuals under 18 years of age. We do not knowingly collect personal 
                information from children. If you believe we have collected information from a child, please contact us 
                immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">9. International Users</h2>
              <p className="text-gray-700">
                Your information may be transferred to and processed in countries other than your own. We ensure that 
                appropriate safeguards are in place to protect your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">10. Changes to Privacy Policy</h2>
              <p className="text-gray-700">
                We may update this privacy policy from time to time. We will notify you of any significant changes by 
                posting the new policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">11. Contact Us</h2>
              <p className="text-gray-700">
                If you have questions about this privacy policy or wish to exercise your rights, please contact us at:
                <br />
                Email: support@roleplayai.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
