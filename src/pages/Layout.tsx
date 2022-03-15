import {Outlet} from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function Layout() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}
