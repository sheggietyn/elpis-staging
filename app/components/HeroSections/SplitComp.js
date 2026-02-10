import Head from "next/head";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Terms and Conditions - Elpis Academy</title>
        <meta
          name="description"
          content="Terms and Conditions for Elpis Forex Academy"
        />
      </Head>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 mt-10 max-w-4xl">
        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Terms and Conditions
          </h2>
          <p className="text-gray-600 mb-6">Last Updated: June 25, 2025</p>

          <div className="space-y-6 text-gray-700">
            {/* Introduction */}
            <div>
              <h3 className="text-xl font-semibold mb-2">1. Introduction</h3>
              <p>
                Welcome to Elpis Academy (&quot;we&quot;, &quot;us&quot;, or
                &quot;our&quot;). These Terms and Conditions govern your use of
                our website, services, and educational content related to forex
                trading. By accessing or using our services, you agree to be
                bound by these terms. If you do not agree, please do not use our
                services.
              </p>
            </div>

            {/* Eligibility */}
            <div>
              <h3 className="text-xl font-semibold my-3">. Eligibility</h3>
              <p>
                You must be at least 18 years old to enroll in our courses or
                use our services. By using our services, you represent and
                warrant that you meet this age requirement and have the legal
                capacity to enter into this agreement.
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-semibold my-3">3. Services</h3>
              <p>
                Elpis Academy provides educational content, training programs,
                and resources related to forex trading. Our services are for
                educational purposes only and do not constitute financial
                advice. We do not guarantee any specific trading results or
                financial gains.
              </p>
            </div>

            {/* Payment and Refunds */}
            <div>
              <h3 className="text-xl font-semibold my-3">
                {" "}
                4. Payment and Refunds
              </h3>
              <p>
                All course fees are payable in advance. We offer refunds within
                7 days of purchase, provided you have not accessed more than 10%
                of the course content. Refund requests must be submitted in
                writing to support@digitalmogulacademy.com.
              </p>
            </div>

            {/* Intellectual Property */}
            <div>
              <h3 className="text-xl font-semibold my-3">
                {" "}
                5. Intellectual Property
              </h3>
              <p>
                All content provided by Elpis Academy, including course
                materials, videos, and documents, is protected by copyright and
                other intellectual property laws. You may not reproduce,
                distribute, or share our content without prior written consent.
              </p>
            </div>

            {/* User Conduct */}
            <div>
              <h3 className="text-xl font-semibold my-3">6. User Conduct</h3>
              <p>
                You agree to use our services in a lawful and respectful manner.
                Prohibited activities include, but are not limited to, sharing
                login credentials, engaging in fraudulent activities, or
                harassing other users.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h3 className="text-xl font-semibold my-3">
                {" "}
                7. Limitation of Liability
              </h3>
              <p>
                To the fullest extent permitted by law, Elpis Academy shall not
                be liable for any direct, indirect, incidental, or consequential
                damages arising from your use of our services or reliance on our
                educational content.
              </p>
            </div>

            {/* Termination */}
            <div>
              <h3 className="text-xl font-semibold my-3">8. Termination</h3>
              <p>
                We reserve the right to terminate your access to our services at
                our discretion, including for violations of these terms. Upon
                termination, you will lose access to all course materials and
                services.
              </p>
            </div>

            {/* Governing Law */}
            <div>
              <h3 className="text-xl font-semibold my-3">9. Governing Law</h3>
              <p>
                These terms are governed by the laws of Lagos,Nigeria. Any
                disputes arising from these terms shall be resolved in the
                courts of Lagos,Nigeria.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-semibold my-3">
                {" "}
                10. Contact Information
              </h3>
              <p>
                For questions or concerns about these Terms and Conditions,
                please contact us at:
                <br />
                Email: support@digitalmogulacademy.com
                <br />
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
