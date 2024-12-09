const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const loginRequest = async (email, password) => {
  const url = `${API_BASE_URL}/token/`;
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  };

  const controller = new AbortController(); // For request timeout handling
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Login request failed: ${errorDetails.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Login request timed out');
    }
    throw new Error(`Login request failed: ${error.message}`);
  }
};

export const fetchItem = async (name, token) => {
  const response = await fetch(`${API_BASE_URL}/item/${name}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Item not found');
  return await response.json();
};

export const fetchCategories = async (token) => {
  const response = await fetch(`${API_BASE_URL}/category`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch categories');
  return await response.json();
};

export const fetchStocks = async (token) => {
  const response = await fetch(`${API_BASE_URL}/stock`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch stocks');
  return await response.json();
};

export const updateItem = async (name, formData, token) => {
  const response = await fetch(`${API_BASE_URL}/item/${name}/`, {
    method: 'PUT',
    mode: 'cors',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to update item');
  return await response.json();
};

export const searchItem = async (query, token) => {
  const response = await fetch(`${API_BASE_URL}/items/?search=${encodeURIComponent(query)}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Item not found');
  return await response.json();
};


