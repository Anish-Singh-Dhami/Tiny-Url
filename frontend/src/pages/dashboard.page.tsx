import fetchAllShortUrls from "@/api/listAllShortUrls";
import { AddLinkModal } from "@/components/addLinkModal";
import { Dashboard } from "@/components/dashboard";
import { SearchBar } from "@/components/searchbar";
import type { TableData } from "@/types/TableData";
import { useState, useMemo, useEffect } from "react";

export const DashboardPage = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);

  // Load initial data from backend on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const rows = await fetchAllShortUrls();
        if (!mounted) return;
        setTableData(rows ?? []);
      } catch (err) {
        // swallow for now; UI can show toasts if desired
        console.error("Failed to load links:", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredData = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return tableData;
    return tableData.filter((row) => {
      return (
        row.short_code.toLowerCase().includes(q) ||
        row.target_url.toLowerCase().includes(q)
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
