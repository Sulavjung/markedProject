import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CreatorSidebar } from "@/components/creator-sidebar";

export default function CreatorLayout() {
  return (
    <SidebarProvider>
      <CreatorSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
