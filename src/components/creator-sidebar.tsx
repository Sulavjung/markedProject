
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
import { ChevronRight, Settings, SquareStack, Trash2 } from "lucide-react";
import { AddShelf } from "./add-shelf";
import { Collapsible, CollapsibleContent } from "./ui/collapsible";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link, useLocation, useNavigation, useParams } from "react-router-dom";
import AilesContextMenu from "./ailes-contextMenu";
import { tabConfig } from "@/config/app";
import { Icon } from "./Tabbar";
import { Tab } from "@/config/interfaces";

export function CreatorSidebar() {
  const { aileId, shelveId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigation();

  // Fetch ailes and shelves from the Redux state using selectors
  /* const ailes = useSelector((state: RootState) => selectAiles(state));
  const shelves = useSelector((state: RootState) => selectShelves(state));
  const isSubmitted = useSelector((state: RootState) =>
    selectIsSubmitted(state)
  ); */

  const isActive = (url: string) => location.pathname.toString() === url;

  return (
    <Sidebar variant="sidebar">
      <SidebarContent>
        <SidebarGroup className="mt-12">
          <SidebarGroupLabel>Setup</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={isActive("/")}>
                <Settings />
                <Link to={"/"}>Setting</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        
          <SidebarGroup>
            <SidebarGroupLabel>Services</SidebarGroupLabel>
            <SidebarMenu>
              {tabConfig.map((tab: Tab) => (
                <Collapsible
                  key={tab.id}
                  asChild
                  defaultOpen={true}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <AilesContextMenu>
                      <SidebarMenuButton
                        tooltip={tab.name}
                        isActive={location.pathname.includes(tab.id)}
                      >
                        <>
                          <Link to={tab.href} className="flex items-center">
                            <Icon size={16} name={tab.icon} /> <span className="ps-2">{tab.name}</span>
                          </Link>

                          {/* <AddShelf aileNumber={aile.id} className="ml-auto" /> */}
                          <CollapsibleTrigger asChild className="ml-auto">
                            <ChevronRight className=" transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </CollapsibleTrigger>
                        </>
                      </SidebarMenuButton>
                    </AilesContextMenu>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {/* {shelves
                          .filter((shelf) => aile.id === shelf.aile_id)
                          .map((shelf) => (
                            <SidebarMenuSubItem key={shelf.id}>
                              <SidebarMenuButton
                                asChild
                                isActive={isActive(
                                  `/aile/${aile.id}/shelf/${shelf.id}`
                                )}
                              >
                                <Link
                                  className="flex flex-row justify-between"
                                  to={`/aile/${aile.id}/shelf/${shelf.id}`}
                                >
                                  <span>{shelf.name}</span>
                                  <Trash2
                                    color="red"
                                    onClick={() =>
                                      dispatch(deleteShelf(shelf.id))
                                    }
                                  />
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          ))} */}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        
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
