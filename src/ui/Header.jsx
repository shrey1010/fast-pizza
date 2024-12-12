import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/username";

function Header() {
    return (
      <header className="bg-yellow-500 uppercase">
        <Link to="/" className="tracking-widest"> Fast Pizza Co. </Link>
        <SearchOrder/>
        <Username/>
      </header>
    );
}

export default Header;