// src/pages/ParcelEditForm.tsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { Card, CardContent, } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useSearchUserByEmailQuery, useUpdateParcelMutation } from '@/redux/features/auth/auth.api';
import toast from 'react-hot-toast';
import { Parcel } from "@/type";

// Update Schema for form validation
const parcelEditSchema = z.object({
    receiverName: z.string().optional(),
    receiverEmail: z.string().email({ message: "A valid email is required." }).optional(),
    receiverPhone: z.string().optional(),
    receiverAddress: z.string().optional(),
    parcelType: z.string().optional(),
    weight: z.number().optional(),
    deliveryAddress: z.string().optional(),
});

type ParcelEditFormData = z.infer<typeof parcelEditSchema>;

interface ParcelEditFormProps {
    parcel: Parcel;
    onEditSuccess: () => void;
}

export const ParcelEditForm: React.FC<ParcelEditFormProps> = ({ parcel, onEditSuccess }) => {
    const [updateParcel, { isLoading: isUpdating }] = useUpdateParcelMutation();
    const [receiverEmail, setReceiverEmail] = useState(parcel.receiver.email);

    const { data: userData, isFetching: isSearchingUser } = useSearchUserByEmailQuery(receiverEmail, {
        skip: !receiverEmail,
    });

    const form = useForm<ParcelEditFormData>({
        resolver: zodResolver(parcelEditSchema),
        defaultValues: {
            receiverName: parcel.receiver.name || "",
            receiverEmail: parcel.receiver.email || "",
            receiverPhone: parcel.receiver.phone || "",
            receiverAddress: parcel.receiver.address || "",
            parcelType: parcel.parcelType || "",
            weight: parcel.weight || 0,
            deliveryAddress: parcel.deliveryAddress || "",
        },
    });

  
    useEffect(() => {
        form.reset({
            receiverName: parcel.receiver.name || "",
            receiverEmail: parcel.receiver.email || "",
            receiverPhone: parcel.receiver.phone || "",
            receiverAddress: parcel.receiver.address || "",
            parcelType: parcel.parcelType || "",
            weight: parcel.weight || 0,
            deliveryAddress: parcel.deliveryAddress || "",
        });
        setReceiverEmail(parcel.receiver.email);
    }, [parcel, form]);


    useEffect(() => {
        if (userData?.data) {
            form.setValue('receiverName', userData.data.name);
            // toast.success(`User found: ${userData.data.name}`);
        } else if (receiverEmail && !isSearchingUser) {
            form.resetField('receiverName');
            toast.error(`No user found with this email.`);
        }
    }, [userData, receiverEmail, isSearchingUser, form]);

    const onSubmit = async (data: ParcelEditFormData) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const payload: any = {};
        

        if (data.parcelType !== parcel.parcelType) payload.parcelType = data.parcelType;
        if (data.weight !== parcel.weight) payload.weight = data.weight;
        if (data.deliveryAddress !== parcel.deliveryAddress) payload.deliveryAddress = data.deliveryAddress;
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const receiverPayload: any = {};
        if (data.receiverName !== parcel.receiver.name) receiverPayload.name = data.receiverName;
        if (data.receiverPhone !== parcel.receiver.phone) receiverPayload.phone = data.receiverPhone;
        if (data.receiverAddress !== parcel.receiver.address) receiverPayload.address = data.receiverAddress;
        if (data.receiverEmail !== parcel.receiver.email) {
            receiverPayload.email = data.receiverEmail;
        }

        if (Object.keys(receiverPayload).length > 0) {
            payload.receiver = receiverPayload;
        }

        try {
            await updateParcel({ parcelId: parcel._id, data: payload }).unwrap();
            toast.success("Parcel updated successfully!");
            onEditSuccess(); 
        } catch (error) {
            const errorMessage = error?.data?.message || "Failed to update parcel.";
            toast.error(errorMessage);
        }
    };
    

    useEffect(() => {
        if (userData?.data?._id) {
            form.setValue('receiverName', userData.data.name);
        } else if (receiverEmail && !isSearchingUser) {
            form.setValue('receiverName', "");

        }
    }, [userData, receiverEmail, isSearchingUser, form]);


    return (
        <Card className="w-full max-w-2xl shadow-none border-0">
            <CardContent className="p-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b pb-2">Receiver's Information</h3>
                            <FormField
                                control={form.control}
                                name="receiverEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Receiver's Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter receiver's email"
                                                type="email"
                                                {...field}
                                                onBlur={(e) => {
                                                    field.onBlur();
                                                    setReceiverEmail(e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="receiverName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Receiver's Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter receiver's name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="receiverPhone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Receiver's Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter phone number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="receiverAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Receiver's Address</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter receiver's full address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b pb-2">Parcel Details</h3>
                            <FormField
                                control={form.control}
                                name="parcelType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Parcel Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select parcel type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Computer">Computer</SelectItem>
                                                <SelectItem value="Document">Document</SelectItem>
                                                <SelectItem value="Gadget">Gadget</SelectItem>
                                                <SelectItem value="Book">Book</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="weight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Weight (in kg)</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter weight"
                                                type="number"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="deliveryAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Delivery Address</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter delivery address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={isUpdating}>
                            {isUpdating ? "Updating..." : "Update Parcel"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
