"use client"

import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { toast } from "sonner"
import { z } from "zod"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { GripVerticalIcon, CircleCheckIcon, LoaderIcon, EllipsisVerticalIcon, Columns3Icon, ChevronDownIcon, PlusIcon, ChevronsLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsRightIcon, TrendingUpIcon, CalendarIcon, UserIcon, HomeIcon, DollarSignIcon, ClockIcon } from "lucide-react"

// ===== BOOKINGS SCHEMA & DATA =====
export const bookingSchema = z.object({
  id: z.number(),
  property: z.string(),
  guest: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
  status: z.string(),
  amount: z.string(),
  type: z.string(),
})

const bookingData = [
  { id: 1, property: "Luxury Villa - Paris", guest: "John Smith", checkIn: "2026-07-20", checkOut: "2026-07-25", status: "Confirmed", amount: "$2,500", type: "Villa" },
  { id: 2, property: "Beach House - Malibu", guest: "Sarah Johnson", checkIn: "2026-07-22", checkOut: "2026-07-28", status: "Pending", amount: "$4,200", type: "Beach House" },
  { id: 3, property: "City Apartment - London", guest: "Mike Brown", checkIn: "2026-07-18", checkOut: "2026-07-21", status: "Checked In", amount: "$1,800", type: "Apartment" },
  { id: 4, property: "Mountain Cabin - Aspen", guest: "Emily Davis", checkIn: "2026-07-25", checkOut: "2026-07-30", status: "Confirmed", amount: "$3,100", type: "Cabin" },
  { id: 5, property: "Penthouse - Dubai", guest: "David Wilson", checkIn: "2026-07-19", checkOut: "2026-07-24", status: "Cancelled", amount: "$5,500", type: "Penthouse" },
  { id: 6, property: "Lake House - Geneva", guest: "Anna Lee", checkIn: "2026-07-23", checkOut: "2026-07-27", status: "Confirmed", amount: "$2,800", type: "Lake House" },
  { id: 7, property: "Studio - Tokyo", guest: "Chris Martin", checkIn: "2026-07-21", checkOut: "2026-07-23", status: "Pending", amount: "$900", type: "Studio" },
  { id: 8, property: "Resort Suite - Bali", guest: "Lisa Wong", checkIn: "2026-07-26", checkOut: "2026-08-02", status: "Confirmed", amount: "$3,600", type: "Resort" },
  { id: 9, property: "Historic Castle - Scotland", guest: "Robert Taylor", checkIn: "2026-07-24", checkOut: "2026-07-29", status: "Confirmed", amount: "$6,200", type: "Castle" },
  { id: 10, property: "Modern Loft - Berlin", guest: "Nina Patel", checkIn: "2026-07-20", checkOut: "2026-07-22", status: "Checked In", amount: "$1,400", type: "Loft" },
]

// ===== USERS SCHEMA & DATA =====
export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  status: z.string(),
  joined: z.string(),
  bookings: z.string(),
  type: z.string(),
})

