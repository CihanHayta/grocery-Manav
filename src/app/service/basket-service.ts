import { Cart, GetBasketResponse, MessageResponse, Product, SingleCheckoutResponse } from "../types";



const BASE_URL=process.env.NEXT_PUBLIC_API_URL;

const addToBasket = async (
  userId : string,
  groceryId : string,
  quantity :number
): Promise<Cart> => {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method: "POST",
    body: JSON.stringify({ userId, groceryId, quantity }),

    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};



const checkoutSingleItem =async(
  grocery:Product,quantity:number,
):Promise<SingleCheckoutResponse>=>{

  const body={
    grocery:{
    _id:grocery._id,
    name:grocery.name,
    price:grocery.price,
    decsription:grocery.description,
    },

  quantity:quantity,

  customerInfo:{
    name: "cihan hayta",
    phone: "05559876543",
    deliveryAddress: "Bahçeli Mahalle, Meyve Sokak No:45, İzmir",
    isDelivery: true,
  },

  };
  const res = await fetch(`${BASE_URL}/api/checkout`,{
    method:"POST",
    body:JSON.stringify(body),
    headers:{
      "Content-Type": "application/json",
    }
  });
  
  return res.json();
}


const getBasket = async(userId: string): Promise<GetBasketResponse>=>{

  const res = await fetch (`${BASE_URL}/api/cart?userId=${userId}`);

  return res.json();

};


const clearCart =async (userId:string):Promise<MessageResponse>=>{
  const res = await fetch(`${BASE_URL}/api/cart?userId=${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}


const updateCartItem = async (
  userId: string,
  groceryId: string,
  quantity: number
): Promise<Cart> => {
  const res = await fetch(`${BASE_URL}/api/cart/item`, {
    method: "PUT",
    body: JSON.stringify({ userId, groceryId, quantity }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

// ürünü sepetten kaldır
const removeCartItem = async (
  userId: string,
  groceryId: string
): Promise<Cart> => {
  const res = await fetch(
    `${BASE_URL}/api/cart/item?userId=${userId}&groceryId=${groceryId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.json();
};


const checkoutAllItems = async (
  userId: string
): Promise<SingleCheckoutResponse> => {
  const body = {
    userId: userId,
    customerInfo: {
      name: "Cihan Hayta",
      phone: "05559876543",
      deliveryAddress: "Bahçeli Mahalle, Meyve Sokak No:45, İzmir",
      isDelivery: true,
    },
  };

  const res = await fetch(`${BASE_URL}/api/checkout`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};




export { addToBasket ,checkoutSingleItem,getBasket,clearCart,removeCartItem,updateCartItem,checkoutAllItems};
