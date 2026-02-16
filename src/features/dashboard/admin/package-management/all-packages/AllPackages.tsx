"use client";

import { AppDialog } from "@/components/shared/AppDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  Edit,
  MoreHorizontal,
  Package,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import CreatePackagePage from "./CreatePackage";

// Mock Data
const packages = [
  {
    id: 1,
    name: "Beginner Boxing",
    price: 50,
    status: "Active",
    features: ["Basic Equipment", "Basic Equipment", "Basic Equipment"],
  },
  {
    id: 2,
    name: "Pro Fighter Camp",
    price: 150,
    status: "Active",
    features: ["Basic Equipment", "Basic Equipment", "Basic Equipment"],
  },
  {
    id: 3,
    name: "Self Defense 101",
    price: 200,
    status: "Active",
    features: ["Basic Equipment", "Basic Equipment", "Basic Equipment"],
  },
  {
    id: 4,
    name: "Kids Karate",
    price: 40,
    status: "Draft",
    features: ["Basic Equipment", "Basic Equipment", "Basic Equipment"],
  },
];

export default function AllPackagesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter packages based on search query
  const filteredPackages = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header & Search Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
            Package Management
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            Manage subscription plans and training bundles.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search packages..."
            className="pl-9 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <AppDialog
          title="Create New Package"
          size="xl"
          trigger={
            <Button variant="outline" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Create Package
            </Button>
          }
        >
          <CreatePackagePage />
        </AppDialog>
      </div>

      {/* CARD GRID VIEW */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className="group hover:shadow-lg transition-all duration-200 border-gray-200"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-red-50 text-red-600 rounded-lg w-fit mb-3">
                    <Package className="w-6 h-6" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-gray-400 hover:text-gray-900"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {pkg.name}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={
                      pkg.status === "Active"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-gray-100 text-gray-600"
                    }
                  >
                    {pkg.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pb-3">
                <div className="mb-4">
                  <span className="text-3xl font-black text-gray-900">
                    {pkg.price} BDT
                  </span>
                  <span className="text-gray-500 text-sm font-medium ml-1">
                    / month
                  </span>
                </div>

                {/* Mock Features List for visual appeal */}
                <div className="space-y-2">
                  {pkg.features &&
                    pkg.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                </div>
              </CardContent>

              {/* <CardFooter className="pt-3 border-t bg-gray-50/50">
                <Button
                  variant="outline"
                  className="w-full font-bold hover:bg-white hover:text-red-600 hover:border-red-200"
                >
                  View Details
                </Button>
              </CardFooter> */}
            </Card>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900">
            No packages found
          </h3>
          <p className="text-gray-500">No results matching</p>
        </div>
      )}
    </div>
  );
}
