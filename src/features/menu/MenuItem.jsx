import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {

  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  function handleAddToCart() { 
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,  
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
     
  }

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`} />
      <div className="flex flex-col grow pt-1">
        <p className="font-medium">{name}</p>
        <p className="font-semibold text-sm italic capitalize text-stone-500">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm font-semibold">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-red-500">Sold out</p>}
          { currentQuantity > 0 && 
            <div className="flex items-center gap-3">         
              <UpdateItemQuantity pizzaID={id} currentQuantity={currentQuantity} />
               <DeleteItem pizzaID={id} />
           </div>
          }
          {!soldOut && currentQuantity === 0  && <Button type="small" onClick={handleAddToCart}>Add to cart</Button>  }
        </div>
      </div> 
    </li>
  );
}

export default MenuItem;
