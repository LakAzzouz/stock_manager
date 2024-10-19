import { v4 } from "uuid";
import { faker } from "@faker-js/faker";
import { Product } from "../../entities/Product";
import { Store } from "../../entities/Store";
import { Order } from "../../entities/Order";
import { Warehouse } from "../../entities/Warehouse";
import { ProductInfo } from "../../types/ProductInfo";
import { Sale } from "../../entities/Sale";
import { Stock } from "../../entities/Stock";
import { OrderStatus } from "../../types/OrderStatus";
import { User } from "../../entities/User";
import { Location } from "../../types/LocationType";
import { StockData } from "../../entities/StockData";
import { Threshold } from "../../types/StockData";
import { ENTITYTYPE } from "../../types/EntityType";
import { MIMETYPE } from "../../types/MimeType";
import { Media } from "../../entities/Media";
import { ProductType } from "../../types/ProductType";

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
  locationId?: string;
  type?: Location;
  stockDatas?: StockData[];
  createdAt?: Date,
  updatedAt?: Date
};

type GenerateUser = {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  birthDate?: Date;
  isVerified?: boolean;
  resetPasswordCode?: string;
  verifyEmailCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type GenerateStockData = {
  id?: string;
  stockId?: string;
  productId?: string;
  quantity?: number;
  threshold?: Threshold;
}

type GenerateMedia = {
  id?: string;
  entityId?: string;
  url?: string;
  entityType?: ENTITYTYPE;
  mimeType?: MIMETYPE;
  createdAt?: Date;
  updatedAt?: Date;
}

export class DataBuilders {
  static generateProduct(props?: GenerateProduct): Product {
    return new Product({
      id: props?.id ? props.id : v4(),
      name: props?.name ? props.name : "Air Jordan",
      productType: props?.productType ? props.productType : ProductType.SHOES,
      price: props?.price ? props.price : faker.number.int({ min: 100, max: 500 }),
      size: props?.size ? props.size : faker.number.int({ min: 35, max: 49 }),
      createdAt: props?.createdAt ? props.createdAt : new Date(1719152430000),
      updatedAt: props?.updatedAt ? props.updatedAt : new Date(1719152430000)
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
      updatedAt: props?.updatedAt ? props.updatedAt : new Date(1719152430000)
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
      updatedAt: props?.updatedAt ? props.updatedAt : new Date(1719152430000)
    });
  }

  static generateWarehouse(props?: GenerateWarehouse): Warehouse {
    return new Warehouse({
      id: props?.id ? props.id : v4(),
      city: props?.city ? props.city : faker.location.city(),
      managerId: props?.managerId ? props.managerId : v4(),
      numberOfEmployees: props?.numberOfEmployees ? props.numberOfEmployees : 20,
      createdAt: props?.createdAt ? props.createdAt : new Date(1719152430000),
      updatedAt: props?.updatedAt ? props.updatedAt : new Date(1719152430000)
    });
  }

  static generateSale(props?: GenerateSale): Sale {
    return new Sale({
      id: props?.id ? props.id : v4(),
      productInfos: props?.productInfos ? props.productInfos : [{productId: v4(), quantity: faker.number.int({min: 1, max: 15})}],
      totalPrice: props?.totalPrice ? props.totalPrice : 100,
      saleDate: props?.saleDate ? props.saleDate : new Date(1719152430000),
      updatedAt: props?.updatedAt ? props.updatedAt : new Date(1719152430000)
    })
  }

  static generateStock(props?: GenerateStock): Stock {
    return new Stock({
      id: props?.id ? props.id : v4(),
      locationId: props?.locationId ? props.locationId : v4(),
      type: props?.type ? props.type : Location.STORE || Location.WAREHOUSE,
      stockDatas: props?.stockDatas ? props.stockDatas : [new StockData ({id: v4(), productId: v4(), quantity: faker.number.int({min: 100, max: 500}), threshold: faker.number.int({min: 10, max: 50}), stockId: props?.id ? props.id : v4()})],
      createdAt: props?.createdAt ? props.createdAt : new Date(1719152430000),
      updatedAt: props?.updatedAt ? props.updatedAt : new Date(1719152430000)
    })
  }

  static generateUser(props?: GenerateUser): User {
    return new User ({
      id: props?.id ? props.id : v4(),
      username: props?.username ? props.username : faker.internet.userName(),
      email: props?.email ? props.email : faker.internet.email(),
      password: props?.password ? props.password : "Toto1234!",
      birthDate: props?.birthDate ? props.birthDate : new Date(),
      isVerified: props?.isVerified ? props.isVerified : false,
      resetPasswordCode: props?.resetPasswordCode ? props.resetPasswordCode : "",
      verifyEmailCode: props?.verifyEmailCode ? props.verifyEmailCode : faker.string.uuid(),
      createdAt: props?.createdAt ? props.createdAt : new Date(1719152430000),
      updatedAt: props?.updatedAt ? props.updatedAt : new Date(1719152430000)
    })
  }

  static generateStockData(props?: GenerateStockData): StockData {
    return new StockData({
      id: props?.id ? props.id : v4(),
      stockId: props?.stockId ? props.stockId : v4(),
      productId: props?.productId ? props.productId : v4(),
      quantity: props?.quantity ? props.quantity : faker.number.int({min: 50, max: 200}),
      threshold: props?.threshold ? props.threshold : faker.number.int({min: 20, max: 50})
    })
  }

  static generateMedia(props?: GenerateMedia): Media {
    return new Media({
      id: props?.id ? props.id : v4(),
      entityId: props?.entityId ? props.entityId : "entity_id",
      url: props?.url ? props.url : "http://toto.com",
      entityType: props?.entityType ? props.entityType : ENTITYTYPE.PRODUCT || ENTITYTYPE.STORE || ENTITYTYPE.USER || ENTITYTYPE.WAREHOUSE,
      mimeType: props?.mimeType ? props.mimeType : MIMETYPE.JPEG || MIMETYPE.PNG,
      createdAt: props?.createdAt ? props.createdAt : new Date(1719152430000),
      updatedAt: props?.updatedAt ? props.updatedAt : new Date(1719152430000)
    })
  }
}
