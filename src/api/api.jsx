export const loginRequest = async (email, password) => {
  const url = 'api/v1/token/' // You may need to specify the full URL depending on your setup
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json() // Assuming the server responds with JSON data
  } catch (error) {
    throw new Error(`Login request failed: ${error.message}`)
  }
}
