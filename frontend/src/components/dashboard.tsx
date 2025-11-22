import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, ChartLine, Clipboard, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { TableData } from "@/types/TableData";

const baseUrl = import.meta.env.VITE_BASE_URL || "";

type Props = {
  tableData: TableData[];
  setTableData: React.Dispatch<React.SetStateAction<TableData[]>>;
  displayData?: TableData[];
};

export function Dashboard({ tableData, setTableData, displayData }: Props) {
  const rows = displayData ?? tableData;
  const navigate = useNavigate();

  const onClickCopy = (text: string) => {
    toast.success("Copied to clipboard!");
    navigator.clipboard.writeText(text);
  };

  const onClickDelete = (short_code: string) => {
    const newData = tableData.filter((row) => row.short_code !== short_code);
    setTableData(newData);
  };

  const onClickStats = (short_code: string) => {
    navigate(`/code/${short_code}`);
  };

  const onClickSortToggle = (column: keyof TableData) => {
    if (tableData.length < 2) return;
    const isAsc = tableData[0][column] < tableData[1][column];
    const sortedData = [...tableData].sort((a, b) => {
      if (isAsc) {
        return a[column] > b[column] ? -1 : 1;
      } else {
        return a[column] < b[column] ? -1 : 1;
      }
    });
    setTableData(sortedData);
  };

  return (
    <Table className="overflow-hidden">
      <TableHeader>
        <TableRow className="text-2xl">
          <TableHead className="text-center">
            <div className="flex justify-center items-center gap-4">
              Short Code
              <ArrowUpDown
                className="hover:cursor-pointer"
                onClick={() => onClickSortToggle("short_code")}
              />
            </div>
          </TableHead>
          <TableHead className="text-center">
            <div className="flex justify-center items-center gap-4">
              Long URL
              <ArrowUpDown
                className="hover:cursor-pointer"
                onClick={() => onClickSortToggle("long_url")}
              />
            </div>
          </TableHead>
          <TableHead className="text-center">Total Clicks</TableHead>
          <TableHead className="text-center">Last Clicked</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row: TableData) => {
          return (
            <TableRow key={row.short_code} className="text-lg">
              <TableCell>
                <div className="flex justify-between px-2">
                  {row.short_code}
                  <Clipboard
                    onClick={() => onClickCopy(`${baseUrl}/${row.short_code}`)}
                    className="hover:cursor-pointer"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-between items-center gap-2 px-2">
                  <span
                    title={row.long_url}
                    className="block max-w-[50ch] truncate"
                  >
                    {row.long_url}
                  </span>
                  <Clipboard
                    onClick={() => onClickCopy(row.long_url)}
                    className="hover:cursor-pointer"
                  />
                </div>
              </TableCell>
              <TableCell className="text-center">{row.total_clicks}</TableCell>
              <TableCell className="text-center">{row.last_clicked}</TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-4">
                  <Trash2
                    className="hover:cursor-pointer"
                    onClick={() => onClickDelete(row.short_code)}
                  />
                  <ChartLine
                    className="hover:cursor-pointer"
                    onClick={() => onClickStats(row.short_code)}
                  />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
