import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Home } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-100 dark:from-red-950 dark:to-orange-950 p-4 transition-colors">
      <Card className="w-full max-w-md text-center py-10 px-8 shadow-2xl border-0 rounded-2xl relative overflow-hidden bg-white/95 dark:bg-gray-950/90">
        {/* Decorative blurred blob */}
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-red-100/40 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-orange-200/40 rounded-full blur-xl pointer-events-none"></div>
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <span className="bg-red-100 dark:bg-red-700/30 p-5 rounded-full shadow animate-lockPulse">
              <Lock className="w-16 h-16 text-red-500 dark:text-red-400" />
            </span>
          </div>
          <CardTitle className="text-3xl font-extrabold text-red-600 dark:text-red-400 drop-shadow">
            Access Denied
          </CardTitle>
          <CardDescription className="text-gray-700 dark:text-gray-300 text-base">
            You do not have the required permissions to view this page.
            <br />
            Please contact an administrator for assistance.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-8">
          <Button
            asChild
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 via-orange-400 to-red-400 text-white font-semibold rounded-full py-4 shadow-lg hover:from-orange-400 hover:to-red-500 transition-all duration-300"
          >
            <Link to="/">
              <Home className="w-5 h-5" /> Go to Home Page
            </Link>
          </Button>
        </CardContent>
      </Card>
      <style>
        {`
          .animate-lockPulse {
            animation: lockPulse 2s infinite;
          }
          @keyframes lockPulse {
            0%,100% { box-shadow: 0 0 0 0 #EF444444; }
            50% { box-shadow: 0 0 16px 6px #EF444422; }
          }
          @media (max-width: 900px) {
            .relative > div {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Unauthorized;