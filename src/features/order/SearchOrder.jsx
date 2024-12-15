import { useState } from "react"
import { useNavigate } from "react-router-dom";

function SearchOrder(){
    const [query , setQuery] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        if(!query) return;
        navigate(`/order/${query}`);
        setQuery('');

    }

    return (
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search orders..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="w-28 sm:w-64 sm:focus:w-72 transition-all duration-300 rounded-full bg-stone-100 px-4 py-2 text-stone-700 placeholder:font-light focus:outline-none focus:ring hover:shadow-inner text-sm placeholder:text-stone-400 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-opacity-50"
        />
      </form>
    );
}

export default SearchOrder