import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import bgImage from "../assets/bg.jpg";

export default function Layout() {
  return (
    <div
      className=" bg-cover bg-center bg-fixed bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Sidebar */}
      {/* <div className="w-[80px] sm:w-[100px] lg:w-[130px] bg-primary/90 min-h-screen">
        <SideBar />
      </div> */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen bg-black/40 backdrop-blur-sm">
        <main className="flex-1 text-white pt-4 sm:pt-6 md:pt-8 lg:pt-12 px-3 sm:px-4 md:px-6 lg:px-10 max-w-3xl lg:max-w-7xl no-scrollbar hide-scrollbar overflow-y-auto overflow-x-hidden mx-auto pb-6 sm:pb-8 md:pb-10 w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
