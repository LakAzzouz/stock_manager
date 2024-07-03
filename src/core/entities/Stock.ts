import { v4 } from "uuid";
import { Location, StockData, Threshold } from "../types/StockData";
import { StockErrors } from "../errors/StockErrors";

export type StockProperties = {
  id: string;
  productId: string; //locationId
  stockByLocation: StockData[]; 
  createdAt: Date;
  updatedAt?: Date
};

export class Stock {
  props: StockProperties;

  constructor(stockProperties: StockProperties) {
    this.props = stockProperties;
  }

  static initiate(props: {productId: string, stockByLocation: StockData[]}): Stock {
    const stock = new Stock({
      id: v4(),
      productId: props.productId,
      stockByLocation: props.stockByLocation,
      createdAt: new Date()
    });
    return stock;
  }

  static create(props: {productId: string, storeIds: string[], warehouseIds: string[]}): Stock {
    const {productId, storeIds, warehouseIds} = props
    const stockDatas = this.createStockData({
      storeIds,
      warehouseIds
    })
    const stock = new Stock({
      id: v4(),
      productId,
      stockByLocation: stockDatas,
      createdAt: new Date()
    })
    return stock
  }

  private static createStockData(props: {storeIds: string[], warehouseIds: string[]}): StockData[] {
    const {storeIds, warehouseIds} = props;
    const storeStockDatas: StockData[] = storeIds.map((storeId) => {
      return {
        type: Location.STORE,
        locationId: storeId,
        quantity: 0,
        threshold: Threshold.STORE
      }
    })
    const warehouseStockDatas: StockData[] = warehouseIds.map((warehouseId) => {
      return {
        type: Location.WAREHOUSE,
        locationId: warehouseId,
        quantity: 0,
        threshold: Threshold.WAREHOUSE
      }
    })

    const stockDatas = [...storeStockDatas, ...warehouseStockDatas]
    if(stockDatas.length === 0) {
      throw new StockErrors.NeedStoreOrWarehouseId()
    }

    return stockDatas
  }
  
}
