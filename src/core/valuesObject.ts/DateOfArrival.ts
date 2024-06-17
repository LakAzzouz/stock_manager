export class DateOfArrival {
  static dateLimit(dateOfArrival: Date, orderDate: Date, totalPrice: number): number {
    const differenceInTime = dateOfArrival.getTime() - orderDate.getTime();
    const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
    if (differenceInDays > 7) {
      return totalPrice - (20 * 100) / totalPrice;
    }
    return totalPrice;
  }
}
