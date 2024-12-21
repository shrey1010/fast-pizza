
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { getUsername } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const username = useSelector(getUsername)
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state==="submitting";
  const formErrors = useActionData();
  


  return (
    <div className="px-4 py-6" >
      <h2 className="text-3xl font-semibold mb-4">Ready to order? Let's go!</h2>

      <Form method="POST" action="/order/new">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row  sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" defaultValue={username } name="customer" required />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row  sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="w-full input" type="tel" name="phone" required />
          {formErrors?.phone && <p className="text-red-700 text-xs bg-red-100 p-2 rounded-md">{formErrors?.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row  sm:items-center">
          <labe className="sm:basis-40"l>Address</labe>
          <div className="grow">
            <input className="w-full input" type="text" name="address" required />
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row  sm:items-center">
          <input
          className="h-3 w-3 m-2  accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 "
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
        </div>

        <div>
          <Button type="primary" disabled={isSubmitting}>{isSubmitting ? "Placing order..." : "Order Now"}</Button>
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
    priority: data.priority === "on",
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
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
