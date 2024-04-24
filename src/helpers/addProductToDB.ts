import { IProduct } from "@/interfaces/product.interface";
import axios from "axios";

const addProductsToDB = async (products: IProduct[], userId: number) => {
  const orders = products.map((el) => {
    return {
      status: 1,
      quantity: el.quantity,
      total: el.quantity * el.price,
      product_id: el.id,
      user_id: userId,
    };
  });

  const promises = orders.map((el) =>
    axios.post("http://localhost:5000/order", el, {
      withCredentials: true,
    })
  );

  await Promise.all(promises);
};

export default addProductsToDB;
