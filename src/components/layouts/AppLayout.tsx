import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Applayout() {
  return (
    <>
      <Header />
      <div className="flex-grow flex flex-col bg-background">
        <div className=" flex-grow flex flex-col ">
          <Outlet />
        </div>
      </div>
      {/* <div className="">
        <Footer />
      </div> */}
    </>
  );
}
