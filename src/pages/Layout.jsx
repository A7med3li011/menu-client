import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import bgImage from "../assets/bg.jpg";

export default function Layout() {
  return (
    <div
      className=" bg-cover bg-center bg-fixed bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen bg-black/40 backdrop-blur-sm">
        <main className="flex-1 text-white pt-12 px-10 max-w-3xl lg:max-w-7xl no-scrollbar hide-scrollbar overflow-y-auto overflow-x-auto mx-auto pb-10 w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
