
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useParcelMutation, useSearchUserByEmailQuery } from '@/redux/features/auth/auth.api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Updated Schema for form validation
const parcelSchema = z.object({
    receiverName: z.string().min(1, { message: "Receiver's name is required." }),
    receiverEmail: z.string().email({ message: "A valid email is required." }),
    receiverPhone: z.string().min(1, { message: "Phone number is required." }),
    receiverAddress: z.string().min(1, { message: "Address is required." }),
    parcelType: z.string().min(1, { message: "Parcel type is required." }),
    weight: z.number().positive({ message: "Weight must be a positive number." }),
    deliveryAddress: z.string().min(1, { message: "Delivery address is required." }),
});

type ParcelFormData = z.infer<typeof parcelSchema>;

const ParcelCreate = () => {
    const [parcels] = useParcelMutation();
    const navigate = useNavigate();

    const form = useForm<ParcelFormData>({
        resolver: zodResolver(parcelSchema),
        defaultValues: {
            receiverName: "",
            receiverEmail: "",
            receiverPhone: "",
            receiverAddress: "",
            parcelType: "",
            weight: 0,
            deliveryAddress: "",
        },
    });

    const [receiverEmail, setReceiverEmail] = useState('');
    const { data: userData, isFetching } = useSearchUserByEmailQuery(receiverEmail, {
        skip: !receiverEmail,
    });

    useEffect(() => {
        if (userData?.data?._id) {
            form.setValue('receiverName', userData.data.name);
            // toast.success(`User found: ${userData.data.name}`);
        } else if (receiverEmail && !isFetching) {
            form.resetField('receiverName');
            toast.error(`No user found with this email.`);
        }
    }, [userData, receiverEmail, isFetching, form]);

    const onSubmit = async (data: ParcelFormData) => {
        const receiverUserId = userData?.data?._id;

        if (!receiverUserId) {
            toast.error("Please enter a valid receiver email to find their ID.");
            return;
        }

        const parcelData = {
            receiver: {
                name: data.receiverName,
                email: data.receiverEmail,
                phone: data.receiverPhone,
                address: data.receiverAddress,
                userId: receiverUserId,
            },
            parcelType: data.parcelType,
            weight: data.weight,
            deliveryAddress: data.deliveryAddress,
        };

       
         try {
        await parcels(parcelData).unwrap();
        toast.success("Parcel created successfully");
        navigate("/sender/viewallcreatedparcels");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        console.error(error); 


        let errorMessage = "Failed to create parcel. Please try again.";

        if (error.data && typeof error.data.message === 'string') {
            errorMessage = error.data.message;
        }


        toast.error(errorMessage);
    }


    };

    return (
        <div className="flex justify-center items-center p-4 min-h-screen bg-gray-100">
            <Card className="w-full max-w-2xl shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Parcel Create (Sender)</CardTitle>
                </CardHeader>
                <CardContent>
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
                                                    disabled={!!userData?.data?._id}
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
                            <Button type="submit" className="w-full">
                                Create Parcel
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ParcelCreate;
