import Header from "@/components/ui/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen m-3">
      <div className="w-full mt-5">
        <Header />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
