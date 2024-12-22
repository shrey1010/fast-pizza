import { formatCurrency } from "../../utils/helpers";

function  OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="p-2 hover:bg-stone-200 space-y-1 ">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-semibold ">{quantity}&times;</span> {name}
        </p>
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
      </div>

      <p className="text-sm capitalize italic text-stone-500">{isLoadingIngredients ? "Loading..." :   ingredients.join(", ") }</p>
    </li>
  );
}

export default OrderItem;
