import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const itemInCart = get().cart.find((item) => item.id === product.id)
        if (itemInCart) {
          const newCart = get().cart.map((item) => {
            if (item.id === itemInCart.id) {
              return { ...item, quantity: itemInCart.quantity++ }
            }

            return item
          })

          set({ cart: newCart })
        } else {
          const newCart = [...get().cart]
          newCart.push({ ...product, quantity: 1 })
          set({ cart: newCart })
        }
      },
      incrementQuantity: (id) => {
        const newCart = get().cart.map((el) => {
          console.log(el, id)
          if (el.id === id) {
            return { ...el, quantity: el.quantity + 1 }
          }

          return el
        })

        console.log(newCart)

        set({ cart: newCart })
      },
      decrementQuantity: (id) => {
        const newCart = get()
          .cart.map((el) => {
            if (el.id === id) {
              return { ...el, quantity: el.quantity - 1 }
            }

            return el
          })
          .filter((el) => el.quantity > 0)

        set({ cart: newCart })
      },
      removeItem: (id) => {
        const newCart = get().cart.filter((item) => item.id !== id)
        set({ cart: newCart })
      },
      clearCart: () => {
        set({ cart: [] })
      },
    }),
    {
      name: 'cart',
    },
  ),
)
