import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useConfirmParcelMutation, useGetIncomingParcelsQuery, useGetSingleParcelQuery } from "@/redux/features/auth/auth.api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ChevronDown, Inbox, PackageSearch } from "lucide-react";
import { Parcel } from "@/type";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Requested":
            return { backgroundColor: "bg-blue-100 dark:bg-blue-900", textColor: "text-blue-700 dark:text-blue-200" };
        case "Approved":
            return { backgroundColor: "bg-green-100 dark:bg-green-900", textColor: "text-green-700 dark:text-green-200" };
        case "Dispatched":
            return { backgroundColor: "bg-yellow-100 dark:bg-yellow-900", textColor: "text-yellow-700 dark:text-yellow-200" };
        case "In Transit":
            return { backgroundColor: "bg-purple-100 dark:bg-purple-900", textColor: "text-purple-700 dark:text-purple-200" };
        case "Picked":
            return { backgroundColor: "bg-teal-100 dark:bg-teal-900", textColor: "text-teal-700 dark:text-teal-200" };
        case "Delivered":
            return { backgroundColor: "bg-gray-200 dark:bg-gray-700", textColor: "text-gray-800 dark:text-gray-300" };
        case "Cancelled":
        case "Returned":
        case "Held":
            return { backgroundColor: "bg-red-100 dark:bg-red-900", textColor: "text-red-700 dark:text-red-200" };
        default:
            return { backgroundColor: "bg-gray-100 dark:bg-gray-800", textColor: "text-gray-500 dark:text-gray-400" };
    }
};