const userData = [
  { id: 1, name: "John Smith", email: "john@example.com", role: "Admin", status: "Active", joined: "2025-01-15", bookings: "12", type: "Premium" },
  { id: 2, name: "Sarah Johnson", email: "sarah@example.com", role: "Host", status: "Active", joined: "2025-03-22", bookings: "8", type: "Standard" },
  { id: 3, name: "Mike Brown", email: "mike@example.com", role: "Guest", status: "Active", joined: "2025-06-10", bookings: "3", type: "Standard" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", role: "Guest", status: "Inactive", joined: "2025-02-28", bookings: "0", type: "Basic" },
  { id: 5, name: "David Wilson", email: "david@example.com", role: "Host", status: "Active", joined: "2025-04-05", bookings: "15", type: "Premium" },
  { id: 6, name: "Anna Lee", email: "anna@example.com", role: "Guest", status: "Active", joined: "2025-07-01", bookings: "2", type: "Standard" },
  { id: 7, name: "Chris Martin", email: "chris@example.com", role: "Guest", status: "Pending", joined: "2025-07-10", bookings: "0", type: "Basic" },
  { id: 8, name: "Lisa Wong", email: "lisa@example.com", role: "Host", status: "Active", joined: "2025-05-18", bookings: "9", type: "Premium" },
  { id: 9, name: "Robert Taylor", email: "robert@example.com", role: "Admin", status: "Active", joined: "2024-12-01", bookings: "25", type: "Premium" },
  { id: 10, name: "Nina Patel", email: "nina@example.com", role: "Guest", status: "Active", joined: "2025-06-25", bookings: "1", type: "Standard" },
]

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({ id })
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent"
    >
      <GripVerticalIcon className="size-3 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

// ===== BOOKING COLUMNS =====
const bookingColumns: ColumnDef<z.infer<typeof bookingSchema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "property",
    header: "Property",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <HomeIcon className="size-4 text-muted-foreground" />
          <span className="font-medium">{row.original.property}</span>
        </div>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: "guest",
    header: "Guest",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <UserIcon className="size-4 text-muted-foreground" />
        {row.original.guest}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-2">
        {row.original.type}
      </Badge>
    ),
  },
  {
    accessorKey: "checkIn",
    header: () => <div className="w-full text-right">Check In</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <CalendarIcon className="size-3 text-muted-foreground" />
        {row.original.checkIn}
      </div>
    ),
  },
  {
    accessorKey: "checkOut",
    header: () => <div className="w-full text-right">Check Out</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <CalendarIcon className="size-3 text-muted-foreground" />
        {row.original.checkOut}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge 
        variant={row.original.status === "Confirmed" ? "default" : row.original.status === "Checked In" ? "secondary" : row.original.status === "Pending" ? "outline" : "destructive"}
        className="gap-1"
      >
        {row.original.status === "Confirmed" ? (
          <CircleCheckIcon className="size-3" />
        ) : row.original.status === "Pending" ? (
          <ClockIcon className="size-3" />
        ) : (
          <LoaderIcon className="size-3" />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="w-full text-right">Amount</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1 font-semibold text-primary">
        <DollarSignIcon className="size-3" />
        {row.original.amount.replace("$", "")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger >
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <EllipsisVerticalIcon className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Edit Booking</DropdownMenuItem>
          <DropdownMenuItem>Send Message</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Cancel</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

// ===== USER COLUMNS =====
const userColumns: ColumnDef<z.infer<typeof userSchema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
            {row.original.name.split(" ").map(n => n[0]).join("")}
          </div>
          <span className="font-medium">{row.original.name}</span>
        </div>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">{row.original.email}</span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant={row.original.role === "Admin" ? "default" : row.original.role === "Host" ? "secondary" : "outline"}>
        {row.original.role}
      </Badge>
    ),
  },
  {
    accessorKey: "type",
    header: "Plan",
    cell: ({ row }) => (
      <Badge variant={row.original.type === "Premium" ? "default" : "outline"} className={row.original.type === "Premium" ? "bg-amber-500 hover:bg-amber-600" : ""}>
        {row.original.type}
      </Badge>
    ),
  },
  {
    accessorKey: "bookings",
    header: () => <div className="w-full text-right">Bookings</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.original.bookings}</div>
    ),
  },
  {
    accessorKey: "joined",
    header: () => <div className="w-full text-right">Joined</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2 text-muted-foreground text-sm">
        <CalendarIcon className="size-3" />
        {row.original.joined}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge 
        variant={row.original.status === "Active" ? "default" : row.original.status === "Pending" ? "outline" : "secondary"}
        className="gap-1"
      >
        {row.original.status === "Active" ? (
          <CircleCheckIcon className="size-3" />
        ) : (
          <ClockIcon className="size-3" />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <EllipsisVerticalIcon className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>View Profile</DropdownMenuItem>
          <DropdownMenuItem>Edit User</DropdownMenuItem>
          <DropdownMenuItem>Send Email</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

function DraggableRow({ row }: { row: Row<any> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

function DataTableContent({ 
  data, 
  columns, 
  schema,
  tabName 
}: { 
  data: any[], 
  columns: ColumnDef<any>[], 
  schema: any,
  tabName: string 
}) {
  const [tableData, setTableData] = React.useState(() => data)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )
  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => tableData?.map(({ id }) => id) || [],
    [tableData]
  )
  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setTableData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <Input
            placeholder={`Search ${tabName.toLowerCase()}...`}
            value={(table.getColumn("property")?.getFilterValue() as string) ?? (table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              const column = table.getColumn("property") || table.getColumn("name")
              column?.setFilterValue(event.target.value)
            }}
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" size="sm">
                <Columns3Icon className="size-4 mr-1" />
                Columns
                <ChevronDownIcon className="size-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {table
                .getAllColumns()
                .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="default" size="sm">
            <PlusIcon className="size-4 mr-1" />
            <span className="hidden lg:inline">Add {tabName}</span>
          </Button>
        </div>
      </div>
      
      <div className="overflow-hidden rounded-lg border">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {table.getRowModel().rows?.length ? (
                <SortableContext
                  items={dataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>
      
      <div className="flex items-center justify-between px-4">
        <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectGroup>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DataTable() {
  return (
    <Tabs
      defaultValue="bookings"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <TabsList className="**:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1">
          <TabsTrigger value="bookings">
            <CalendarIcon className="size-4 mr-1" />
            Latest Bookings
            <Badge variant="secondary" className="ml-1">{bookingData.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="users">
            <UserIcon className="size-4 mr-1" />
            Latest Users
            <Badge variant="secondary" className="ml-1">{userData.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <TrendingUpIcon className="size-4 mr-1" />
            Analytics
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent
        value="bookings"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <DataTableContent 
          data={bookingData} 
          columns={bookingColumns} 
          schema={bookingSchema}
          tabName="Booking"
        />
      </TabsContent>
      
      <TabsContent
        value="users"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <DataTableContent 
          data={userData} 
          columns={userColumns} 
          schema={userSchema}
          tabName="User"
        />
      </TabsContent>
      
      <TabsContent
        value="analytics"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground">
          Analytics Dashboard Coming Soon
        </div>
      </TabsContent>
    </Tabs>
  )
}