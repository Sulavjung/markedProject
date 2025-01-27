import { tabConfig } from "@/config/app";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import React, { Suspense, useState } from "react";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { lazy } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "./ui/sidebar";

const fallback = <div style={{ background: "#ddd", width: 24, height: 24 }} />;

interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof dynamicIconImports;
}
export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

export default function Tabbar() {
  const [value, setValue] = useState(`${tabConfig[0].id}`);
  const sidebar = useSidebar();
  const location = useLocation();

  if (sidebar.isMobile) {
    return (
      <Tabs defaultValue="home" onValueChange={(value) => setValue(value)} value={tabConfig.find((tab) => location.pathname === tab.href)?.id || tabConfig[0].id}>
        {/* Apply dynamic grid column styling */}
        <TabsList
          className={`w-full h-10 fixed bottom-0 grid`}
          style={{ gridTemplateColumns: `repeat(${tabConfig.length}, 1fr)` }}
        >
          {tabConfig.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={`flex items-center justify-center`}
            >
              <Link to={tab.href}>
                <Icon name={tab.icon} /* color={`${location.pathname === tab.href ? "orange" : "black"}`} */ />
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    );
  } else {
    return <></>;
  }
}
