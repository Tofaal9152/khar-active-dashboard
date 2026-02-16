"use client";

import { AppDialog } from "@/components/shared/AppDialog";
import AsyncStateWrapper from "@/components/shared/AsyncStateWrapper";
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Edit, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import DeleteAction from "@/hooks/DeleteAction";

import { getPackageList } from "../services/package.service";
import {
  GET_ALL_SYLLABUS_KEY,
  getAllSyllabus,
} from "../services/syllabus.service";
import CreateSyllabuses from "./CreateSyllabuses";

export default function AllSyllabusPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [packageId, setPackageId] = useState<string>(""); // selected package

  // ✅ Non-paginated packages for dropdown
  const {
    data: packagesData,
    isLoading: pkgLoading,
    error: pkgError,
  } = getPackageList();
  console.log(packagesData);
  // Auto-select first package when loaded (first time)
  useEffect(() => {
    if (!packageId && packagesData?.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPackageId(packagesData[0].id);
    }
  }, [packagesData, packageId]);

  // ✅ Syllabus list based on selected package + search + page
  const {
    data: syllabusData,
    isLoading,
    error,
  } = getAllSyllabus({
    query: {
      page,
      search: searchTerm,
      packageId: packageId || undefined,
    },
  });

  // If package changes, reset page to 1
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [packageId, searchTerm]);

  const packageOptions = useMemo(() => packagesData || [], [packagesData]);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
            Syllabus Management
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            Manage package-wise syllabus (day & description).
          </p>
        </div>

        <AppDialog
          title="Create New Syllabus"
          size="xl"
          trigger={
            <Button variant="default" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Syllabus
            </Button>
          }
        >
          <CreateSyllabuses mode="create" />
        </AppDialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 md:justify-between md:items-center">
        {/* Search */}
        <div className="relative w-full md:w-100">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search syllabus under selected package..."
            className="pl-9 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Package Select */}
        <div>
          <div className="text-sm font-medium mb-1">Filter by Package</div>
          <Select value={packageId} onValueChange={setPackageId}>
            <SelectTrigger className="bg-white w-full">
              <SelectValue
                placeholder={pkgLoading ? "Loading..." : "Select package"}
              />
            </SelectTrigger>
            <SelectContent>
              <AsyncStateWrapper loading={pkgLoading} error={pkgError?.message}>
                {packageOptions?.map((p: any) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.title}
                  </SelectItem>
                ))}
              </AsyncStateWrapper>
            </SelectContent>
          </Select>
          {pkgError?.message && (
            <p className="text-xs text-red-600 mt-1">{pkgError.message}</p>
          )}
        </div>
      </div>

      {/* List */}
      <AsyncStateWrapper loading={isLoading} error={error?.message}>
        {syllabusData?.results?.length ? (
          <>
            <div className="grid grid-cols-1 gap-4">
              {syllabusData.results.map((item: any, idx: number) => (
                <div
                  key={item.id}
                  className="
              relative overflow-hidden rounded-2xl bg-white
              border border-gray-200 shadow-sm
              hover:shadow-lg hover:-translate-y-[2px]
              transition-all duration-300
            "
                >
                  {/* Left Accent */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-red-600" />

                  <div className="p-5">
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        {/* Number */}
                        <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-red-600" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-extrabold text-gray-900">
                              {item.day}
                            </h3>
                          </div>

                          <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-3">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                    </div>
                    <div className="flex items-center gap-2 justify-end mt-2">
                      <AppDialog
                        title="Edit Syllabus"
                        size="xl"
                        trigger={
                          <Button size="sm" variant="outline" className="gap-2">
                            <Edit className="w-4 h-4" />
                            Edit
                          </Button>
                        }
                      >
                        <CreateSyllabuses mode="edit" data={item} />
                      </AppDialog>

                      <DeleteAction
                        endPoint={`/administrator/syllabus/?id=${item.id}`}
                        queryKeys={[[GET_ALL_SYLLABUS_KEY]]}
                        confirmMessage={`Are you sure you want to delete "${item.day}"?`}
                        successMessage="Syllabus deleted successfully!"
                        errorMessage="Failed to delete syllabus. Please try again."
                      />
                    </div>
                  </div>

                  {/* Bottom subtle divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>
              ))}
            </div>

            <Pagination
              page={page}
              onPageChange={setPage}
              total={syllabusData?.count ?? 0}
            />
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">
              No syllabus found
            </h3>
            <p className="text-gray-500">No results matching</p>
          </div>
        )}
      </AsyncStateWrapper>
    </div>
  );
}
