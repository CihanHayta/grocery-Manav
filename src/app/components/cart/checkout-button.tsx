"use client";

import { useState } from "react";
import Loader from "../loader";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { checkoutAllItems } from "@/app/service/basket-service";
import { userId } from "@/app/utils/constant";

const CheckoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const { url } = await checkoutAllItems(userId);

      window.open(url,"_blank");  
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <button
    onClick={handleCheckout}
    disabled={isLoading}
    className="flex items-center gap-2 justify-center w-full bg-green-600 text-white px-4 h-10 rounded-md hover:bg-green-700 trantitoin disabled:brigthness-70"   
    >

    {isLoading ? (<Loader/> ) : (<> <MdOutlineShoppingCartCheckout />
        Ödemeye Yap </>)}

    </button>
  );
};

export default CheckoutButton;
