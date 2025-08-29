import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// Fetch credentials from .env (Vite exposes these as import.meta.env)
const credentials = [
  {
    role: "ADMIN",
    mail: import.meta.env.VITE_ADMIN_MAIL,
    password: import.meta.env.VITE_ADMIN_PASSWORD,
  },
  {
    role: "SENDER",
    mail: import.meta.env.VITE_SENDER_MAIL,
    password: import.meta.env.VITE_SENDER_PASSWORD,
  },
  {
    role: "RECIVER",
    mail: import.meta.env.VITE_RECIVER_MAIL,
    password: import.meta.env.VITE_RECIVER_PASSWORD,
  },
];

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [login] = useLoginMutation();

  // Modal state
  const [open, setOpen] = useState(false);

  // Highlighted button/role for modal
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // Handle credential selection (fix: set both value and selectedRole)
  const handleCredentialClick = (role: string) => {
    const cred = credentials.find((c) => c.role === role);
    if (cred) {
      form.setValue("email", cred.mail || "");
      form.setValue("password", cred.password || "");
      setSelectedRole(role);
      setOpen(false);
      toast.success(`${role} credentials applied!`);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();
      console.log(res);

      if (res.statusCode === 201) {
        toast.success("User Login SuccesFull");
        navigate("/");
      }
    } catch (err: any) {
      console.error(err);
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      {...field}
                      required
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4">
              <Button type="submit" className="w-full">
                Login
              </Button>
              {/* Eye-catching Get Credentials button */}
              <Button
                type="button"
                variant="gradient"
                className="w-full text-lg font-bold py-4 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600 text-white shadow-lg border-2 border-orange-400 animate-pulse"
                onClick={() => setOpen(true)}
              >
                🚀 Get Credentials
              </Button>
            </div>
          </form>
        </Form>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-sm mx-auto rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-center font-extrabold text-primary mb-2">
                Choose a Role
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-2 mb-4">
              {credentials.map((cred) => (
                <Button
                  key={cred.role}
                  className={`w-full text-lg font-bold border-2 ${
                    selectedRole === cred.role
                      ? "border-orange-500 bg-orange-100 text-orange-700"
                      : "border-gray-300"
                  }`}
                  variant="outline"
                  onClick={() => handleCredentialClick(cred.role)}
                >
                  {cred.role}
                </Button>
              ))}
            </div>
            <DialogFooter>
              <p className="text-xs text-muted-foreground text-center">
                Select a role to autofill credentials for quick login.
              </p>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
        >
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        {/* Register link placeholder */}
        {/* Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4">
          Register
        </Link> */}
      </div>
      {/* Extra style for Get Credentials button pulse */}
      <style>
        {`
          .animate-pulse {
            animation: pulseBtn 2s infinite;
          }
          @keyframes pulseBtn {
            0% { box-shadow: 0 0 0 0 #FF771A44; }
            70% { box-shadow: 0 0 12px 8px #FF771A22; }
            100% { box-shadow: 0 0 0 0 #FF771A44; }
          }
        `}
      </style>
    </div>
  );
}