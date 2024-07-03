import { Store } from "../../../core/entities/Store";
import { StoreModel } from "../models/StoreModel";
import { Mapper } from "./Mapper";

export class SqlStoreMapper implements Mapper<StoreModel, Store> {
  toDomain(raw: StoreModel): Store {
    const store = new Store({
      id: raw.id,
      name: raw.name,
      city: raw.city,
      turnover: raw.turnover,
      frequentation: raw.frequentation,
      priceReduction: raw.price_reduction,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
    return store;
  }

  fromDomain(data: Store): StoreModel {
    const storeModel: StoreModel = {
      id: data.props.id,
      name: data.props.name,
      city: data.props.city,
      turnover: data.props.turnover,
      frequentation: data.props.frequentation,
      price_reduction: data.props.priceReduction,
      created_at: data.props.createdAt,
      updated_at: data.props.updatedAt,
    };
    return storeModel;
  }
}
