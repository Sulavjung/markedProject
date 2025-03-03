import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="container mx-auto px-2 md:px-6 overflow-hidden">
      <SidebarProvider
        className="px-2 md:px-6 w-full flex flex-row justify-center items-center"
        style={{ overflow: "hidden", position: "relative" }}
      >
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}