const ViewIncomingParcels = () => {
    const { data: allParcels, isLoading, isError } = useGetIncomingParcelsQuery(undefined);
    const [confirmParcel] = useConfirmParcelMutation();
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = React.useState(false);
    const [selectedParcelId, setSelectedParcelId] = React.useState<string | null>(null);

    const { data: singleParcelData, isLoading: singleParcelLoading } = useGetSingleParcelQuery(selectedParcelId, {
        skip: !selectedParcelId,
    });

    const handleConfirm = async (parcelId: string) => {
        try {
            await confirmParcel(parcelId).unwrap();
            toast.success(`Parcel has been confirmed.`);
        } catch (error) {
            const errorMessage = error?.data?.message || "Failed to confirm parcel. It might have already been processed.";
            toast.error(errorMessage);
        }
    };

    const tableData = React.useMemo(() => allParcels?.data?.data || [], [allParcels]);

    const columns: ColumnDef<Parcel>[] = [
        { accessorKey: "trackingId", header: "Tracking ID" },
        { accessorKey: "parcelType", header: "Parcel Type" },
        {
            accessorKey: "sender.name",
            header: "Sender Name",
            cell: ({ row }) => <span>{row.original.sender?.name}</span>,
        },
        {
            accessorKey: "sender.email",
            header: "Sender Email",
            cell: ({ row }) => <span>{row.original.sender?.email}</span>,
        },
        {
            accessorKey: "receiver.name",
            header: "Receiver Name",
            cell: ({ row }) => <span>{row.original.receiver?.name}</span>,
        },
        {
            accessorKey: "receiver.email",
            header: "Receiver Email",
            cell: ({ row }) => <span>{row.original.receiver?.email}</span>,
        },
        {
            accessorKey: "receiver.phone",
            header: "Receiver Phone",
            cell: ({ row }) => <span>{row.original.receiver?.phone}</span>,
        },
        {
            accessorKey: "currentStatus",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("currentStatus") as string;
                const { backgroundColor, textColor } = getStatusBadgeVariant(status);
                return (
                    <Badge className={`${backgroundColor} ${textColor} font-semibold text-sm px-3 py-1 rounded-full`}>
                        {status}
                    </Badge>
                );
            },
        },
        { accessorKey: "weight", header: "Weight (kg)" },
        { accessorKey: "deliveryAddress", header: "Delivery Address" },
        {
            accessorKey: "isBlocked",
            header: "Block Status",
            cell: ({ row }) => (
                <Badge variant={row.original.isBlocked ? "destructive" : "secondary"}>
                    {row.original.isBlocked ? "Blocked" : "Active"}
                </Badge>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const parcel = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => {
                                setSelectedParcelId(parcel._id);
                                setIsDetailsDialogOpen(true);
                            }}>
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleConfirm(parcel._id)}>
                                Confirm Parcel
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    });

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] gap-4">
                <Inbox className="w-16 h-16 text-red-500 opacity-70" />
                <div className="text-xl font-bold text-red-600">Error loading parcels</div>
                <span className="text-base text-gray-700 dark:text-gray-300">
                    Something went wrong. Please refresh or try again later.
                </span>
            </div>
        );
    }

    const singleParcel = singleParcelData?.data;
    const singleParcelStatusColors = singleParcel
        ? getStatusBadgeVariant(singleParcel.currentStatus)
        : { backgroundColor: "", textColor: "" };

    return (
        <Card className="p-4 shadow-xl border-0 bg-white/95 dark:bg-gray-950/90 rounded-2xl min-h-screen">
            <CardHeader>
                <CardTitle className="text-2xl font-extrabold text-orange-700 tracking-tight flex items-center gap-2">
                    <PackageSearch className="w-7 h-7 text-orange-500" />
                    Incoming Parcels
                </CardTitle>
                <CardDescription className="text-base text-gray-700 dark:text-gray-300">
                    Manage all your incoming parcels.
                </CardDescription>
                <div className="flex items-center py-4 justify-between flex-wrap gap-4">
                    <Input
                        placeholder="Filter by name or tracking ID..."
                        value={globalFilter ?? ""}
                        onChange={(event) => setGlobalFilter(String(event.target.value))}
                        className="max-w-sm"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border overflow-x-auto bg-white dark:bg-gray-950 min-h-[500px]">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="hover:bg-orange-50/60 dark:hover:bg-orange-900/20 transition"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-32 text-center">
                                        <div className="flex flex-col items-center justify-center min-h-[450px] gap-2 py-6">
                                            <Inbox className="w-14 h-14 text-gray-400" />
                                            <span className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                                                No parcels found
                                            </span>
                                            <span className="text-base text-gray-500 dark:text-gray-500">
                                                You haven’t received any parcels yet. Try updating filters or check later.
                                            </span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </CardContent>
            <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
                <DialogContent className="sm:max-w-[450px] rounded-2xl border-0 bg-white dark:bg-gray-950 p-6">
                    <DialogHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <PackageSearch className="w-7 h-7 text-orange-500" />
                            <DialogTitle className="text-xl font-bold text-orange-700">Parcel Details</DialogTitle>
                        </div>
                        <DialogDescription>
                            All details for the selected parcel.
                        </DialogDescription>
                    </DialogHeader>
                    {singleParcelLoading ? (
                        <LoadingSkeleton />
                    ) : singleParcel ? (
                        <div className="space-y-4 pt-2">
                            <div className="flex flex-row gap-2 items-center">
                                <span className="font-semibold text-gray-600 dark:text-gray-200">Tracking ID:</span>
                                <span className="text-base font-mono rounded bg-gray-100 dark:bg-gray-800 px-2">{singleParcel.trackingId}</span>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <span className="font-semibold text-gray-600 dark:text-gray-200">Status:</span>
                                <Badge className={`${singleParcelStatusColors.backgroundColor} ${singleParcelStatusColors.textColor}`}>
                                    {singleParcel.currentStatus}
                                </Badge>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <span className="font-semibold text-gray-600 dark:text-gray-200">Parcel Type:</span>
                                <span>{singleParcel.parcelType}</span>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <span className="font-semibold text-gray-600 dark:text-gray-200">Weight:</span>
                                <span>{singleParcel.weight} kg</span>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <span className="font-semibold text-gray-600 dark:text-gray-200">Delivery Address:</span>
                                <span>{singleParcel.deliveryAddress}</span>
                            </div>
                            <DropdownMenuSeparator />
                            <h4 className="font-semibold mt-4 text-orange-700 dark:text-orange-300">Sender Details</h4>
                            <div className="flex flex-col gap-1 ml-2">
                                <span><span className="font-semibold">Name:</span> {singleParcel.sender?.name}</span>
                                <span><span className="font-semibold">Email:</span> {singleParcel.sender?.email}</span>
                            </div>
                            <DropdownMenuSeparator />
                            <h4 className="font-semibold mt-4 text-orange-700 dark:text-orange-300">Receiver Details</h4>
                            <div className="flex flex-col gap-1 ml-2">
                                <span><span className="font-semibold">Name:</span> {singleParcel.receiver?.name}</span>
                                <span><span className="font-semibold">Email:</span> {singleParcel.receiver?.email}</span>
                                <span><span className="font-semibold">Phone:</span> {singleParcel.receiver?.phone}</span>
                                <span><span className="font-semibold">Address:</span> {singleParcel.receiver?.address}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center min-h-[120px] gap-2">
                            <Inbox className="w-8 h-8 text-gray-400" />
                            <span className="text-base text-gray-600 dark:text-gray-400">
                                Parcel details could not be loaded.
                            </span>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default ViewIncomingParcels;