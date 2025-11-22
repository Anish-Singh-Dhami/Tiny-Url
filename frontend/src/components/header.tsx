import { Link } from "react-router";
import { Link as LinkIcon } from "lucide-react";

const Header = () => {
  return (
    <nav className="flex p-8 mb-10">
      <Link to="/" className="flex items-center gap-2">
        <LinkIcon />
        <h1 className="text-4xl font-bold tracking-tight">Tiny URL</h1>
      </Link>
    </nav>
  );
};

export default Header;
