import { v4 } from "uuid";
import { PriceReduction } from "../valuesObject.ts/PriceReduction";

export type StoreProperties = {
  id: string;
  name: string;
  city: string;
  turnover: number;
  frequentation: number;
  priceReduction: number;
  createdAt: Date;
  updatedAt?: Date;
};

export class Store {
  props: StoreProperties;

  constructor(storeProperties: StoreProperties) {
    this.props = storeProperties;
  }

  static create(props: {name: string, city: string, turnover: number, frequentation: number}): Store {
    const store = new Store({
      id: v4(),
      name: props.name,
      city: props.city,
      turnover: props.turnover,
      frequentation: props.frequentation,
      priceReduction: PriceReduction.apply(props.frequentation),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return store;
  }

  update(newPriceReduction: number): Store {
    this.props.priceReduction = newPriceReduction
    return this
  }
}
