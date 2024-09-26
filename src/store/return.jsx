import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useReturnStore = create(
  persist(
    (set, get) => ({
      returns: [],
      addToReturns: (product) => {
        const itemInReturns = get().returns.find((item) => item.id === product.id)
        if (itemInReturns) {
          const newReturns = get().returns.map((item) => {
            if (item.id === itemInReturns.id) {
              return { ...item, quantity: itemInReturns.quantity + 1 }
            }

            return item
          })

          set({ returns: newReturns })
        } else {
          const newReturns = [...get().returns]
          newReturns.push({ ...product, quantity: 1 })
          set({ returns: newReturns })
        }
      },
      incrementReturnQuantity: (id) => {
        const newReturns = get().returns.map((el) => {
          if (el.id === id) {
            return { ...el, quantity: el.quantity + 1 }
          }

          return el
        })

        set({ returns: newReturns })
      },
      decrementReturnQuantity: (id) => {
        const newReturns = get()
          .returns.map((el) => {
            if (el.id === id) {
              return { ...el, quantity: el.quantity - 1 }
            }

            return el
          })
          .filter((el) => el.quantity > 0)

        set({ returns: newReturns })
      },
      removeReturnItem: (id) => {
        const newReturns = get().returns.filter((item) => item.id !== id)
        set({ returns: newReturns })
      },
      clearReturns: () => {
        set({ returns: [] })
      },
    }),
    {
      name: 'returns',
    },
  ),
)
