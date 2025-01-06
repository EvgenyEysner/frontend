import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import {AuthRoutes} from './components/Routes/AuthRoutes';
import {Footer} from './components/Footer/Footer';
import {useRegisterSW} from 'virtual:pwa-register/react';

function App() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hasConfirmedUpdate, setHasConfirmedUpdate] = useState(false);  // Neuen Zustand für Bestätigung hinzufügen

  const {needRefresh, updateServiceWorker} = useRegisterSW({
    onRegisteredSW(swUrl, registration) {
      console.log('Service Worker registriert:', swUrl);
      setInterval(() => {
        if (registration) {
          registration.update();
        }
      }, 60 * 60 * 1000); // Check every hour
    },
    onRegisterError(error) {
      console.error('Service Worker Fehler:', error);
    },
  });

  // UX: User feedback for Service Worker Update
  useEffect(() => {
    if (needRefresh && !hasConfirmedUpdate) {  // Only display if the user has not yet confirmed
      const userConfirmed = window.confirm('Neue Version verfügbar! Möchtest du die Anwendung aktualisieren?');
      if (userConfirmed) {
        updateServiceWorker(true); // Forces the update immediately
      }
      setHasConfirmedUpdate(true);  // Set confirmation
    }
  }, [needRefresh, updateServiceWorker, hasConfirmedUpdate]);

  // Debounced resize event for performance optimization
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
