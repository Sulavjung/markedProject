import dynamicIconImports from "lucide-react/dynamicIconImports";

export interface Tab {
    id: string;
    name: string;
    icon: keyof typeof dynamicIconImports;
    href: string;
    to?: string;
    element: React.FC;
}


