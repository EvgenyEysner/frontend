export const createHandleInputChange = (setStateFunction) => (field) => (e) => {
  const { value } = e.target
  setStateFunction((prevData) => ({ ...prevData, [field]: value }))
}

export const createHandleFileChange = (setStateFunction) => (e) => {
  setStateFunction((prevData) => ({ ...prevData, image: e.target.files[0] }))
}
