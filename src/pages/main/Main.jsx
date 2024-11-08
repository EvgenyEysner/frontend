import { useNavigate } from 'react-router';
import styles from './main.module.css';
import { BsUpcScan } from "react-icons/bs";

export const Main = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.main}>
      <button
        className={styles.main__button}
        onClick={() => navigate('/scan')}
        aria-label="Open barcode scanner"
      >
        <BsUpcScan fontSize="148px" />
      </button>
    </div>
  );
};
