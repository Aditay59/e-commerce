/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { displayINRCurrency } from "../helper/displayCurrency";
import { addToCart } from "../helper/addToCart";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const DisplaySearched = ({loading, data}) => {

    // destructuring the fetchCartQuantity function from Context
    const { fetchCartQuantity } = useContext(AppContext);

    // This function call another function addToCart to update the cart and also it's quantity
    const handleAddToCart = async (e, id) =>{
        await addToCart(e, id);
        fetchCartQuantity();
    }

    // This component is basically receives the data adn loading state
    // and displays the product accordingly
  return (
      <div className="flex flex-wrap justify-evenly items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-hidden">
            {
                loading? (
                    // If loading then display the empty tags with sekelton loading
                    Array.from({length: 5}).map((_,index)=>(
                    <div key={index} className="w-full min-w-[280px] mt-5 md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow animate-pulse">
                    
                    <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex items-center justify-center group ">
                    </div>
                
                    <div className="p-4 flex flex-col gap-2">
                        <h2 className="font-medium text-ellipsis line-clamp-1 text-base md:text-md bg-slate-200 p-1 py-2 animate-pulse"></h2>
                        <p className=" capitalize bg-slate-200 p-1 py-2 animate-pulse"></p>
                        <div className="flex w-full gap-2">
                            <p className="font-medium p-1 py-2 rounded-md animate-pulse bg-slate-200 w-full"></p>
                            <p className=" line-through bg-slate-200 p-1 py-2 animate-pulse rounded-md w-full"></p>
                        </div>

                        <button className="outline-none text-sm p-4 w-full rounded-md bg-slate-200" ></button>

                    </div>
            
                </div>
                    ))
                ):(
                data?.map((item,index)=>(
                <Link to={`/productDetail/${item?._id}`} 
                      key={index+item?.category} 
                      className="w-full min-w-[280px] mt-5 md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow"
                      onClick={()=>window.scrollTo({top: 0, behavior: 'smooth'})}
                      >
                    
                    <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex items-center justify-center group ">
                        <img src={item?.productImage[0]} alt={item?.productImage[0]} className="h-full object-scale-down mix-blend-multiply group-hover:scale-110 transition-all duration-200 ease-linear " />
                    </div>
                
                    <div className="p-4 flex flex-col gap-2">
                        <h2 className="font-medium text-ellipsis line-clamp-1 text-base md:text-md "> {item?.productName} </h2>
                        <p className=" capitalize text-slate-500"> {item?.category} </p>
                        <div className="flex gap-2">
                            <p className="text-red-500 font-medium"> {displayINRCurrency(item?.sellingPrice)} </p>
                            <p className=" line-through text-slate-500 "> {displayINRCurrency(item?.price)} </p>
                        </div>

                        <button className="outline-none text-sm px-2 py-1 hover:bg-green-600 rounded-lg bg-green-400 text-white transition-all duration-150 ease-linear" onClick={(e)=>{handleAddToCart(e, item?._id)}} >Add to Cart</button>

                    </div>
            
                </Link>
                ))
            )
            }
        </div>
  )
}

export default DisplaySearched;