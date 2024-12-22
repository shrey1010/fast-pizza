
import Button from '../../ui/Button';

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <p className="text-md text-stone-700 ">Please add some pizzas to your cart</p>
      <Button type="primary" to="/menu">Back to menu </Button>
    </div> 
  );
}

export default EmptyCart;
