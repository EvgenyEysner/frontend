import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ItemReturn } from '../../components/Item/ItemReturn';
import { useReturnStore } from '../../store/return';
import { Loader } from '../../UI/loader/Loader';
import { ScanAgain } from "../../components/Scanner/ScanAgain";
import {useFetchItem} from "../../hooks/useFetchItem";
import styles from "./home.module.css";
import {ShoppingCart} from "@mui/icons-material";

export const ReturnRequest = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading, data, error } = useFetchItem(params.name);
  const { returns } = useReturnStore();

  const getTotalQuantity = useMemo(
    () => returns.reduce((total, item) => total + item.quantity, 0),
    [returns]
  );

  if (isLoading) {
    return (
      <div className="d-flex gap-4 pt-5 justify-content-center">
        <Loader />
      </div>
    );
  }

  if (error || !data) {
    return <ScanAgain error={error} navigate={navigate} />;
  }

  return (
    <>
      <ItemReturn {...data} />
      <div className={styles.shopping__cart} onClick={() => navigate('/cart')}>
        <ShoppingCart id='cartIcon' style={{width: '28px', height: '28px', color: 'white'}}/>
        {getTotalQuantity !== 0 && <p>{getTotalQuantity > 99 ? '99+' : getTotalQuantity}</p>}
      </div>
    </>
  );
};
