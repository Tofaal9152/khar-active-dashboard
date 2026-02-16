import {
  ActivityIcon,
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowRightLeft,
  ArrowUpRight,
  BadgeDollarSign,
  Banknote,
  BookUser,
  Box,
  Boxes,
  Briefcase,
  Building2,
  Calculator,
  CalendarClock,
  Cog,
  Database,
  Files,
  // Files & Documents
  FileStack,
  FileX,
  Group,
  HandCoins,
  History,
  House,
  Landmark,
  LayoutDashboard,
  // General & Layout
  LayoutGrid,
  LayoutTemplate,
  Library,
  ListTodo,
  MessageSquareWarning,
  Network,
  PiggyBank,
  // Accounting & Finance
  Receipt,
  Repeat,
  Scale,
  ScrollText,
  ShoppingBag,
  Tags,
  TrendingDown,
  Truck,
  UserPlus,
  UserRoundPlus,
  // People & CRM
  UsersRound,
  Wallet,
  // Inventory & Products
  Warehouse,
  // Operations & Workflow
  Workflow,
  Wrench,
} from "lucide-react";

// CSM Teacher Sidebar Items
export const CSMAnalytics = () => ({
  item: [
    {
      name: "Dashboard",
      url: "/dashboard/csm",
      icon: LayoutGrid, // Changed from BarChart3
    },
  ],
});

export function CSMSidebarItems() {
  return {
    navMain: [
      {
        title: "Customer Management",
        icon: UsersRound, // Changed from Users
        isActive: true,
        items: [
          {
            title: "Add Customer",
            url: "/dashboard/csm/customer-management/customer-entry",
            icon: UserRoundPlus, // Changed from UserPlus
          },
          {
            title: "Customer List",
            url: "/dashboard/csm/customer-management/customer-list",
            icon: BookUser, // Changed from ClipboardList
          },
        ],
      },
      {
        title: "CSM Process",
        icon: Workflow, // Changed from BookOpen
        isActive: true,
        items: [
          {
            title: "Scheduler",
            url: "/dashboard/csm/csm-process-management/scheduler",
            icon: CalendarClock, // Changed from ListChecks
          },
          {
            title: "Current Job List",
            url: "/dashboard/csm/csm-process-management/current-job-list",
            icon: Briefcase, // Changed from FilePlus2
          },
          {
            title: "Employee To-Do List",
            url: "/dashboard/csm/csm-process-management/employee-todo-list",
            icon: ListTodo, // Changed from Notebook
          },
          {
            title: "Complain Registration",
            url: "/dashboard/csm/csm-process-management/complain-registration",
            icon: MessageSquareWarning, // Changed from Import
          },
          {
            title: "Reinstall Service",
            url: "/dashboard/csm/csm-process-management/reinstall-service",
            icon: Wrench, // Changed from PlusCircle
          },
        ],
      },
    ],
  };
}

// Accountant Sidebar Items
export function AccountantSidebarItems() {
  return {
    navMain: [
      {
        title: "Vouchers Management",
        icon: Receipt, // Changed from Users
        isActive: true,
        items: [
          {
            title: "Receive Payment",
            url: "/dashboard/accountant/vouchers-management/receive-payment",
            icon: HandCoins, // Changed from UserPlus
          },
          {
            title: "Pay Bills",
            url: "/dashboard/accountant/vouchers-management/pay-bills",
            icon: Banknote, // Changed from ClipboardList
          },
          {
            title: "Expense",
            url: "/dashboard/accountant/vouchers-management/expense",
            icon: TrendingDown, // Changed from ClipboardList
          },
          {
            title: "Contra",
            url: "/dashboard/accountant/vouchers-management/contra",
            icon: ArrowLeftRight, // Changed from ClipboardList
          },
          {
            title: "Adjustment/Journal",
            url: "/dashboard/accountant/vouchers-management/adjustment-journal",
            icon: Scale, // Changed from ClipboardList
          },
        ],
      },
      {
        title: "Invoice Management",
        icon: FileStack, // Changed from BookOpen
        isActive: true,
        items: [
          {
            title: "Recurring Invoice",
            url: "/dashboard/accountant/invoice-management/recurring-invoice",
            icon: Repeat, // Changed from ListChecks
          },
          {
            title: "Create Invoice",
            url: "/dashboard/accountant/invoice-management/create-invoice",
            icon: Repeat, // Changed from ListChecks
          },
          {
            title: "Invoice List",
            url: "/dashboard/accountant/invoice-management/invoice-list",
            icon: Files, // Changed from FilePlus2
          },
          {
            title: "Unsend Invoice",
            url: "/dashboard/accountant/invoice-management/unsend-invoice",
            icon: FileX, // Changed from Notebook
          },
        ],
      },
      {
        title: "Pending Vouchers",
        icon: ScrollText, // Changed from Megaphone
        isActive: true,
        items: [
          {
            title: "Receive Payment",
            url: "/dashboard/accountant/pending-vouchers/receive-payment",
            icon: Wallet, // Changed from Boxes
          },

          {
            title: "Undeposited Funds",
            url: "/dashboard/accountant/pending-vouchers/undeposited-funds",
            icon: PiggyBank, // Changed from UserPlus
          },
        ],
      },
    ],
  };
}

