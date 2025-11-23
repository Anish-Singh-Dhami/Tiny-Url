import { Plus, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import type { TableData } from "@/types/TableData";
import { createShortUrl } from "@/api/createShortUrl";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type Props = {
  onAdd: (row: TableData) => void;
};

export function AddLinkModal({ onAdd }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [targetUrl, setTargetUrl] = useState<string>("");
  const [customCode, setCustomCode] = useState<string>("");

  const reset = () => {
    setTargetUrl("");
    setCustomCode("");
  };

  const codePattern = /^[A-Za-z0-9]{6,8}$/;
  const isCustomCodeValid =
    customCode.trim() === "" || codePattern.test(customCode.trim());

  const handleContinue = async () => {
    if (!targetUrl.trim()) {
      toast.error("Please provide a target URL.");
      return;
    }
    if (customCode.trim() && !codePattern.test(customCode.trim())) {
      toast.error("Custom code must be 6-8 alphanumeric characters.");
      return;
    }
    setLoading(true);
    try {
      const newRow = await createShortUrl({
        target_url: targetUrl.trim(),
        custom_code: customCode.trim() || undefined,
      });
      onAdd(newRow);
      toast.success("Short URL created.");
      setOpen(false);
      reset();
    } catch (err: any) {
      toast.error(err?.message || "Failed to create short URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={(v) => setOpen(v)}>
      <AlertDialogTrigger asChild>
        <Button disabled={loading}>
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="animate-spin" /> Creating...
            </span>
          ) : (
            <>
              <Plus /> Add New Link
            </>
          )}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Short URL</AlertDialogTitle>
          <AlertDialogDescription>
            Provide the target URL and an optional custom short code.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-2 py-2">
          <Label className="flex flex-col gap-1">
            <span className="font-medium min-w-full mb-2">Target URL</span>
            <Input
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://example.com/long/path"
              className="rounded-md border px-3 py-2"
            />
          </Label>

          <Label className="flex flex-col gap-1">
            <span className="font-medium min-w-full mb-2">
              Custom Code (optional)
            </span>
            <Input
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              placeholder="MYCODE"
              maxLength={8}
              className="rounded-md border px-3 py-2"
              aria-invalid={!isCustomCodeValid}
              pattern="[A-Za-z0-9]{6,8}"
            />
            {!isCustomCodeValid ? (
              <p className="text-sm text-destructive min-w-full">
                Invalid code length must be 6 to 8 alphanumeric characters
              </p>
            ) : (
              <p className="text-sm text-muted-foreground min-w-full">
                Optional 6–8 alphanumeric characters
              </p>
            )}
          </Label>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)} className="px-8">
            Exit
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleContinue}
            disabled={loading || !isCustomCodeValid || !targetUrl.trim()}
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="animate-spin" /> Creating...
              </span>
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
