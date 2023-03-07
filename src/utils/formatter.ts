export function formatPrice(price: number) {
  const newPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price / 100)

  return newPrice
}