export const AccountantAnalytics = () => ({
  item: [
    {
      name: "Dashboard",
      url: "/dashboard/accountant",
      icon: LayoutDashboard, // Changed from BarChart3
    },
    {
      name: "Manage Bank Accounts",
      url: "/dashboard/accountant/manage-bank-accounts",
      icon: Landmark, // Changed from FileText
    },
    {
      name: "Customer Group",
      url: "/dashboard/accountant/customer-group",
      icon: Group, // Changed from FileText
    },
    {
      name: "Ledger/Group Creation",
      url: "/dashboard/accountant/ledger-group-creation",
      icon: Network, // Changed from FileText
    },
    {
      name: "Chart of Accounts",
      url: "/dashboard/accountant/chart-of-accounts",
      icon: ActivityIcon,
    },
  ],
});

export const AccountantRPS = () => ({
  item: [
    {
      name: "Receivables",
      url: "/dashboard/accountant/receivables",
      icon: ArrowDownLeft, // Changed from BarChart3
    },
    {
      name: "Payables",
      url: "/dashboard/accountant/payables",
      icon: ArrowUpRight, // Changed from FileText
    },
    {
      name: "Salary Calculation",
      url: "/dashboard/accountant/salary-calculation",
      icon: Calculator, // Changed from FileText
    },
  ],
});
// Admin Sidebar Items
export const AdminAnalytics = () => ({
  item: [
    {
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Add Employees",
      url: "/dashboard/admin/employee-management/employee-entry",
      icon: UserRoundPlus,
    },
  ],
});

// Inventory Sidebar Items
export const InventoryAnalytics = () => ({
  item: [
    {
      name: "Dashboard",
      url: "/dashboard/inventory",
      icon: LayoutDashboard,
    },
  ],
});

export function InventorySidebarItems() {
  return {
    navMain: [
      {
        title: "Inventory Management",
        icon: Warehouse, // Changed from Megaphone
        isActive: true,
        items: [
          {
            title: "Create Master Data",
            url: "/dashboard/inventory/inventory-management/create-master-data",
            icon: Database, // Changed from Boxes
          },
          {
            title: "Create Inventory Item",
            url: "/dashboard/inventory/inventory-management/create-inventory-item",
            icon: Box, // Changed from Package
          },
          {
            title: "Inventory List",
            url: "/dashboard/inventory/inventory-management/inventory-list",
            icon: Boxes, // Changed from Package
          },
        ],
      },
      {
        title: "Godown Management",
        icon: ArrowDownLeft, // Changed from Megaphone
        isActive: true,
        items: [
          {
            title: "Create godown",
            url: "/dashboard/inventory/godown-management/create-godown",
            icon: Building2, // Changed from PlusSquare
          },
          {
            title: "Godown List",
            url: "/dashboard/inventory/godown-management/all-godown",
            icon: Warehouse, // Changed from History
          },
          {
            title: "Assigned Machines",
            url: "/dashboard/inventory/godown-management/rental-godown",
            icon: Warehouse, // Changed from History
          },
        ],
      },
      {
        title: "Purchase Management",
        icon: ArrowDownLeft, // Changed from Megaphone
        isActive: true,
        items: [
          {
            title: "Create Supplier",
            url: "/dashboard/inventory/purchase-management/supplier-registration",
            icon: Truck, // Changed from UserPlus
          },
          {
            title: "Create Purchase",
            url: "/dashboard/inventory/purchase-management/purchase-registration",
            icon: ShoppingBag,
          },
          {
            title: "All Purchases",
            url: "/dashboard/inventory/purchase-management/purchase-list",
            icon: FileStack,
          },
          {
            title: "All Purchase Return",
            url: "/dashboard/inventory/purchase-management/purchase-return",
            icon: Repeat,
          },
        ],
      },

      /* Sales */
      {
        title: "Sales Management",
        icon: ArrowUpRight, // Changed from Megaphone
        isActive: true,
        items: [
          {
            title: "Create Sales",
            url: "/dashboard/inventory/sales-management/sales-registration",
            icon: BadgeDollarSign,
          },
          {
            title: "All Sales",
            url: "/dashboard/inventory/sales-management/sales-list",
            icon: BadgeDollarSign,
          },
          {
            title: "All Sales Return",
            url: "/dashboard/inventory/sales-management/sales-return",
            icon: ScrollText,
          },
        ],
      },

      /* Manufacturing */
      {
        title: "Manufacturing Manage",
        icon: Network, // Changed from Megaphone
        isActive: true,
        items: [
          {
            title: "Manufacture Machine",
            url: "/dashboard/inventory/manufacture-manage/manufacture-machine",
            icon: Cog,
          },
          {
            title: "Manufacture History",
            url: "/dashboard/inventory/manufacture-manage/manufacture-history",
            icon: History,
          },
        ],
      },

      /* Stock */
      {
        title: "Stock & Transfer",
        icon: ArrowLeftRight, // Changed from Megaphone
        isActive: true,
        items: [
          {
            title: "Stock Transfer",
            url: "/dashboard/inventory/stock-transfer",
            icon: ArrowRightLeft,
          },
        ],
      },
    ],
  };
}

export const NavbarNavItems = (user: any) => {
  return {
    navmain: [
      {
        name: "হোম",
        link: "/",
        icon: <House size={18} />,
      },
      ...(user
        ? [
            {
              name: "ড্যাশবোর্ড",
              link: "/dashboard",
              icon: <LayoutTemplate size={18} />,
            },
          ]
        : []),
      {
        name: "কোর্সসমূহ",
        link: "/all-courses",
        icon: <Library size={18} />,
      },
      {
        name: "প্রোডাক্টসমূহ",
        link: "/products",
        icon: <Tags size={18} />,
      },
    ],
  };
};
