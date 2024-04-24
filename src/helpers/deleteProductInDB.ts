import { IProduct } from "@/interfaces/product.interface";
import { IOrder } from "@/interfaces/user.interface";
import axios from "axios";

export const deleteProductInDB = async (id: number | string) => {
  try {
    await axios.delete(`http://localhost:5000/order/${id}`, {
      withCredentials: true,
    });
  } catch (e) {
    console.error("Error: ", e);
  }
};

export const deleteAllProductInDB = async (products: IOrder[]) => {
  try {
    const promises = products.map((el) =>
      axios.delete(`http://localhost:5000/order/${el.id}`, {
        withCredentials: true,
      })
    );

    await Promise.all(promises);
  } catch (e) {
    console.error("Error: ", e);
  }
};
