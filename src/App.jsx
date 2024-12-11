import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import {AuthRoutes} from './components/Routes/AuthRoutes';
import {Footer} from './components/Footer/Footer';
import {useRegisterSW} from 'virtual:pwa-register/react';

function App() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const {needRefresh, updateServiceWorker} = useRegisterSW({
    onRegisteredSW(swUrl, registration) {
      console.log('Service Worker registriert:', swUrl);
      setInterval(() => {
        if (registration) {
          registration.update();
        }
      }, 60 * 60 * 1000); // Jede Stunde prüfen
    },
    onRegisterError(error) {
      console.error('Service Worker Fehler:', error);
    },
  });

  // UX: Nutzer-Feedback bei Service Worker Update
  useEffect(() => {
    if (needRefresh) {
      if (window.confirm('Neue Version verfügbar! Möchtest du die Anwendung aktualisieren?')) {
        updateServiceWorker(true); // Erzwingt das Update sofort
      }
    }
  }, [needRefresh, updateServiceWorker]);

  // Debounced Resize-Event für Performance-Optimierung
  useEffect(() => {
    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };
    };

    const handleResize = () => setWindowHeight(window.innerHeight);
    const debouncedResize = debounce(handleResize, 200);

    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  return (
    <div className="d-flex flex-column" style={{minHeight: `${windowHeight}px`}}>
      <AuthRoutes/>
      <Footer/>
    </div>
  );
}

export default App;
