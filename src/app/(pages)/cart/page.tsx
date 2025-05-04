import CartItem from "@/app/components/cart/cart-item";
import CartSummary from "@/app/components/cart/cart-summary";
import ClearBtn from "@/app/components/cart/clear-btn";
import EmptyCart from "@/app/components/cart/empty-cart";
import { getBasket } from "@/app/service/basket-service";
import { userId } from "@/app/utils/constant";

export default async function Cart() {
  const { cart } = await getBasket(userId);


  if (!cart || cart.items.length === 0) {
    return <EmptyCart/>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-bold  text-gray-800 m-6 text-2xl">
        Alisveris sepeti
      </h1>

      <div className="lg:flex gap-6">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">
                Sepet urun ({cart.items.length} adet){" "}
              </h2>

              <ClearBtn />
            </div>

            <ul className="divide-y divide-gray-200">
              {cart.items.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </ul>
          </div>
        </div>
                 <CartSummary cart={cart} />
      </div>
    </div>
  );
}
