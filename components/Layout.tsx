import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import { ReactNode } from "react";

interface AuxProps  { 
    children: ReactNode
 }

export default function Layout({children}:AuxProps) {
    return (
        <>
        <Navbar />
        {children}
        {/* <Footer /> */}
        </>
    )
}