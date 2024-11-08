import { useNavigate } from 'react-router';
import styles from './main.module.css';
import { BsUpcScan } from "react-icons/bs";

export const Return = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto mt-3 p-3">
      <div className={styles.main}>
        <button
          className={styles.main__button}
          onClick={() => navigate('/return-request/scan')}
          aria-label="Open return request scanner"
        >
          <BsUpcScan fontSize="148px" />
        </button>
      </div>
    </div>
  );
};
