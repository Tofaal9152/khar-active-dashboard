import {
  GaugeCircle,
  Hotel,
  Bus,
  UtensilsCrossed,
  Compass,
} from "lucide-react";

export const AdminDashboardTop = () => ({
  item: [
    {
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: GaugeCircle,
    },
    {
      name: "Places Management",
      url: "/dashboard/admin/places-management",
      icon: Compass,
    },
    {
      name: "Currency Management",
      url: "/dashboard/admin/currency-management",
      icon: Bus,
    },
  ],
});
export const SupplierDashboardTop = () => ({
  item: [
    {
      name: "Dashboard",
      url: "/dashboard/supplier",
      icon: GaugeCircle, // modern dashboard icon
    },
    {
      name: "Hotels",
      url: "/dashboard/supplier/hotels",
      icon: Hotel, // hotel/accommodation icon
    },

    {
      name: "Transportation",
      url: "/dashboard/supplier/transportation",
      icon: Bus, // transportation icon
    },
    {
      name: "Restaurants",
      url: "/dashboard/supplier/restaurants",
      icon: UtensilsCrossed, // restaurant/dining icon
    },
    {
      name: "Activities",
      url: "/dashboard/supplier/activities",
      icon: Compass, // activities/exploration icon
    },
  ],
});

// export function TeacherSidebarItems() {
//   return {
//     navMain: [
//       {
//         title: "Customer Management",
//         icon: UsersRound, // Changed from Users
//         isActive: true,
//         items: [
//           {
//             title: "Add Customer",
//             url: "/dashboard/teacher/customer-management/customer-entry",
//             icon: UserRoundPlus, // Changed from UserPlus
//           },
//           {
//             title: "Customer List",
//             url: "/dashboard/teacher/customer-management/customer-list",
//             icon: BookUser, // Changed from ClipboardList
//           },
//         ],
//       },
//       {
//         title: "CSM Process",
//         icon: Workflow, // Changed from BookOpen
//         isActive: true,
//         items: [
//           {
//             title: "Scheduler",
//             url: "/dashboard/teacher/csm-process-management/scheduler",
//             icon: CalendarClock, // Changed from ListChecks
//           },
//           {
//             title: "Current Job List",
//             url: "/dashboard/teacher/csm-process-management/current-job-list",
//             icon: Briefcase, // Changed from FilePlus2
//           },
//           {
//             title: "Employee To-Do List",
//             url: "/dashboard/teacher/csm-process-management/technician-todo-list",
//             icon: ListTodo, // Changed from Notebook
//           },
//           {
//             title: "Challan List",
//             url: "/dashboard/teacher/csm-process-management/challan-list",
//             icon: ScrollText, // Changed from FileText
//           },
//           {
//             title: "Complain Registration",
//             url: "/dashboard/teacher/csm-process-management/complain-registration",
//             icon: MessageSquareWarning, // Changed from Import
//           },
//           {
//             title: "Reinstall Service",
//             url: "/dashboard/teacher/csm-process-management/reinstall-service",
//             icon: Wrench, // Changed from PlusCircle
//           },
//         ],
//       },
//       {
//         title: "Inventory Management",
//         icon: Warehouse, // Changed from Megaphone
//         isActive: true,
//         items: [
//           {
//             title: "Create Master Data",
//             url: "/dashboard/teacher/inventory-management/create-master-data",
//             icon: Database, // Changed from Boxes
//           },
//           {
//             title: "Create Inventory Item",
//             url: "/dashboard/teacher/inventory-management/create-inventory-item",
//             icon: Box, // Changed from Package
//           },
//           {
//             title: "Inventory List",
//             url: "/dashboard/teacher/inventory-management/inventory-list",
//             icon: Boxes, // Changed from Package
//           },
//           {
//             title: "Create godown",
//             url: "/dashboard/teacher/inventory-management/create-godown",
//             icon: Building2, // Changed from PlusSquare
//           },
//           {
//             title: "Godown List",
//             url: "/dashboard/teacher/inventory-management/all-godown",
//             icon: Warehouse, // Changed from History
//           },
//           {
//             title: "Create Supplier",
//             url: "/dashboard/teacher/inventory-management/supplier-registration",
//             icon: Truck, // Changed from UserPlus
//           },
//           {
//             title: "Create Purchase",
//             url: "/dashboard/teacher/inventory-management/purchase-registration",
//             icon: ShoppingBag, // Changed from UserPlus
//           },
//           {
//             title: "Purchase List",
//             url: "/dashboard/teacher/inventory-management/purchase-list",
//             icon: UserPlus, // Changed from UserPlus
//           },

//           {
//             title: "Create Sales",
//             url: "/dashboard/teacher/inventory-management/sales-registration",
//             icon: BadgeDollarSign, // Changed from UserPlus
//           },
//           {
//             title: "Sales List",
//             url: "/dashboard/teacher/inventory-management/sales-list",
//             icon: BadgeDollarSign, // Changed from UserPlus
//           },

