"use client"

import { clearCart } from "@/app/service/basket-service";
import { userId } from "@/app/utils/constant";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Loader from "../loader";
import { toast } from "react-toastify";


const ClearBtn = () => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handlClearCart =async()=>{
        setIsLoading(true);
        await clearCart(userId);
        toast.success("Urunler Temizlendi")
        router.refresh();
        setIsLoading(false)
    };

    return(
        <button
        onClick={handlClearCart}
        disabled={isLoading}
        className="text-red-600 hover:text-red-700 flex items-center gap-2 text-sm cursor-pointer"
        >
         {isLoading ? ( <Loader designs="text-red-600" /> ) : (<>  <FaTrash/> <p>Sepeti Bosalt</p> </>) }
        </button>
    )
}

export default ClearBtn;