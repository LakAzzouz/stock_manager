import { v4 } from "uuid";
import { faker } from "@faker-js/faker";
import { Product, ProductType } from "../../entities/Product";
import { Store } from "../../entities/Store";
import { Order } from "../../entities/Order";

type GenerateProduct = {
  id?: string;
  name?: string;
  productType?: ProductType;
  price?: number;
  size?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

type GenerateStore = {
  id?: string;
  name?: string;
  city?: string;
  turnover?: number;
  frequentation?: number;
  priceReduction?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

type GenerateOrder = {
  id?: string;
  productIds?: string[];
  totalPrice?: number;
  orderDate?: Date;
  dateOfArrival?: Date;
  updatedAt?: Date;
}

export class DataBuilders {
  static generateProduct(props?: GenerateProduct): Product {
    return new Product({
      id: props?.id ? props.id : v4(),
      name: props?.name ? props.name : faker.person.firstName("male"),
      productType: props?.productType ? props.productType : ProductType.SHOES,
      price: props?.price ? props.price : faker.number.int({ min: 100, max: 500 }),
      size: props?.size ? props.size : faker.number.int({ min: 35, max: 49 }),
      createdAt: props?.createdAt ? props.createdAt : new Date(),
      updatedAt: props?.updatedAt ? props.updatedAt : new Date(),
    });
  }

  static generateStore(props?: GenerateStore): Store {
    return new Store({
      id: props?.id ? props.id : v4(),
      name: props?.name ? props.name : "nike_store",
      city: props?.city ? props.city : faker.location.city(),
      turnover: props?.turnover ? props.turnover : 100000,
      frequentation: props?.frequentation ? props.frequentation : 3500,
      priceReduction: props?.priceReduction ? props.priceReduction : 0,
      createdAt: props?.createdAt ? props.createdAt : new Date(),
      updatedAt: props?.updatedAt ? props.updatedAt : new Date(),
    });
  }

  static generateOrder(props?: GenerateOrder): Order {
    return new Order({
      id: props?.id ? props.id : v4(),
      productIds: props?.productIds ? props.productIds : [""],
      totalPrice: props?.totalPrice ? props.totalPrice : 90,
      orderDate: props?.orderDate ? props.orderDate : new Date(),
      dateOfArrival: props?.dateOfArrival ? props.dateOfArrival : new Date(),
      updatedAt: props?.updatedAt ? props.updatedAt : new Date(),
    })
  }
}
