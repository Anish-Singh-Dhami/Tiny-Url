import { Outlet } from "react-router";
import Header from "@/components/header";
import Footer from "@/components/footer";

const Applayout: React.FC = () => {
  return (
    <div>
      <main className="min-h-screen">
        <Header />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export { Applayout };
