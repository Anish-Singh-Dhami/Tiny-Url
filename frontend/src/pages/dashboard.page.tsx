import { useGetAllShortUrls } from "@/api/ListAllShortUrls";
import { AddLinkModal } from "@/components/addLinkModal";
import { Dashboard } from "@/components/dashboard";
import { SearchBar } from "@/components/searchbar";
import type { TableData } from "@/types/TableData";
import { useState, useMemo } from "react";

export const DashboardPage = () => {
  const data: TableData[] = useGetAllShortUrls();
  const [tableData, setTableData] = useState<TableData[]>(data ?? []);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredData = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return tableData;
    return tableData.filter((row) => {
      return (
        row.short_code.toLowerCase().includes(q) ||
        row.long_url.toLowerCase().includes(q)
      );
    });
  }, [tableData, searchQuery]);

  return (
    <div className="p-8 container mx-auto border-3 rounded-2xl">
      <div className="w-auto flex items-center justify-between gap-4 mb-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <AddLinkModal
          onAdd={(row: TableData) =>
            setTableData((prev) => [
              row,
              ...prev.filter((r) => r.short_code !== row.short_code),
            ])
          }
        />
      </div>
      <Dashboard
        tableData={tableData}
        setTableData={setTableData}
        displayData={filteredData}
      />
    </div>
  );
};
