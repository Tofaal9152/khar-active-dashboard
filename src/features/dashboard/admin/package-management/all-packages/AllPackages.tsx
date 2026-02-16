"use client";

import { AppDialog } from "@/components/shared/AppDialog";
import AsyncStateWrapper from "@/components/shared/AsyncStateWrapper";
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DeleteAction from "@/hooks/DeleteAction";
import { Edit, Package, Plus, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  GET_ALL_PACKAGE_KEY,
  getAllPackage,
} from "../services/package.service";
import CreatePackagePage from "./CreatePackage";

export default function AllPackagesPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // Search State

  const {
    data: packageData,
    isLoading,
    error,
  } = getAllPackage({
    query: {
      page,
      search: searchTerm,
    },
  });

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

        <AppDialog
          title="Create New Package"
          size="xl"
          trigger={
            <Button variant="default" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Package
            </Button>
          }
        >
          <CreatePackagePage />
        </AppDialog>
      </div>

      {/* CARD GRID VIEW */}

      {/* Search Bar */}
      <div className="relative w-full md:w-72">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search packages..."
          className="pl-9 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <AsyncStateWrapper loading={isLoading} error={error?.message}>
        {packageData?.results && packageData.results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packageData.results.map((pkg: any) => (
              <div
                key={pkg.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                {/* IMAGE SECTION */}
                <div className="relative w-full h-56">
                  {pkg.img_url ? (
                    <Image
                      src={pkg.img_url}
                      alt={pkg.title}
                      fill
                      className="object-cover  transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                      No Image
                    </div>
                  )}
                </div>

                {/* BODY SECTION */}
                <div className="p-6 ">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {pkg.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {pkg.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      {pkg.price} BDT
                    </span>

                    <div className="flex items-center gap-2">
                      <AppDialog
                        title="Edit Package"
                        size="xl"
                        trigger={
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        }
                      >
                        <CreatePackagePage mode="edit" data={pkg} />
                      </AppDialog>

                      <DeleteAction
                        endPoint={`/administrator/packages/?id=${pkg.id}`}
                        queryKeys={[[GET_ALL_PACKAGE_KEY]]}
                        confirmMessage={`Are you sure you want to delete "${pkg.title}"?`}
                        successMessage="Package deleted successfully!"
                        errorMessage="Failed to delete package. Please try again."
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-200">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">
              No packages found
            </h3>
            <p className="text-gray-500">No results matching</p>
          </div>
        )}
        <Pagination
          page={page}
          onPageChange={setPage}
          total={packageData?.count ?? 0}
        />
      </AsyncStateWrapper>
    </div>
  );
}
