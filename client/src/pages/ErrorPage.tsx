import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

// Palette based on #FF771A
const COLORS = {
  main: "#FF771A",
  soft: "#FFB877",
  accent: "#FFE2C6",
  dark: "#24252A",
};

function ErrorPage() {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'An unknown error occurred';
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FFE2C6] via-white to-[#FFB877]/60 dark:from-[#24252A] dark:to-[#FF771A]/20">
      <Card className="w-full max-w-lg text-center px-8 py-10 shadow-2xl border-0 bg-white/95 dark:bg-[#24252A]/90 rounded-3xl relative overflow-hidden">
        {/* Decorative blurred blob */}
        <div className="absolute -top-10 -left-20 w-44 h-44 bg-[#FF771A]/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-[#FFB877]/30 rounded-full blur-2xl pointer-events-none"></div>

        <CardHeader>
          <div className="flex justify-center mb-4">
            <span className="rounded-full p-4 bg-[#FF771A]/15 border-2 border-[#FFB877] shadow">
              <AlertTriangle className="w-10 h-10 text-[#FF771A]" />
            </span>
          </div>
          <CardTitle className="text-6xl font-extrabold text-[#FF771A] drop-shadow-lg mb-2">
            Oops!
          </CardTitle>
          <CardDescription className="text-xl text-[#FFB877] mt-2 font-semibold">
            {isRouteErrorResponse(error) ? error.status : "Something went wrong."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-medium text-[#24252A] dark:text-white">
            {errorMessage}
          </p>
          <p className="text-sm text-[#FF771A] dark:text-[#FFB877] px-2">
            The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link to="/" tabIndex={-1}>
            <Button
              className="mt-6 w-full font-bold text-white bg-gradient-to-r from-[#FF771A] via-[#FFB877] to-[#FFE2C6] hover:from-[#FFE2C6] hover:via-[#FF771A] hover:to-[#FFB877] rounded-full shadow-lg transition-all duration-300 text-lg py-5"
            >
              Go Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default ErrorPage;