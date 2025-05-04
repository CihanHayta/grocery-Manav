"use client";

import { addToBasket, checkoutSingleItem } from "@/app/service/basket-service";
import { Product } from "@/app/types";
import { userId } from "@/app/utils/constant";
import React, { useState } from "react";
import { FaMinus, FaPlus, FaShoppingCart, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const OrderButtons = ({ grocery }: { grocery: Product }) => {
  const [quantity, SetQuantity] = useState(1);
  const [loading, SetLoading] = useState(false);

  const handleAddToCart = async () => {
    if (quantity < 1 || grocery.stock < quantity) return;

    SetLoading(true);

    try {
      await addToBasket(userId, grocery._id, quantity);
      toast.success(`${quantity} adet ${grocery.name} sepete eklendi `);
      SetQuantity(1);
    } catch (error) {
      console.log(error);
      toast.error("sepete eklenemedi");
    } finally {
      SetLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (quantity < 1 || grocery.stock < quantity) return;
    SetLoading(true);
    try {
      const {url} = await checkoutSingleItem(grocery, quantity);
      window.open(url,"_blank");  
      SetQuantity(1);
    } catch (error) {
      toast.error("Odeme Islemi Baslatilamadi");
      console.log(error);
      
    } finally {
      SetLoading(false);
    }
  };



  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center border border-gray-300 rounded">
          <button
            className="cursor-pointer px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={quantity <= 1}
            onClick={() => SetQuantity(quantity - 1)}
          >
            <FaMinus />
          </button>
          <span className="px-3 py-2 border-x border-grey-300 min-w-[40px] text-center">
            {" "}
            {quantity}{" "}
          </span>

          <button
            className="cursor-pointer px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={quantity >= grocery.stock}
            onClick={() => SetQuantity(quantity + 1)}
          >
            <FaPlus />
          </button>
        </div>
        <span className="text-gray-500"> stock: {grocery.stock} </span>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          className="flex-1 gap-2 bg-white border-2 border-green-600 text-green-600 hover:bg-orange-100 transition h-10 px-4 rounded-md flex items-center justify-center disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100 "
          disabled={loading}
          onClick={handleAddToCart}
        >
         {loading ? ( <FaSpinner className="animate-spin" />) :  (<><FaShoppingCart />  Sepete Ekle </>) }
         
        </button>

        <button
          className="flex-1 flex justify-center items-center bg-green-600 text-white hover:bg-green-700 py-2 px-4 rounded-md font-medium disabled:opacity-85 cursor-pointer disabled:cursor-not-allowed"
          disabled={loading}
          onClick={handleBuyNow}
        >
          {loading ? <FaSpinner className="animate-spin" /> : "Hemen satin Al"}
        </button>
      </div>
    </div>
  );
};

export default OrderButtons;
