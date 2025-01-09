import {
  FileText,
  Upload,
  Settings,
  Search,
  Tag,
  AlertCircle,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Overview",
    url: "/documentation/overview",
    icon: FileText,
  },
  {
    title: "Getting Started",
    url: "/documentation/getting-started",
    icon: Upload,
  },
  {
    title: "SKU Search",
    url: "/documentation/sku-search",
    icon: Search,
  },
  {
    title: "Labels",
    url: "/documentation/labels-and-display",
    icon: Tag,
  },
  {
    title: "Troubleshooting",
    url: "/documentation/troubleshooting",
    icon: AlertCircle,
  },
];

export function AppSidebar() {
  const isActive = (url: string) => {
    return url === window.location.pathname;
  };
  return (
    <Sidebar className="mt-12">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Documentation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <a href={item.url}>
                      <item.icon
                        color={isActive(item.url) ? "orange" : "red"}
                      />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
