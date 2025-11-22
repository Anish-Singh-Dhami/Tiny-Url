import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { redirectShortUrl } from "@/api/redirectShortUrl";
import { toast } from "sonner";

export function RedirectPage() {
  const { code } = useParams();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function doRedirect() {
      if (!code) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Call backend to increment and fetch the long URL
        const res = await redirectShortUrl(code);

        // If component unmounted, do nothing
        if (!mounted) return;

        // Navigate using location.replace to avoid leaving a history entry
        window.location.replace(res.long_url);
      } catch (err: any) {
        // If 404, show not found UI
        if (err?.status === 404 || /not found/i.test(err?.message || "")) {
          setNotFound(true);
        } else {
          toast.error(err?.message || "Redirect failed");
          setNotFound(true);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    doRedirect();

    return () => {
      mounted = false;
    };
  }, [code]);

  if (loading) {
    return (
      <div className="p-8 container mx-auto text-center">
        <div className="text-lg">Redirecting...</div>
        <div className="text-sm text-muted-foreground mt-2">
          If you are not redirected automatically, click the link below.
        </div>
        <div className="mt-4">
          {code && (
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-primary underline"
            >
              Redirecting to code: {code}
            </a>
          )}
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="p-8 container mx-auto text-center">
        <h1 className="text-3xl font-semibold">404 — Not found</h1>
        <p className="mt-2 text-muted-foreground">
          The short code <strong>{code}</strong> does not exist or has been
          deleted.
        </p>
        <div className="mt-6">
          <Link to="/" className="text-primary underline">
            Return to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
