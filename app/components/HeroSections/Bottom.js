import Head from "next/head";

export default function PrivacyPolicyComp() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Privacy Policy - Elpis Academy</title>
        <meta
          name="description"
          content="Privacy Policy for Elpis Forex Academy"
        />
      </Head>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 mt-10 max-w-4xl">
        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Privacy Policy
          </h2>
          <p className="text-gray-600 mb-6">Last Updated: June 25, 2025</p>

          <div className="space-y-6 text-gray-700">
            {/* Introduction */}
            <div>
              <h3 className="text-xl font-medium mb-2">1. Introduction</h3>
              <p>
                Elpis Academy ("we", "us", or "our") is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your personal information when you use
                our website, services, or educational programs.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h3 className="text-xl font-semibold my-3">
                2. Information We Collect
              </h3>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Personal Information:</strong> Name, email address,
                  phone number, billing information, and other details you
                  provide when registering or purchasing our services.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you
                  interact with our website, such as IP address, browser type,
                  pages visited, and time spent on our site.
                </li>
                <li>
                  <strong>Cookies:</strong> We use cookies and similar
                  technologies to enhance your experience and analyze website
                  performance. You can manage cookie preferences through your
                  browser settings.
                </li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div>
              <h3 className="text-xl font-semibold my-3">
                {" "}
                3. How We Use Your Information
              </h3>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6">
                <li>
                  Provide and improve our educational services and customer
                  support.
                </li>
                <li>Process payments and manage your account.</li>
                <li>
                  Send you updates, newsletters, and promotional materials (you
                  may opt out at any time).
                </li>
                <li>Analyze website usage to enhance user experience.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </div>

            {/* Sharing Your Information */}
            <div>
              <h3 className="text-xl font-semibold my-3">
                {" "}
                4. Sharing Your Information
              </h3>
              <p>
                We do not sell your personal information. We may share your
                information with:
              </p>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Service Providers:</strong> Third-party vendors who
                  assist with payment processing, website hosting, or analytics.
                </li>
                <li>
                  <strong>Legal Authorities:</strong> When required by law or to
                  protect our rights and safety.
                </li>
              </ul>
            </div>

            {/* Data Security */}
            <div>
              <h3 className="text-xl font-semibold my-3"> 5. Data Security</h3>
              <p>
                We implement reasonable security measures to protect your
                information from unauthorized access, use, or disclosure.
                However, no online transmission is completely secure, and we
                cannot guarantee absolute security.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h3 className="text-xl font-semibold my-3"> 6. Your Rights</h3>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6">
                <li>Access, correct, or delete your personal information.</li>
                <li>Opt out of marketing communications.</li>
                <li>
                  Request restrictions on how we process your data (subject to
                  legal limitations).
                </li>
              </ul>
              <p>
                To exercise these rights, contact us at
                hello@digitalmogulacademy.com.
              </p>
            </div>

            {/* Third-Party Links */}
            <div>
              <h3 className="text-xl font-semibold my-3">
                {" "}
                7. Third-Party Links
              </h3>
              <p>
                Our website may contain links to third-party sites. We are not
                responsible for the privacy practices or content of these sites.
                Please review their privacy policies before providing personal
                information.
              </p>
            </div>

            {/* Children's Privacy */}
            <div>
              <h3 className="text-xl font-semibold my-3">
                {" "}
                8. Children's Privacy
              </h3>
              <p>
                Our services are not intended for individuals under 18 years of
                age. We do not knowingly collect personal information from
                children. If we become aware of such data, we will promptly
                delete it.
              </p>
            </div>

            {/* Changes to This Policy */}
            <div>
              <h3 className="text-xl font-semibold my-3">
                {" "}
                9. Changes to This Policy
              </h3>
              <p>
                We may update this Privacy Policy from time to time. Changes
                will be posted on this page with an updated "Last Updated" date.
                We encourage you to review this policy periodically.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-semibold my-3">
                {" "}
                10. Contact Information
              </h3>
              <p>
                For questions or concerns about this Privacy Policy, please
                contact us at:
                <br />
                Email: support@digitalmogulacademy.com.
                <br />
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
