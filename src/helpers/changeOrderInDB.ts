import axios from "axios";
import { IUser } from "@/interfaces/user.interface";

const changeOrderInDB = async (productId: number, quantity: number) => {
  try {
    const resUser = await axios.get("http://localhost:5000/users/whoami", {
      withCredentials: true,
    });
    const user: IUser = resUser.data;
    const order = user.orders.find((el) => el.product.id === productId);

    if (order)
      await axios.patch(
        `http://localhost:5000/order/${order.id}`,
        {
          status: 1,
          quantity,
        },
        { withCredentials: true }
      );
  } catch (e) {
    console.error(e);
  }
};

export default changeOrderInDB;
