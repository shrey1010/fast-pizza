// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";

// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {

  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-4 px-4 mb-8 py-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold  ">Order #{id} Status</h2>

        <div className="space-x-2">
          {priority && <span className="rounded-full bg-red-500 text-wide px-5 py-1.5 text-sm text-white hover:bg-red-600 hover:cursor-pointer ">Priority</span>}
          <span className="rounded-full bg-green-500 text-wide px-5 py-1.5 text-sm text-white hover:bg-green-600 hover:cursor-pointer ">order {status}</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 px-4 py-4">
        <p className="font-medium text-stone-600">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="font-small text-stone-600">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            // isLoadingIngredients={fetcher.state === 'loading'}
            // // ingredients={
            // //   fetcher?.data?.find((el) => el.id === item.pizzaId)
            // //     ?.ingredients ?? []
            // // }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-4 py-4" >
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="text-sm font-bold text-stone-600">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export async function loader({params}) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
