export class PriceReduction {
  static apply(frequentation: number): number {
    let priceReduction = 0;
    if (frequentation < 5000) {
      priceReduction = 10;
    }
    if (frequentation > 5000 && frequentation < 10000) {
      priceReduction = 5;
    }
    return priceReduction;
  }
}
