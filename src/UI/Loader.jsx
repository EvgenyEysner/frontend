export const Loader = ({ color = '#2B3035' }) => {
  return (
    <div className='spinner-border' role='status' style={{ color }}>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}
