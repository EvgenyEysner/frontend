import {useNavigate} from 'react-router'
import styles from './main.module.css'
import {BsUpcScan} from "react-icons/bs";

export const Return = () => {
    const navigate = useNavigate()

    return (
        <div className='container mx-auto mt-3'>
            <div className={styles.main}>
                <button onClick={() => navigate('/return-request/scan')}>
                    <BsUpcScan fontSize={148}/>
                </button>
            </div>
        </div>
    )
}
