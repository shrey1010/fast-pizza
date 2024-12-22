
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../user/userSlice";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false); 
   
  const { username , status:addresssStatus , position , address , error:addressError  } = useSelector((state) => state.user);
  const cart = useSelector (getCart);
  const totalCartPrice = useSelector(getTotalCartPrice); 
  const navigation = useNavigation();
  const isSubmitting = navigation.state==="submitting";
  const isLoadingAddress = addresssStatus === "loading"; 
  const formErrors = useActionData();
  const dispatch = useDispatch();

  const priorityPrice = withPriority ? totalCartPrice * 0.2  : 0; 
  const totalPrice = totalCartPrice + priorityPrice;

   
  
  
  if(!cart.length){
    return (
      <EmptyCart/>
    );
  }


  return (
    <div className="px-4 py-6" >
      <h2 className="text-3xl font-semibold mb-4">Ready to order? Let&apos;s go!</h2>
 
      <Form method="POST" action="/order/new">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row  sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" defaultValue={username } name="customer" required />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="w-full input" type="tel" name="phone" required />
          {formErrors?.phone && <p className="text-red-700 text-xs bg-red-100 p-2 rounded-md">{formErrors?.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row relative  sm:items-center">
          <label  className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="w-full input" type="text" name="address" disabled={isLoadingAddress} defaultValue={address || ""} required />
            { addresssStatus === "failed"  && (<p className="text-red-700 text-xs bg-red-100 p-2 rounded-md">{addressError}</p>)}
          </div>
          {!position &&  <span className="absolute right-2 top-4">
            <Button type="round" disabled={isLoadingAddress}  onClick={(e) => {
              e.preventDefault() 
                dispatch( fetchAddress())
                } 
              }>📍 
            </Button>
          </span>}
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row  sm:items-center">
          <input
          className="h-3 w-3 m-2  accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 "
            type="checkbox"
            name="priority" 
            id="priority" 
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want order as  priority?</label>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
          <input type="hidden" name="position" value={position ? `${position?.latitude},${position?.longitude} `:""}/>
        </div> 

        <div>
          <Button type="primary" disabled={isSubmitting || isLoadingAddress  }>{isSubmitting ? "Placing order..." : `Order Now for ${formatCurrency(totalPrice)}`}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request}){
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const orderData = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart), 
  }
 
  const error = {};

  if (!isValidPhone(orderData.phone)) {
    error.phone = "Please provide a valid phone number";
  }
  if (Object.keys(error).length > 0) {
    return error;
  }
  const newOrder = await createOrder(orderData);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
