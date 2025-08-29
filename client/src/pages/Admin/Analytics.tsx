import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";
import {
  useGetParcelStatsQuery,
  useGetUserStatsQuery,
} from "@/redux/features/auth/auth.api";
import { Separator } from "@/components/ui/separator";
import { Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

// Define data types for API responses
interface UserStats {
  totalUsers: number;
  blockedUsers: number;
  newUsersLast30Days: number;
}

interface ParcelStats {
  totalParcels: number;
  deliveredCount: number;
  inTransitCount: number;
  approvedCount: number;
  returnedCount: number;
  cancelledCount: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#F87171", "#6366F1"];

const Analytics = () => {
  const {
    data: userStatsData,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserStatsQuery(undefined);
  const {
    data: parcelStatsData,
    isLoading: parcelLoading,
    isError: parcelError,
  } = useGetParcelStatsQuery(undefined);

  if (userLoading || parcelLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSkeleton />
      </div>
    );
  }
  if (userError || parcelError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 text-center text-red-500 text-lg font-semibold bg-white dark:bg-gray-950 rounded-xl shadow">
          Error loading data. Please check the API endpoints.
        </div>
      </div>
    );
  }

  const userStats: UserStats = userStatsData?.data;
  const parcelStats: ParcelStats = parcelStatsData?.data;

  const userPieData = [
    {
      name: "Active Users",
      value: userStats.totalUsers - userStats.blockedUsers,
    },
    { name: "Blocked Users", value: userStats.blockedUsers },
  ];

  const parcelStatusData = [
    { name: "Total", count: parcelStats.totalParcels },
    { name: "Delivered", count: parcelStats.deliveredCount },
    { name: "In Transit", count: parcelStats.inTransitCount },
    { name: "Approved", count: parcelStats.approvedCount },
    { name: "Cancelled", count: parcelStats.cancelledCount },
    { name: "Returned", count: parcelStats.returnedCount },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:to-orange-900 p-4 md:p-8 space-y-12">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-orange-700 dark:text-orange-300">
          Analytics Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-lg">
          Overview of key user and parcel metrics.
        </p>
      </header>

      <Separator className="my-4" />

      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-orange-200">
          User Statistics
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-lg rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-orange-500 dark:text-orange-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-orange-200">
                {userStats.totalUsers}
              </div>
              <p className="text-xs text-muted-foreground">
                Total registered users on the platform.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Blocked Users</CardTitle>
              <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-orange-200">
                {userStats.blockedUsers}
              </div>
              <p className="text-xs text-muted-foreground">
                Users with blocked status.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New Users (30 Days)</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500 dark:text-blue-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-orange-200">
                +{userStats.newUsersLast30Days}
              </div>
              <p className="text-xs text-muted-foreground">
                Newly registered users this month.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>
              Pie chart showing active vs blocked users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {userPieData.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                  <Label
                    value={`Total: ${userStats.totalUsers}`}
                    position="center"
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      fill: "#333",
                    }}
                  />
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any) => [
                    value,
                    name === "Active Users" ? "Active" : "Blocked",
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-4" />

      {/* Parcel Statistics Section */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-orange-200">
          Parcel Statistics
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-lg rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Parcels</CardTitle>
              <Package className="h-5 w-5 text-orange-500 dark:text-orange-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-orange-200">
                {parcelStats.totalParcels}
              </div>
              <p className="text-xs text-muted-foreground">
                All parcels currently managed.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Approved Parcels</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-orange-200">
                {parcelStats.approvedCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Parcels approved and waiting for pickup.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">In Transit Parcels</CardTitle>
              <Truck className="h-5 w-5 text-blue-500 dark:text-blue-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-orange-200">
                {parcelStats.inTransitCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Parcels currently in transit.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Delivered Parcels</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-orange-200">
                {parcelStats.deliveredCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Parcels successfully delivered.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Cancelled Parcels</CardTitle>
              <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-orange-200">
                {parcelStats.cancelledCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Parcels that have been cancelled.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Returned Parcels</CardTitle>
              <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-orange-200">
                {parcelStats.returnedCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Parcels that have been returned.
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle>Parcel Status Distribution</CardTitle>
            <CardDescription>
              Bar chart showing the number of parcels by status.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={parcelStatusData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="count"
                  fill="#6366F1"
                  name="Parcels Count"
                  radius={[6, 6, 0, 0]}
                  label={{ position: "top", fill: "#333", fontSize: 12 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Analytics;