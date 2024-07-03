import { v4 } from "uuid";
import { faker } from "@faker-js/faker";
import { Product, ProductType } from "../../entities/Product";
import { Store } from "../../entities/Store";
import { Order } from "../../entities/Order";
import { Warehouse } from "../../entities/Warehouse";
import { ProductInfo } from "../../valuesObject.ts/ProductInfo";
import { Sale } from "../../entities/Sale";
import { Stock } from "../../entities/Stock";
import { Location, StockData } from "../../types/StockData";
import { OrderStatus } from "../../types/OrderStatus";

type GenerateProduct = {
  id?: string;
  name?: string;
  productType?: ProductType;
  image?: string;
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
  productInfos?: ProductInfo[];
  totalPrice?: number;
  status?: OrderStatus;
  orderDate?: Date;
  dateOfArrival?: Date;
  expectedDateOfArrival?: Date;
  updatedAt?: Date;
};

type GenerateWarehouse = {
  id?: string;
  city?: string;
  managerId?: string;
  numberOfEmployees?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

type GenerateSale = {
  id?: string;
  productInfos?: ProductInfo[];
  totalPrice?: number;
  saleDate?: Date;
  updatedAt?: Date
};


type GenerateStock = {
  id?: string;
  productId?: string;
  stockByLocation?: StockData[];
  createdAt?: Date,
  updatedAt?: Date
};

export class DataBuilders {
  static generateProduct(props?: GenerateProduct): Product {
    return new Product({
      id: props?.id ? props.id : v4(),
      name: props?.name ? props.name : "Yeezy",
      productType: props?.productType ? props.productType : ProductType.SHOES,
      image: props?.image ? props.image : faker.internet.url(),
      price: props?.price ? props.price : faker.number.int({ min: 100, max: 500 }),
      size: props?.size ? props.size : faker.number.int({ min: 35, max: 49 }),
      createdAt: props?.createdAt ? props.createdAt : new Date(1719152430000),
      updatedAt: props?.updatedAt ? props.updatedAt : new Date(1719152430000),
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
      createdAt: props?.createdAt ? props.createdAt : new Date(1719152430000),
      updatedAt: props?.updatedAt ? props.updatedAt : new Date(1719152430000),
    });
  }

  static generateOrder(props?: GenerateOrder): Order {
    return new Order({
      id: props?.id ? props.id : v4(),
      productInfos: props?.productInfos ? props.productInfos : [{productId: v4(), quantity: faker.number.int({min: 1, max: 15})}],
      locationId: v4(),
      totalPrice: props?.totalPrice ? props.totalPrice : 100,
      status: props?.status ? props.status : OrderStatus.IN_PROGRESS,
      orderDate: props?.orderDate ? props.orderDate : new Date(1719152430000),
      expectedArrivalDate: props?.expectedDateOfArrival ? props.expectedDateOfArrival : new Date(1719152430000),
      dateOfArrival: props?.dateOfArrival ? props.dateOfArrival : new Date(1719152430000),
      updatedAt: props?.updatedAt ? props.updatedAt : new Date(1719152430000),
    });
  }

  static generateWarehouse(props?: GenerateWarehouse): Warehouse {
    return new Warehouse({
      id: props?.id ? props.id : v4(),
      city: props?.city ? props.city : faker.location.city(),
      managerId: props?.managerId ? props.managerId : v4(),
      numberOfEmployees: props?.numberOfEmployees ? props.numberOfEmployees : 20,
      createdAt: props?.createdAt ? props.createdAt : new Date(1719152430000),
      updatedAt: props?.updatedAt ? props.updatedAt : new Date(1719152430000),
    });
  }

  static generateSale(props?: GenerateSale): Sale {
    return new Sale({
      id: props?.id ? props.id : v4(),
      productInfos: props?.productInfos ? props.productInfos : [{productId: v4(), quantity: faker.number.int({min: 1, max: 15})}],
      totalPrice: props?.totalPrice ? props.totalPrice : 100,
      saleDate: props?.saleDate ? props.saleDate : new Date(1719152430000),
      updatedAt: props?.updatedAt ? props.updatedAt : new Date(1719152430000),
    })
  }

  static generateStock(props?: GenerateStock): Stock {
    return new Stock({
      id: props?.id ? props.id : v4(),
      productId: props?.productId ? props.productId : v4(),
      stockByLocation: props?.stockByLocation ? props.stockByLocation : [{type: Location.STORE, locationId: v4(), quantity: faker.number.int(), threshold: faker.number.int()}],
      createdAt: props?.createdAt ? props.createdAt : new Date(1719152430000),
      updatedAt: props?.updatedAt ? props.updatedAt : new Date(1719152430000),
    })
  }
}
