import {toast} from 'react-hot-toast';

export const createHandleInputChange = (setStateFunction) => (field) => (e) => {
  const {value} = e.target
  setStateFunction((prevData) => ({...prevData, [field]: value}))
}

export const createHandleFileChange = (setStateFunction) => (e) => {
  const file = e.target.files[0];

  if (!file) {
    toast.error("Keine Datei ausgewählt!");
    return;
  }

  // Maximale Dateigröße (z. B. 5 MB)
  const MAX_SIZE_MB = 5;
  const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

  // Unterstützte Dateiformate
  const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];

  if (file.size > MAX_SIZE) {
    toast.error(`Datei zu groß! Maximale Größe: ${MAX_SIZE_MB} MB`);
    return;
  }

  if (!SUPPORTED_FORMATS.includes(file.type)) {
    toast.error("Ungültiges Dateiformat! Unterstützt: JPEG, PNG");
    return;
  }
  setStateFunction((prevData) => ({...prevData, image: file}));
};

