
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateParcelStatusMutation } from "@/redux/features/auth/auth.api";
import { Parcel } from "@/type";
import toast from "react-hot-toast";
const parcelStatuses = [
    "Requested",
    "Approved",
    "Dispatched",
    "In Transit",
    "Picked",
    "Held",
    "Delivered",
    "Returned",
    "Cancelled",
];


// Define the props for your StatusUpdateForm component
interface StatusUpdateFormProps {
  parcel: Parcel;
  onStatusUpdated: (updatedParcel: Parcel) => void;
}

// Define the form validation schema
const statusUpdateSchema = z.object({
  status: z.enum(parcelStatuses as [string, ...string[]], {
  message: "Status is required.",
}),
  location: z.string().min(1, { message: "Location is required." }),
  note: z.string().optional(),
});

type ParcelFormData = z.infer<typeof statusUpdateSchema>;

// Assuming your parent component passes `parcel` and a `closeDialog` function as props
export function StatusUpdateForm({ parcel, onStatusUpdated } : StatusUpdateFormProps) {
  const [updateStatus] = useUpdateParcelStatusMutation();

  const form = useForm({
    resolver: zodResolver(statusUpdateSchema),
    defaultValues: {
      status: parcel.currentStatus,
      location: "",
      note: "",
    },
  });

const onSubmit = async (data : ParcelFormData) => {
    try {
      const payload = {
        parcelId: parcel._id, 
        status: data.status,
        location: data.location,
        note: data.note,
      };
      
      const result = await updateStatus(payload).unwrap();
      
      toast.success(`Status for ${parcel.trackingId} updated to ${data.status}`);

       

      onStatusUpdated(result); 
    } catch (error) {
      console.error(error);
      
      const errorMessage = error?.data?.message || "Failed to update status. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {parcelStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Dhaka Hub" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea placeholder="Add a note about the update" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Update Status
        </Button>
      </form>
    </Form>
  );
}