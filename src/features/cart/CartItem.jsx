import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:justify-between sm:items-center">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="sm:flex sm:items-center sm:justify-between sm:gap-6 space-x-4 ">
        <p className="mt-1 font-bold text-sm">{formatCurrency(totalPrice)}</p>
        <DeleteItem pizzaID={pizzaId}/>
      </div>
    </li>
  );
}
  
export default CartItem;
