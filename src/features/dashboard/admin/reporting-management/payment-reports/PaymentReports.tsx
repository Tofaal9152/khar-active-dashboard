"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, Search, DollarSign, CreditCard, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { format } from "date-fns";

// --- MOCK DATA ---
const paymentReports = [
  {
    id: "TRX-9981",
    date: "2023-10-25T10:15:00",
    user: "Tanvir Hasan",
    description: "Session Fee (Boxing)",
    amount: 60.00,
    status: "Success",
    method: "Credit Card",
    type: "Credit", // Money IN
  },
  {
    id: "TRX-9982",
    date: "2023-10-25T11:00:00",
    user: "Sarah Khan",
    description: "Trainer Payout (Weekly)",
    amount: 450.00,
    status: "Processing",
    method: "Bank Transfer",
    type: "Debit", // Money OUT
  },
  {
    id: "TRX-9983",
    date: "2023-10-24T15:45:00",
    user: "Nusrat Jahan",
    description: "Monthly Subscription",
    amount: 120.00,
    status: "Success",
    method: "bKash",
    type: "Credit",
  },
  {
    id: "TRX-9984",
    date: "2023-10-24T09:20:00",
    user: "Karimul Islam",
    description: "Merchandise (Gloves)",
    amount: 85.00,
    status: "Failed",
    method: "Credit Card",
    type: "Credit",
  },
  {
    id: "TRX-9985",
    date: "2023-10-23T18:30:00",
    user: "System Admin",
    description: "Server Maintenance Fee",
    amount: 29.99,
    status: "Success",
    method: "PayPal",
    type: "Debit",
  },
];

export default function PaymentReportsPage() {
  const [filterType, setFilterType] = useState("ALL"); // Credit/Debit
  const [searchTerm, setSearchTerm] = useState("");

  // Filter Logic
  const filteredPayments = paymentReports.filter((payment) => {
    const matchesSearch = 
      payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "ALL" || payment.type === filterType;

    return matchesSearch && matchesType;
  });

  // Helper for Status Badge
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Success": return "bg-green-100 text-green-700 hover:bg-green-100";
      case "Processing": return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "Failed": return "bg-red-100 text-red-700 hover:bg-red-100";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  // Stats Calculation
  const totalIn = paymentReports.filter(p => p.type === 'Credit' && p.status === 'Success').reduce((acc, curr) => acc + curr.amount, 0);
  const totalOut = paymentReports.filter(p => p.type === 'Debit' && p.status === 'Success').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
            Financial Reports
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            Overview of all incoming and outgoing transactions.
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2 border-gray-300">
          <Download className="w-4 h-4" /> Download Statement
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <Card className="border-l-4 border-l-green-600 shadow-sm bg-green-50/50">
            <CardContent className="p-4 flex items-center gap-4">
               <div className="p-3 bg-green-100 text-green-700 rounded-full">
                  <ArrowDownLeft className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-xs font-bold text-green-700 uppercase">Total Income</p>
                  <h3 className="text-2xl font-black text-gray-900">${totalIn.toFixed(2)}</h3>
               </div>
            </CardContent>
         </Card>
         <Card className="border-l-4 border-l-red-600 shadow-sm bg-red-50/50">
            <CardContent className="p-4 flex items-center gap-4">
               <div className="p-3 bg-red-100 text-red-700 rounded-full">
                  <ArrowUpRight className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-xs font-bold text-red-700 uppercase">Total Payouts</p>
                  <h3 className="text-2xl font-black text-gray-900">${totalOut.toFixed(2)}</h3>
               </div>
            </CardContent>
         </Card>
         <Card className="border-l-4 border-l-blue-600 shadow-sm bg-blue-50/50">
            <CardContent className="p-4 flex items-center gap-4">
               <div className="p-3 bg-blue-100 text-blue-700 rounded-full">
                  <DollarSign className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-xs font-bold text-blue-700 uppercase">Net Balance</p>
                  <h3 className="text-2xl font-black text-gray-900">${(totalIn - totalOut).toFixed(2)}</h3>
               </div>
            </CardContent>
         </Card>
      </div>

      {/* Filters & Table */}
      <Card>
        <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search transaction ID or User..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select defaultValue="ALL" onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Transactions</SelectItem>
                  <SelectItem value="Credit">Income (Credit)</SelectItem>
                  <SelectItem value="Debit">Expense (Debit)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-bold text-gray-700">Transaction ID</TableHead>
                <TableHead className="font-bold text-gray-700">Date</TableHead>
                <TableHead className="font-bold text-gray-700">User / Entity</TableHead>
                <TableHead className="font-bold text-gray-700">Description</TableHead>
                <TableHead className="font-bold text-gray-700">Method</TableHead>
                <TableHead className="font-bold text-gray-700 text-right">Amount</TableHead>
                <TableHead className="font-bold text-gray-700 text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((trx) => (
                  <TableRow key={trx.id} className="hover:bg-gray-50">
                    <TableCell className="font-mono text-xs font-medium text-gray-500">
                      {trx.id}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {format(new Date(trx.date), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">
                      {trx.user}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {trx.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CreditCard className="w-3 h-3" /> {trx.method}
                      </div>
                    </TableCell>
                    <TableCell className={`text-right font-bold ${trx.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {trx.type === 'Credit' ? '+' : '-'}${trx.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className={`${getStatusStyle(trx.status)} border-none`}>
                        {trx.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}