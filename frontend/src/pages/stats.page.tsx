import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getShortUrlStats, type ShortUrlStats } from "@/api/getShortUrlStats";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableHead,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Clipboard } from "lucide-react";

const baseUrl = import.meta.env.VITE_BASE_URL || "";

export function StatsPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<ShortUrlStats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!code) return;
    let mounted = true;
    setLoading(true);
    getShortUrlStats(code)
      .then((res) => {
        if (!mounted) return;
        setData(res);
      })
      .catch((err) => {
        toast.error(err?.message || "Failed to load stats");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [code]);

  const onClickCopy = (text: string) => {
    toast.success("Copied to clipboard!");
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-8 container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Short URL Stats</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button
            onClick={() => {
              if (data) window.open(data.long_url, "_blank");
            }}
            disabled={!data}
          >
            Open Target
          </Button>
        </div>
      </div>

      {loading && <div>Loading...</div>}

      {!loading && data && (
        <div className="grid grid-cols-1 gap-4">
          <div className="rounded-lg border-3 p-4">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-medium">{`${baseUrl}/${data.short_code}`}</h2>
              <Clipboard
                onClick={() => onClickCopy(`${baseUrl}/${data.short_code}`)}
                className="hover:cursor-pointer"
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4">Short code</p>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-40">Field</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Target URL</TableCell>
                  <TableCell>
                    <a
                      href={data.long_url}
                      target="_blank"
                      rel="noreferrer"
                      title={data.long_url}
                      className="text-primary underline"
                    >
                      {data.long_url}
                    </a>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Total Clicks</TableCell>
                  <TableCell>{data.total_clicks}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Created</TableCell>
                  <TableCell>{data.created_at}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Last Clicked</TableCell>
                  <TableCell>{data.last_clicked ?? "-"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {!loading && !data && (
        <div className="text-muted-foreground">
          No stats available for this code.
        </div>
      )}
    </div>
  );
}
