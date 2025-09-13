// Local storage utilities for guest cart functionality

export interface LocalCartItem {
  product_id: number
  variant_id?: number
  quantity: number
  // Store additional product info for display
  product?: {
    title: string
    variant: {
      id: number
      size: string
      color: string
      image: string
      price: number
      discount_price: number | null
    }
  }
}

const CART_STORAGE_KEY = "guest_cart"

export const localCartStorage = {
  // Get cart from localStorage
  getCart: (): LocalCartItem[] => {
    if (typeof window === "undefined") return []
    try {
      const cart = localStorage.getItem(CART_STORAGE_KEY)
      return cart ? JSON.parse(cart) : []
    } catch (error) {
      console.error("Error reading cart from localStorage:", error)
      return []
    }
  },

  // Save cart to localStorage
  setCart: (cart: LocalCartItem[]): void => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch (error) {
      console.error("Error saving cart to localStorage:", error)
    }
  },

  // Add item to local cart
  addItem: (item: LocalCartItem): void => {
    const cart = localCartStorage.getCart()
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.product_id === item.product_id && cartItem.variant_id === item.variant_id,
    )

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      cart[existingItemIndex].quantity += item.quantity || 1
    } else {
      // Add new item
      cart.push({ ...item, quantity: item.quantity || 1 })
    }

    localCartStorage.setCart(cart)
  },

  // Update item quantity
  updateItem: (product_id: number, variant_id: number | undefined, quantity: number): void => {
    const cart = localCartStorage.getCart()
    const itemIndex = cart.findIndex((item) => item.product_id === product_id && item.variant_id === variant_id)

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        cart.splice(itemIndex, 1)
      } else {
        cart[itemIndex].quantity = quantity
      }
      localCartStorage.setCart(cart)
    }
  },

  // Remove item from cart
  removeItem: (product_id: number, variant_id: number | undefined): void => {
    const cart = localCartStorage.getCart()
    const filteredCart = cart.filter((item) => !(item.product_id === product_id && item.variant_id === variant_id))
    localCartStorage.setCart(filteredCart)
  },

  // Clear entire cart
  clearCart: (): void => {
    if (typeof window === "undefined") return
    localStorage.removeItem(CART_STORAGE_KEY)
  },

  // Get cart count
  getCartCount: (): number => {
    const cart = localCartStorage.getCart()
    return cart.reduce((total, item) => total + item.quantity, 0)
  },
}
