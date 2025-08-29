import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaHeadset, FaEnvelope, FaPhoneAlt, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const quickLinks = [
  {
    title: "Track Your Parcel",
    description: "Find the latest status of your shipment easily.",
    to: "/tracking",
  },
  {
    title: "Book a Parcel",
    description: "Send your package safely and quickly.",
    to: "/sender/parcelcreate",
  },
  {
    title: "Courier FAQ",
    description: "Read frequently asked questions about courier services.",
    to: "/frequently-asked-questions",
  },
  {
    title: "Terms of Service",
    description: "Review our terms and policies.",
    to: "/terms-service",
  },
  {
    title: "Career at Logisti Core",
    description: "Join our team and shape the future of logistics.",
    to: "/careers",
  },
];

export default function HelpCenter() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:to-orange-900 py-8 px-2">
      <div className="w-full md:w-10/12 mx-auto">
        <Card className="shadow-md border-0 rounded-2xl bg-gradient-to-r from-orange-100 to-blue-50 dark:from-gray-900 dark:to-blue-950 mb-8">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <FaHeadset className="text-orange-500 text-3xl" />
              <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent tracking-tight">
                Help Center
              </CardTitle>
            </div>
            <p className="text-lg text-gray-800 dark:text-gray-100">
              Get answers, support, and resources for all your Logisti Core needs.
            </p>
          </CardHeader>
          <CardContent>
            {/* Search Bar */}
            <form
              className="flex items-center gap-3 mb-6"
              onSubmit={(e) => {
                e.preventDefault();
                // You can add search logic here
              }}
            >
              <Input
                type="text"
                placeholder="Search help topics..."
                className="flex-1"
                aria-label="Search help topics"
              />
              <Button type="submit" className="flex items-center gap-2">
                <FaSearch /> Search
              </Button>
            </form>
            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {quickLinks.map((link, i) => (
                <Link
                  to={link.to}
                  key={i}
                  className="block p-5 rounded-xl shadow bg-white dark:bg-gray-950 border border-orange-100 dark:border-orange-900 hover:bg-orange-50 dark:hover:bg-orange-900 transition"
                >
                  <h3 className="font-bold text-lg text-orange-700 dark:text-orange-300 mb-2">{link.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{link.description}</p>
                </Link>
              ))}
            </div>
            {/* Contact Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center bg-white dark:bg-gray-950 rounded-xl shadow border border-blue-100 dark:border-blue-900 p-5">
                <FaEnvelope className="text-blue-600 dark:text-blue-400 text-2xl mb-2" />
                <span className="font-bold mb-1">Email Support</span>
                <a
                  href="mailto:support@logisticore.com"
                  className="text-blue-700 dark:text-blue-300 underline"
                >
                  support@logisticore.com
                </a>
              </div>
              <div className="flex flex-col items-center bg-white dark:bg-gray-950 rounded-xl shadow border border-blue-100 dark:border-blue-900 p-5">
                <FaPhoneAlt className="text-orange-500 dark:text-orange-400 text-2xl mb-2" />
                <span className="font-bold mb-1">Call Us</span>
                <a
                  href="tel:+880123456789"
                  className="text-orange-700 dark:text-orange-300 underline"
                >
                  +88 01234 567 89
                </a>
              </div>
              <div className="flex flex-col items-center bg-white dark:bg-gray-950 rounded-xl shadow border border-blue-100 dark:border-blue-900 p-5">
                <FaHeadset className="text-green-600 dark:text-green-400 text-2xl mb-2" />
                <span className="font-bold mb-1">Live Chat</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={() => {
                    // Add live chat trigger here
                  }}
                >
                  Start Chat
                </Button>
              </div>
            </div>
            {/* Additional Help */}
            <div className="mt-8 text-center text-sm text-gray-700 dark:text-gray-300">
              Need more assistance? Visit our <Link to="/contact" className="text-blue-600 dark:text-blue-400 underline">Contact Page</Link> or check our <Link to="/courier-faq" className="text-orange-600 dark:text-orange-400 underline">FAQ</Link>.
            </div>
          </CardContent>
        </Card>
        <div className="text-center text-xs text-muted-foreground mt-8">
          &copy; {new Date().getFullYear()} Logisti Core. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}