//           {
//             title: "Manufacture Machine",
//             url: "/dashboard/teacher/inventory-management/manufacture-machine",
//             icon: Cog, // Changed from PlusSquare
//           },
//           {
//             title: "Stock Transfer",
//             url: "/dashboard/teacher/inventory-management/stock-transfer",
//             icon: ArrowRightLeft, // Changed from History
//           },
//         ],
//       },
//     ],
//   };
// }

// export function AccountantSidebarItems() {
//   return {
//     navMain: [
//       {
//         title: "Vouchers Management",
//         icon: Receipt, // Changed from Users
//         isActive: true,
//         items: [
//           {
//             title: "Receive Payment",
//             url: "/dashboard/accountant/vouchers-management/receive-payment",
//             icon: HandCoins, // Changed from UserPlus
//           },
//           {
//             title: "Pay Bills",
//             url: "/dashboard/accountant/vouchers-management/pay-bills",
//             icon: Banknote, // Changed from ClipboardList
//           },
//           {
//             title: "Expense",
//             url: "/dashboard/accountant/vouchers-management/expense",
//             icon: TrendingDown, // Changed from ClipboardList
//           },
//           {
//             title: "Pay Bills",
//             url: "/dashboard/accountant/vouchers-management/pay-bills",
//             icon: Banknote,
//           },
//           {
//             title: "Contra",
//             url: "/dashboard/accountant/vouchers-management/contra",
//             icon: ArrowLeftRight, // Changed from ClipboardList
//           },
//           {
//             title: "Adjustment/Journal",
//             url: "/dashboard/accountant/vouchers-management/adjustment-journal",
//             icon: Scale, // Changed from ClipboardList
//           },
//         ],
//       },
//       {
//         title: "Invoice Management",
//         icon: FileStack, // Changed from BookOpen
//         isActive: true,
//         items: [
//           {
//             title: "Recurring Invoice",
//             url: "/dashboard/accountant/invoice-management/recurring-invoice",
//             icon: Repeat, // Changed from ListChecks
//           },
//           {
//             title: "Invoice List",
//             url: "/dashboard/accountant/invoice-management/invoice-list",
//             icon: Files, // Changed from FilePlus2
//           },
//           {
//             title: "Unsend Invoice",
//             url: "/dashboard/accountant/invoice-management/unsend-invoice",
//             icon: FileX, // Changed from Notebook
//           },
//         ],
//       },
//       {
//         title: "Pending Vouchers",
//         icon: ScrollText, // Changed from Megaphone
//         isActive: true,
//         items: [
//           {
//             title: "Receive Payment",
//             url: "/dashboard/accountant/pending-vouchers/receive-payment",
//             icon: Wallet, // Changed from Boxes
//           },

//           {
//             title: "Undeposited Funds",
//             url: "/dashboard/accountant/pending-vouchers/undeposited-funds",
//             icon: PiggyBank, // Changed from UserPlus
//           },
//         ],
//       },
//     ],
//   };
// }

// export const AccountantAnalytics = () => ({
//   item: [
//     {
//       name: "Dashboard",
//       url: "/dashboard/accountant",
//       icon: LayoutDashboard, // Changed from BarChart3
//     },
//     {
//       name: "Manage Bank Accounts",
//       url: "/dashboard/accountant/manage-bank-accounts",
//       icon: Landmark, // Changed from FileText
//     },
//     {
//       name: "Chart of Accounts",
//       url: "/dashboard/accountant/ledger-group-creation",
//       icon: Network, // Changed from FileText
//     },
//   ],
// });

// export const AccountantRPS = () => ({
//   item: [
//     {
//       name: "Receivables",
//       url: "/dashboard/accountant/receivables",
//       icon: ArrowDownLeft, // Changed from BarChart3
//     },
//     {
//       name: "Payables",
//       url: "/dashboard/accountant/payables",
//       icon: ArrowUpRight, // Changed from FileText
//     },
//     // {
//     //   name: "Salary Calculation",
//     //   url: "/dashboard/accountant/salary-calculation",
//     //   icon: Calculator, // Changed from FileText
//     // },
//   ],
// });

// export const NavbarNavItems = (user: any) => {
//   return {
//     navmain: [
//       {
//         name: "হোম",
//         link: "/",
//         icon: <House size={18} />,
//       },
//       ...(user
//         ? [
//             {
//               name: "ড্যাশবোর্ড",
//               link: "/dashboard",
//               icon: <LayoutTemplate size={18} />,
//             },
//           ]
//         : []),
//       {
//         name: "কোর্সসমূহ",
//         link: "/all-courses",
//         icon: <Library size={18} />,
//       },
//       {
//         name: "প্রোডাক্টসমূহ",
//         link: "/products",
//         icon: <Tags size={18} />,
//       },
//     ],
//   };
// };
