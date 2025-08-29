import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:to-orange-900 py-8 px-2">
      <div className="w-full md:w-10/12 mx-auto">
        <Card className="shadow-md border-0 rounded-2xl bg-gradient-to-r from-orange-100 to-blue-50 dark:from-gray-900 dark:to-blue-950 mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent tracking-tight">
              Terms of Service
            </CardTitle>
            <CardDescription className="text-lg text-gray-800 dark:text-gray-100">
              Please review our terms and conditions for using Logisti Core. We aim for transparency and trust.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <section className="mb-6">
              <h2 className="text-xl font-bold text-orange-700 dark:text-orange-300 mb-2">1. Acceptance of Terms</h2>
              <p className="text-gray-700 dark:text-gray-200">
                By accessing or using Logisti Core, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-bold text-orange-700 dark:text-orange-300 mb-2">2. User Responsibilities</h2>
              <ul className="list-disc ml-6 text-gray-700 dark:text-gray-200">
                <li>Provide accurate and up-to-date information during registration and parcel booking.</li>
                <li>Keep your account credentials secure and confidential.</li>
                <li>Use the platform only for lawful purposes.</li>
              </ul>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-bold text-orange-700 dark:text-orange-300 mb-2">3. Service Limitations</h2>
              <ul className="list-disc ml-6 text-gray-700 dark:text-gray-200">
                <li>We strive for 99.9% uptime, but do not guarantee uninterrupted service.</li>
                <li>Logisti Core is not responsible for delays due to circumstances beyond our control.</li>
                <li>We reserve the right to suspend accounts violating our policies.</li>
              </ul>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-bold text-orange-700 dark:text-orange-300 mb-2">4. Privacy & Data</h2>
              <p className="text-gray-700 dark:text-gray-200">
                Your data is protected as per our Privacy Policy. We do not sell your information to third parties.
              </p>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-bold text-orange-700 dark:text-orange-300 mb-2">5. Changes to Terms</h2>
              <p className="text-gray-700 dark:text-gray-200">
                Logisti Core may update these Terms of Service at any time. Changes will be notified on this page.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-orange-700 dark:text-orange-300 mb-2">6. Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-200">
                If you have any questions regarding these terms, please contact us at <a href="mailto:support@logisticore.com" className="text-blue-600 dark:text-blue-400 underline">support@logisticore.com</a>.
              </p>
            </section>
          </CardContent>
        </Card>
        <div className="text-center text-xs text-muted-foreground mt-8">
          &copy; {new Date().getFullYear()} Logisti Core. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}