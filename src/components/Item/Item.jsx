import {useCartStore} from '../../store/cart'
import IconButton from '@mui/material/IconButton'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import styles from './item.module.css'
import DeleteIcon from '@mui/icons-material/Delete'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

export const Item = ({id, name, image, description, ean, stock, onStock, category}) => {
  const {cart, addToCart, incrementQuantity, decrementQuantity, removeItem} = useCartStore()
  const currentItem = cart.find((el) => el.id === id)

  return (
    <div className='bg-white'>
      <div className='pt-6'>
        <nav aria-label='Breadcrumb'>
          <ol
            role='list'
            className='mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8'
          >
            <li>
              <div className='flex items-center'>
                <span className='mr-2 text-sm font-medium text-gray-900'>Kategorie</span>
                <svg
                  width='16'
                  height='20'
                  viewBox='0 0 16 20'
                  fill='currentColor'
                  aria-hidden='true'
                  className='h-5 w-4 text-gray-300'
                >
                  <path d='M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z'/>
                </svg>
              </div>
            </li>
            <li>
              <div className='flex items-center'>
                <span className='mr-2 text-sm font-medium text-gray-900'>{category}</span>
                <svg
                  width='16'
                  height='20'
                  viewBox='0 0 16 20'
                  fill='currentColor'
                  aria-hidden='true'
                  className='h-5 w-4 text-gray-300'
                >
                  <path d='M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z'/>
                </svg>
              </div>
            </li>

            <li className='text-sm'>
              <span aria-current='page' className='font-medium text-gray-500 hover:text-gray-600'>
                {name}
              </span>
            </li>
          </ol>
        </nav>

        <div className='mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8'>
          <div className='aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block'>
            <img src={image} alt={name} className='h-full w-full object-cover object-center'/>
          </div>
        </div>

        <div
          className='mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16'>
          <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
            <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>{name}</h1>
          </div>
          <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6'>
            <div>
              <h3 className='sr-only'>Beschreibung</h3>

              <div className='space-y-6'>
                <p className='text-base text-gray-900'>{description}</p>
              </div>
            </div>

            <div className='mt-10'>
              <h3 className='text-sm font-medium text-gray-900'>Produktinfos</h3>

              <div className='mt-4'>
                <ul role='list' className='list-disc space-y-2 pl-4 text-sm'>
                  <li className='text-gray-400'>
                    <span className='text-gray-600'>Bezeichnung: {name}</span>
                  </li>
                  <li className='text-gray-400'>
                    <span className='text-gray-600'>EAN: {ean}</span>
                  </li>
                  <li className='text-gray-400'>
                    <span className='text-gray-600'>Lager: {stock}</span>
                  </li>
                  <li className='text-gray-400'>
                    <span className='text-gray-600'>Verfügbar: {onStock}</span>
                  </li>
                </ul>
              </div>
            </div>
            <Divider variant='middle' className='mt-3 mb-3' sx={{opacity: 0.6}}/>
            {!currentItem && (
              <Button
                aria-label='add to shopping cart'
                size='small'
                variant='contained'
                color='inherit'
                onClick={() =>
                  addToCart({
                    id,
                    name,
                    image,
                    description,
                    ean,
                    stock,
                    onStock,
                    category,
                  })
                }
              >
                Hinzufügen
              </Button>
            )}
            {currentItem && (
              <>
                <div className={styles.cartItem__incrDec}>
                  <IconButton
                    disabled={currentItem.quantity === 1}
                    onClick={() => decrementQuantity(id)}
                  >
                    <RemoveIcon/>
                  </IconButton>
                  <p>{currentItem.quantity}</p>
                  <IconButton
                    disabled={currentItem.quantity === onStock}
                    onClick={() => incrementQuantity(id)}
                  >
                    <AddIcon/>
                  </IconButton>
                </div>
                <Button
                  variant='outlined'
                  color='error'
                  size='small'
                  startIcon={<DeleteIcon/>}
                  onClick={() => removeItem(id)}
                >
                  Löschen
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
