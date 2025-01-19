import {
  deleteShelf,
  selectAiles,
  selectShelves,
} from "@/store/slices/exampleSlices";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import { ChevronRight, SquareStack, Trash2 } from "lucide-react";
import { AddAiles } from "./add-aile";
import { AddShelf } from "./add-shelf";
import { Collapsible, CollapsibleContent } from "./ui/collapsible";
import { CollapsibleTrigger } from "@/components/ui/collapsible";

export function CreatorSidebar() {
  const isActive = (url: string) => {
    return url === window.location.pathname;
  };
  const dispatch = useDispatch();

  // Fetch ailes and shelves from the Redux state using selectors
  const ailes = useSelector((state: RootState) => selectAiles(state));
  const shelves = useSelector((state: RootState) => selectShelves(state));

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="mt-12">
          <SidebarGroupLabel>Ailes</SidebarGroupLabel>
          <SidebarMenu>
            {ailes.map((aile) => (
              <Collapsible
                key={aile.id}
                asChild
                defaultOpen={true}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip={aile.name}>
                    <SquareStack color="blue" /> <span>{aile.name}</span>
                    <AddShelf aileNumber={aile.id} className="ml-auto" />
                    <CollapsibleTrigger asChild>
                      <ChevronRight className=" transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </CollapsibleTrigger>
                  </SidebarMenuButton>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {shelves
                        .filter((shelf) => aile.id === shelf.aile_id)
                        .map((shelf) => (
                          <SidebarMenuSubItem key={shelf.id}>
                            <SidebarMenuButton asChild>
                              <div className="flex flex-row justify-between">
                                <span>{shelf.name}</span>
                                <Trash2
                                  color="red"
                                  onClick={() =>
                                    dispatch(deleteShelf(shelf.id))
                                  }
                                />
                              </div>
                            </SidebarMenuButton>
                          </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AddAiles className="pt-4" />
      </SidebarFooter>
    </Sidebar>
  );
}

/* 
<SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
 */

/* <SidebarMenu>
          {ailes.length > 0 &&
            ailes.map((aile) => (
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem key={aile.id}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild>
                      <span>{aile.name}</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {shelves
                      .filter((shelf) => aile.id === shelf.aile_id) // Filter shelves by aile_id
                      .map((shelf) => (
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>{shelf.name}</SidebarMenuSubItem>
                        </SidebarMenuSub>
                      ))}
                  </CollapsibleContent>
                </SidebarMenuItem>
                <AddShelf aileNumber={aile.id} />
              </Collapsible>
            ))}
        </SidebarMenu><SidebarMenu>
          {ailes.length > 0 &&
            ailes.map((aile) => (
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem key={aile.id}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild>
                      <span>{aile.name}</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {shelves
                      .filter((shelf) => aile.id === shelf.aile_id) // Filter shelves by aile_id
                      .map((shelf) => (
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>{shelf.name}</SidebarMenuSubItem>
                        </SidebarMenuSub>
                      ))}
                  </CollapsibleContent>
                </SidebarMenuItem>
                <AddShelf aileNumber={aile.id} />
              </Collapsible>
            ))}
        </SidebarMenu> */
