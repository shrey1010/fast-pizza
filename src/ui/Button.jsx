import { Link } from "react-router-dom";


function Button({ children,disabled,to,type }){

    const base = 'text-sm bg-yellow-400 uppercase text-slate-800 inline-block tracking-wide rounded-full hover:bg-yellow-300  transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 font-semibold disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed'

    const styles = {
        primary: base + ' px-4 py-3 sm:px-6 sm:py-4',
        small : base + ' px-2 py-1 sm:px-3 sm:py-2 text-xs md:py-2.5 md:px-2.5',
        secondary: 'text-sm uppercase text-slate-800 inline-block tracking-wide rounded-full hover:bg-stone-300  transition-colors duration-300 focus:outline-none focus:ring focus:ring-stone-300 focus:bg-stone-300 focus:ring-offset-2 font-semibold disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed px-4 py-3 sm:px-6 sm:py-4 text-stone-700 hover:text-stone-900 border-2 border-stone-300 hover:border-stone-500'
    }
    if(to){
        return(
            <Link className={styles[type]} to={to}>{children}</Link>
        )
    }

    return(
        <button className={styles[type]} disabled={disabled}>{children}</button>
    )
}

export default Button;
