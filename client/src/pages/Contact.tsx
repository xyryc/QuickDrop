import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MapPin, Mail, Phone } from 'lucide-react';

// Palette based on #FF771A (Main Orange)
const COLORS = {
  main: "#FF771A",
  soft: "#FFB877",
  accent: "#FFE2C6",
  dark: "#24252A",
};

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    // Simulate server submission
    console.log("Simulating form submission with data:", data);

    setTimeout(() => {
      toast.success("Your message has been sent successfully!");
      form.reset();
    }, 1500);
  };

  return (
    <div className="py-24 bg-gradient-to-br from-[#FFE2C6] via-white to-[#FFB877]/30 dark:from-[#24252A] dark:to-[#FF771A]/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-[#FF771A] drop-shadow">
            Contact Us
          </h1>
          <p className="max-w-2xl mx-auto text-[#24252A]/80 dark:text-white/80 mt-4 text-lg font-medium">
            Have a question or need assistance? Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information Section */}
          <Card className="relative p-10 flex flex-col justify-center shadow-2xl border-0 bg-white/95 dark:bg-[#24252A]/90 rounded-3xl overflow-visible">
            {/* Decorative blob */}
            <div className="absolute -top-8 -left-8 w-20 h-20 bg-[#FF771A]/15 rounded-full blur-xl pointer-events-none"></div>
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl font-extrabold text-[#FF771A] mb-2">
                Get in Touch
              </CardTitle>
              <CardDescription className="text-[#24252A]/70 dark:text-white/70">
                Our team is here to help you.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-8">
              <div className="flex items-center space-x-4">
                <span className="bg-[#FFB877]/60 p-3 rounded-full"><MapPin className="h-6 w-6 text-[#FF771A]" /></span>
                <div>
                  <p className="font-semibold text-[#24252A] dark:text-white">Address</p>
                  <p className="text-[#24252A]/70 dark:text-white/70">123 Main Street, Dhaka, Bangladesh</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="bg-[#FFB877]/60 p-3 rounded-full"><Mail className="h-6 w-6 text-[#FF771A]" /></span>
                <div>
                  <p className="font-semibold text-[#24252A] dark:text-white">Email</p>
                  <p className="text-[#24252A]/70 dark:text-white/70">{import.meta.env.VITE_USER_CONTACT_MAIL}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="bg-[#FFB877]/60 p-3 rounded-full"><Phone className="h-6 w-6 text-[#FF771A]" /></span>
                <div>
                  <p className="font-semibold text-[#24252A] dark:text-white">Phone</p>
                  <p className="text-[#24252A]/70 dark:text-white/70">{import.meta.env.VITE_USER_CONTACT_PHONE}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inquiry Form Section */}
          <Card className="relative p-10 shadow-2xl border-0 bg-white/95 dark:bg-[#24252A]/90 rounded-3xl overflow-visible">
            {/* Decorative blob */}
            <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-[#FFB877]/25 rounded-full blur-xl pointer-events-none"></div>
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl font-extrabold text-[#FF771A] mb-2">
                Send us a Message
              </CardTitle>
              <CardDescription className="text-[#24252A]/70 dark:text-white/70">
                We'll respond to your inquiry within 24-48 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#FF771A] font-semibold">Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your Name"
                            {...field}
                            className="bg-[#FFE2C6]/30 border-[#FFB877] focus:border-[#FF771A] focus:ring-[#FF771A] text-[#24252A] dark:text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#FF771A] font-semibold">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your Email"
                            {...field}
                            className="bg-[#FFE2C6]/30 border-[#FFB877] focus:border-[#FF771A] focus:ring-[#FF771A] text-[#24252A] dark:text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#FF771A] font-semibold">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your Message"
                            {...field}
                            className="bg-[#FFE2C6]/30 border-[#FFB877] focus:border-[#FF771A] focus:ring-[#FF771A] text-[#24252A] dark:text-white min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#FF771A] via-[#FFB877] to-[#FFE2C6] text-white font-bold rounded-full py-4 px-10 text-lg shadow-lg hover:from-[#FFE2C6] hover:via-[#FF771A] hover:to-[#FFB877] transition-all duration-300"
                  >
                    Send Message
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Extra CSS for gradient blobs */}
      <style>
        {`
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

export default Contact;