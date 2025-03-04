"use client";

import React, { useState } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

import SearchBarAndFilter from "./SearchBarAndFilter";
import DetailServiceRow from "./DetailServiceRow";
import { UpdateServiceDetailPopup } from "@/components/popup/UpdateServiceDetailPopup";
import { CreateServiceDetailPopup } from "@/components/popup/CreateServiceDetailPopup";
import { Button } from "@/components/ui/button";
import Pagination from "./Pagination";
import { useToast } from "@/hooks/use-toast";
import ClipLoader from "react-spinners/ClipLoader";

const columns = [
  { header: "", className: " flex-[0.1] hidden md:table-cell" },
  { header: "TYPE", className: " flex-[0.5] hidden md:table-cell" },
  { header: "TITLE", className: " flex-[0.5] hidden md:table-cell" },
  {
    header: "ADDITIONAL PRICE",
    className: " flex-[0.4] hidden md:table-cell",
  },
  {
    header: "MULTIPLY PRICE",
    className: " flex-[0.4] hidden md:table-cell",
  },
];
const ServiceDetailsData: ServiceDetail[] = [
  {
    id: "1",
    serviceTypeId: "Number of Bedroom",
    title: "1",
    additionalPrice: 0,
    multiplyPrice: 1,
    serviceType: {
      name: "Cleaning",
    },
  },
  {
    id: "2",
    serviceTypeId: "Number of Bedroom",
    title: "1",
    additionalPrice: 0,
    multiplyPrice: 1,
    serviceType: {
      name: "Cleaning",
    },
  },
  {
    id: "3",
    serviceTypeId: "Number of Bedroom",
    title: "1",
    additionalPrice: 0,
    multiplyPrice: 1,
    serviceType: {
      name: "Cleaning",
    },
  },
  {
    id: "4",
    serviceTypeId: "Number of Bedroom",
    title: "1",
    additionalPrice: 0,
    multiplyPrice: 1,
    serviceType: {
      name: "Cleaning",
    },
  },
  {
    id: "5",
    serviceTypeId: "Number of Bedroom",
    title: "1",
    additionalPrice: 0,
    multiplyPrice: 1,
    serviceType: {
      name: "Cleaning",
    },
  },
];

const DetailServiceTable = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const [selectedServiceDetailId, setSelectedServiceDetailId] = useState<
    string | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [checkedRows, setCheckedRows] = useState<string[]>([]);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/service-detail`;

  const fetchData = async (): Promise<ServiceDetail[]> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["serviceDetails"],
    queryFn: fetchData,
  });

  const deleteDetailServices = async (id: string) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      toast({
        variant: "default",
        title: "Deleting service detail successfully!",
      });
      return await response.json();
    } catch (error) {
      console.error("Error deleting data:", error);
      toast({
        variant: "destructive",
        title: "Deleting service detail failed!",
      });
      return [];
    }
  };
  const deteleMutation = useMutation({
    mutationFn: (id: string) => deleteDetailServices(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceDetails"] });
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Category");

  const applyFilter = (data: ServiceDetail[]) => {
    if (filter === "Additional Price ↑") {
      return [...data].sort((a, b) => a.additionalPrice - b.additionalPrice);
    }
    if (filter === "Additional Price ↓") {
      return [...data].sort((a, b) => b.additionalPrice - a.additionalPrice);
    }
    if (filter === "Multiply Price ↑") {
      return [...data].sort((a, b) => a.multiplyPrice - b.multiplyPrice);
    }
    if (filter === "Multiply Price ↓") {
      return [...data].sort((a, b) => b.multiplyPrice - a.multiplyPrice);
    }
    return data;
  };
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };
  const handleRowClick = (id: string) => {
    setSelectedServiceDetailId(id);
    setIsDialogOpen(true);
  };
  const handleCheckboxToggle = (id: string, isChecked: boolean) => {
    setCheckedRows((prevCheckedRows) =>
      isChecked
        ? [...prevCheckedRows, id]
        : prevCheckedRows.filter((rowId) => rowId !== id)
    );
    console.log(checkedRows);
  };
  const handleDeleteButtonClick = async () => {
    try {
      for (const id of checkedRows) {
        await deteleMutation.mutateAsync(id);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const itemsPerPage = 10;

  const filteredData = (data ?? ServiceDetailsData).filter((category) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === "Type")
      return category.serviceType?.name.toLowerCase().includes(term);
    if (searchBy === "Title")
      return category.title.toLowerCase().includes(term);
    return true;
  });
  const finalData = applyFilter(filteredData);
  const currentData = finalData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(finalData.length / itemsPerPage);

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full h-[500px]">
        <ClipLoader color="#2A88F5" loading={true} size={30} />
      </div>
    );

  return (
    <>
      <div className="flex flex-wrap w-full justify-between">
        <SearchBarAndFilter
          setSearchTerm={handleSearch}
          setSearchBy={setSearchBy}
          onFilterChange={setFilter}
        />
        <div className="flex justify-center items-center gap-1 mt-1 lg:mt-0">
          <CreateServiceDetailPopup></CreateServiceDetailPopup>

          <Button
            className="px-7 h-[38px] hover:bg-opacity-90 rounded-[8px] font-Averta-Bold tracking-normal leading-loose text-center text-white"
            variant={"destructive"}
            disabled={checkedRows.length === 0}
            onClick={handleDeleteButtonClick}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* title column */}
      <div className="xl:flex gap-3 w-full hidden bg-[#f5f5f5] h-[48px] items-center mt-4 p-2.5">
        {columns.map((col, index) => (
          <div
            key={index}
            className={`${col.className} text-left text-[#202224] text-sm font-Averta-Bold`}
          >
            {col.header}
          </div>
        ))}
      </div>
      <div className="flex overflow-hidden flex-col max-xl:mt-4 rounded-lg justify-center w-full max-md:max-w-full">
        {currentData.map((category: ServiceDetail, index: any) => (
          <DetailServiceRow
            key={category.id}
            {...category}
            onRowClick={handleRowClick}
            onCheckboxToggle={handleCheckboxToggle}
            isLoading={isLoading}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <UpdateServiceDetailPopup
        id={selectedServiceDetailId}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default DetailServiceTable;
