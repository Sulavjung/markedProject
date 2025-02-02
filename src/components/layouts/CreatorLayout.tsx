import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { CreatorSidebar } from "@/components/creator-sidebar";
import Tabbar from "../Tabbar";
import { Header } from "./Header";

export default function CreatorLayout() {
  
  return (
    <>
      
      <Header />
        <SidebarProvider >
        
          <CreatorSidebar />

          <main className="px-2 px-sm-0 w-full" >
            <SidebarTrigger />
            <Tabbar />
            <Outlet />
          </main>
        </SidebarProvider>
    </>
  );
}
