import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import {AuthRoutes} from './components/Routes/AuthRoutes';
import {Footer} from './components/Footer/Footer';

function App() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="d-flex flex-column" style={{minHeight: `${windowHeight}px`}}>
      <AuthRoutes/>
      <Footer/>
    </div>
  );
}

export default App;
