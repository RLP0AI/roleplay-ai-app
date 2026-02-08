import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RefundPolicy() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: February 2024</p>

          <div className="prose prose-blue max-w-none space-y-6">
            <section className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-red-900 mb-3">Important Notice</h2>
              <p className="text-red-800 font-semibold">
                All credit purchases are final and non-refundable. By purchasing credits, you acknowledge and agree to this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. No Refund Policy</h2>
              <p className="text-gray-700">
                Credits purchased on Roleplay AI are considered digital goods and are non-refundable under any circumstances. 
                This includes but is not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Change of mind after purchase</li>
                <li>Unused credits</li>
                <li>Dissatisfaction with AI responses</li>
                <li>Technical issues on user's device</li>
                <li>Account suspension or termination</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Virtual Currency</h2>
              <p className="text-gray-700">
                Credits are virtual currency with the following characteristics:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li><strong>No Cash Value:</strong> Credits cannot be exchanged for real money</li>
                <li><strong>Non-Transferable:</strong> Credits cannot be transferred to other users</li>
                <li><strong>No Expiration:</strong> Purchased credits do not expire</li>
                <li><strong>Entertainment Only:</strong> Credits are for entertainment purposes only</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Payment Issues</h2>
              <p className="text-gray-700 mb-3">
                If you experience technical issues during payment:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Payment successful but credits not received: Contact us within 24 hours with transaction details</li>
                <li>Duplicate charges: Contact us immediately with proof of duplicate transactions</li>
                <li>Unauthorized charges: Contact your payment provider and our support team</li>
              </ul>
              <p className="text-gray-700 mt-3">
                We will investigate genuine technical issues on a case-by-case basis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Service Availability</h2>
              <p className="text-gray-700">
                While we strive to maintain continuous service availability, we do not guarantee uninterrupted access. 
                Credits remain valid regardless of temporary service disruptions. No refunds will be provided for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Temporary service outages</li>
                <li>Scheduled maintenance</li>
                <li>Force majeure events</li>
                <li>Internet connectivity issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Account Termination</h2>
              <p className="text-gray-700">
                If your account is terminated for violating our Terms of Service, you will forfeit all remaining credits 
                without refund. If we terminate the service entirely, we will provide reasonable notice but are not obligated 
                to provide refunds for unused credits.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Chargebacks</h2>
              <p className="text-gray-700">
                Initiating a chargeback without first contacting us to resolve the issue may result in immediate account 
                suspension. Fraudulent chargebacks will result in permanent account termination and potential legal action.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Customer Support</h2>
              <p className="text-gray-700">
                If you experience genuine technical issues with your purchase:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Email us at: support@roleplayai.com</li>
                <li>Include your transaction ID and detailed description</li>
                <li>Provide screenshots if applicable</li>
                <li>Contact us within 24 hours of the issue</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Legal Jurisdiction</h2>
              <p className="text-gray-700">
                This refund policy is governed by the laws of the jurisdiction where our company is registered. 
                By purchasing credits, you agree to submit to the jurisdiction of these courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Fair Use</h2>
              <p className="text-gray-700">
                We reserve the right to investigate and take appropriate action against abuse of our service, including 
                but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Fraudulent payment methods</li>
                <li>Multiple account creation to exploit promotions</li>
                <li>Automated or bot usage</li>
                <li>Violation of Terms of Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">10. Changes to Policy</h2>
              <p className="text-gray-700">
                We reserve the right to modify this refund policy at any time. Changes will be posted on this page with 
                an updated "Last Updated" date. Continued use of the service after changes constitutes acceptance of the 
                modified policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">11. Contact Information</h2>
              <p className="text-gray-700">
                For questions or concerns about this refund policy:
                <br />
                Email: support@roleplayai.com
                <br />
                <br />
                Please include "Refund Policy" in the subject line for faster response.
              </p>
            </section>

            <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-900 mb-2">Before You Purchase</h3>
              <p className="text-yellow-800">
                Please carefully consider your purchase before proceeding. Ensure you understand that:
              </p>
              <ul className="list-disc list-inside text-yellow-800 space-y-1 mt-2">
                <li>All purchases are final</li>
                <li>Credits cannot be refunded or exchanged for cash</li>
                <li>You are 18+ years of age</li>
                <li>You have read and agree to this policy</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
