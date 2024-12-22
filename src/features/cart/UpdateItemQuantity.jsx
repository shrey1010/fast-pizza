import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";


function UpdateItemQuantity({pizzaID, currentQuantity}) {
    const dispatch = useDispatch();
    return (
        <div className="flex items-center gap-2 border border-stone-100 rounded-full">
            <Button type="round" onClick={() => dispatch(decreaseItemQuantity(pizzaID))}>-</Button>
            <span className="px-2">{currentQuantity}</span>
            <Button type="round" onClick={() => dispatch(increaseItemQuantity(pizzaID))}>+</Button>
        </div>
    )
}    


export default UpdateItemQuantity; 