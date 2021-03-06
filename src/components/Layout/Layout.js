import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout(props) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="flex-grow bg-page">{props.children}</main>
            <Footer/>
        </div>
    )
}