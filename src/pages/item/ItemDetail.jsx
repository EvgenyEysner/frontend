import React, {useMemo} from 'react';
import {useNavigate, useParams} from "react-router";
import {useFetchItem} from "../../hooks/useFetchItem";
import {useCartStore} from "../../store/cart";
import {Loader} from "../../UI/loader/Loader";
import {Item} from "../../components/Item/Item";
import styles from "../home/home.module.css";
import {ShoppingCart} from "@mui/icons-material";

export const ItemDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {isLoading, data, error} = useFetchItem(params.name);
  const {cart} = useCartStore();

  const getTotalQuantity = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  if (isLoading) {
    return (
      <div className="d-flex gap-4 pt-5 justify-content-center">
        <Loader/>
      </div>
    );
  }

  return (
    <>
      <Item {...data} />
      <div className={styles.shopping__cart} onClick={() => navigate('/cart')}>
        <ShoppingCart id='cartIcon' style={{width: '28px', height: '28px', color: 'white'}}/>
        {getTotalQuantity !== 0 && <p>{getTotalQuantity > 99 ? '99+' : getTotalQuantity}</p>}
      </div>
    </>
  );
};
