import Link from "next/link";
import React from "react";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import SearchForm from "./SearchForm";

import { RiFileList3Line } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { getBasket } from "@/app/service/basket-service";
import { userId } from "@/app/utils/constant";

export default async function Header() {
  const { cart } = await getBasket(userId);

  const total = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-white flex justify-between items-center py-5 px-7 lg:py-6 lg:px-10 shadow-sm text-white ">
      <Link
        href="/"
        className="text-green-600 font-bold text-2xl lg:text-3xl flex items-center gap-2"
      >
        <MdOutlineLocalGroceryStore />
        <span>Manav</span>
      </Link>

      <SearchForm />

      <div className="flex items-center justify-center gap-5">
        <Link
          href="/orders"
          className="text-lg relative text-gray-700 hover:text-green-600 transition flex items-center gap-2"
        >
          <RiFileList3Line className="text-2xl" />
          <span className="max-md:hidden">Siparişlerim</span>
        </Link>

        <Link
          href="/cart"
          className="text-lg relative text-gray-700 hover:text-green-600 transition flex items-center gap-2"
        >
          <div className="relative">
            <FaShoppingCart className="text-2xl" />
            <span className="absolute shadow-sm text-sm font-bold right-[-20px] top-[-20px] bg-green-500 text-white rounded-full size-6 grid place-items-center">
              {total}
            </span>
          </div>
          <span className="max-md:hidden">Sepetim</span>
        </Link>
      </div>
    </div>
  );
}
