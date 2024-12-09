import Header from "./Header";
import Footer from "./Footer";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout(){
    const navigation = useNavigation
    const isLoading = navigation.state === "loading";
    return (
        <div className="layout">
            {isLoading && <Loader/>}
            <Header />
            <main>
                <h1>Fast Pizza Co</h1>
                <Outlet/>
            </main>
            <CartOverview/>
            <Footer />
        </div>
    )
}

export default AppLayout;