import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';
import { getUsername } from '../features/user/userSlice';
function Home() {
  const username = useSelector(getUsername);
  return (
    <div className="my-10 sm:my-16 text-center px-4">
      <h1 className="text-xl font-semibold text-center text-stone-700 mb-8 md:text:3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      { username==="" ? <CreateUser/> :  <Button to="/menu" type="primary">Continue ordering, {username} </Button >}
    </div>
  );
}

export default Home;
