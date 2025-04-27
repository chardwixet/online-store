export function calcDisc(price: number, discount: number) {
  return Math.round(price * (1 - discount / 100));
}
