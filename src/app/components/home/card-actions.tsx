"use client";

import { addToBasket } from "@/app/service/basket-service";
import { userId } from "@/app/utils/constant";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FaPlus, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

export default function CardActions({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const hanldeAddtToCart = () => {
    setIsLoading(true);

    addToBasket(userId, productId, 1)
      .then(() => {
        
        toast.success("urun sepetinize eklendi")
        router.refresh();
      })
      .finally(() => setIsLoading(false))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button
    disabled={isLoading}
      onClick={hanldeAddtToCart}
      className="bg-green-500 text-white shadow-md rounded-full p-2 cursor-pointer transition-all hover:shadow-md disabled:brightness-75"
    >
     {isLoading ? <FaSpinner className="animate-spin"/> : <FaPlus/>}
    </button>
  );
}
