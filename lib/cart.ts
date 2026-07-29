export function calculateShipping(subtotal: number) {
  return subtotal >= 2000 ? 0 : 200;
}

export function calculateTotal(
  subtotal: number,
  shipping: number
) {
  return subtotal + shipping;
}