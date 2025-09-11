const LOCAL_CART_KEY = "guest-cart";

export type GuestCartItem = {
  product_id: number;
  slug?: string;
  quantity: number;
  variant_id?: number;
  product?: {
    title?: string;
    slug?: string;
    variant?: {
      id?: number;
      image?: string;
      price?: number | string;
      size?: string;
      color?: string;
    };
  };
};

export function getGuestCart(): GuestCartItem[] {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem(LOCAL_CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

export function setGuestCart(cart: GuestCartItem[]) {
  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
}

export function addToGuestCart(item: GuestCartItem) {
  const cart = getGuestCart();
  const existing = cart.find(
    (c) =>
      c.product_id === item.product_id &&
      (c.variant_id ?? null) === (item.variant_id ?? null)
  );

  if (existing) {
    existing.quantity += item.quantity;
    if (item.slug) existing.slug = item.slug;
    if (item.product) existing.product = { ...existing.product, ...item.product };
  } else {
    cart.push(item);
  }
  setGuestCart(cart);
  return cart;
}

export function updateGuestCartItem(product_id: number, quantity: number, variant_id?: number) {
  let cart = getGuestCart();
  cart = cart.map((item) =>
    item.product_id === product_id && (item.variant_id ?? null) === (variant_id ?? null)
      ? { ...item, quantity }
      : item
  );
  setGuestCart(cart);
  return cart;
}

export function removeGuestCartItem(product_id: number, variant_id?: number) {
  let cart = getGuestCart();
  cart = cart.filter(
    (item) =>
      !(item.product_id === product_id && (item.variant_id ?? null) === (variant_id ?? null))
  );
  setGuestCart(cart);
  return cart;
}

// Optional: clear entire cart
export function clearGuestCart() {
  localStorage.removeItem(LOCAL_CART_KEY);
}
