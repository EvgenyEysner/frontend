import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
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
          if (el.id === id) {
            return { ...el, quantity: el.quantity++ }
          }

          return el
        })

        set({ cart: newCart })
      },
      decrementQuantity: (id) => {
        const newCart = get()
          .cart.map((el) => {
            if (el.id === id) {
              return { ...el, quantity: el.quantity-- }
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
