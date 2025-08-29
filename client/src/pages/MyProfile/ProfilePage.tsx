import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import PersonalInfoForm from "./PersonalInfoForm";
import PasswordChangeForm from "./PasswordChangeForm";
import { BadgeCheck } from "lucide-react";

const ProfilePage = () => {
    const { data: userData, isLoading } = useUserInfoQuery(undefined);

    // Render Skeleton while loading
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full p-4">
                <Skeleton className="w-full max-w-2xl h-[400px] rounded-lg" />
            </div>
        );
    }

    const user = userData?.data;

    if (!user) {
        return (
            <div className="text-center p-8 text-red-500">
                Error: User data could not be loaded.
            </div>
        );
    }

    // Determine avatar status color
    const isActive = user.status === "Active";
    const statusColor = isActive ? "bg-green-500" : "bg-red-500";
    const statusText = isActive ? "Active" : "Inactive";

    return (
        <div className="p-6">
            <div className="flex flex-col items-center justify-center mb-8">
                <div className="relative w-24 h-24 mb-4">
                    <Avatar className="w-24 h-24">
                        <AvatarFallback className="text-4xl">
                            {user.name?.charAt(0)?.toUpperCase() ?? "U"}
                        </AvatarFallback>
                    </Avatar>
                    {/* Status indicator */}
                    <span
                        className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-white dark:border-gray-950 flex items-center justify-center ${statusColor} shadow-lg`}
                        title={statusText}
                    >
                        {isActive && (
                            <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
                        )}
                    </span>
                </div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    {user.name}
                    {isActive && (
                        <BadgeCheck className="w-6 h-6 text-green-500" title="Active User" />
                    )}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg">{user.email}</p>
                <div className="flex gap-4 mt-2">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 font-semibold text-sm border border-orange-200">
                        Role: {user.role}
                    </span>
                    <span className={`px-3 py-1 rounded-full font-semibold text-sm border ${isActive ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}`}>
                        {statusText}
                    </span>
                </div>
            </div>

            <div className="flex justify-center">
                <Card className="w-full max-w-2xl shadow-xl rounded-2xl border-0">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">
                            My Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="personalInfo" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="personalInfo" className="text-lg font-semibold">
                                    Personal Information
                                </TabsTrigger>
                                <TabsTrigger value="passwordChange" className="text-lg font-semibold">
                                    Change Password
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="personalInfo">
                                {/* Ensure user object is passed as initialData */}
                                <PersonalInfoForm initialData={user} />
                            </TabsContent>
                            <TabsContent value="passwordChange">
                                <PasswordChangeForm />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProfilePage;