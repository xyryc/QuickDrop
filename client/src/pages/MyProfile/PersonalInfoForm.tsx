// src/components/forms/PersonalInfoForm.tsx

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateUserProfileMutation } from "@/redux/features/auth/auth.api";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

// Each field made optional
const personalInfoSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }).optional(),
  email: z.string().email({ message: "Invalid email address." }).optional(),
});

type PersonalInfoData = z.infer<typeof personalInfoSchema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PersonalInfoForm = ({ initialData }: any) => {
  const [updateUser, { isLoading }] = useUpdateUserProfileMutation();

  const form = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        email: initialData.email,
      });
    }
  }, [initialData, form]);

  const onSubmit = async (data: PersonalInfoData) => {
    // Payload structured properly
    const payload = {
      id: initialData?._id,
      body: data,
    };

    console.log("Final Payload being sent:", payload);

    try {
      const res = await updateUser(payload).unwrap();
      if (res.success) {
        toast.success("Profile updated successfully!");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("API call failed:", err);
      toast.error(err?.data?.message || "Failed to update profile.");
    }
  };

  if (!initialData) {
    return <Skeleton className="w-full h-[300px]" />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Information"}
        </Button>
      </form>
    </Form>
  );
};

export default PersonalInfoForm;
