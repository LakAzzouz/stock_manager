export class PriceOrder {
  static totalPrice(totalPrice: number): number {
    if (totalPrice > 100) {
      totalPrice - 10;
    }
    return totalPrice;
  }
}
