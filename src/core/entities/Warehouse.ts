import { v4 } from "uuid";

export type WarehouseProperties = {
  id: string;
  city: string;
  managerId: string;
  numberOfEmployees: number;
  createdAt: Date;
  updatedAt?: Date;
};

export class Warehouse {
  props: WarehouseProperties;

  constructor(warehouseProperties: WarehouseProperties) {
    this.props = warehouseProperties;
  }

  static create(props: {city: string, numberOfEmployees: number}): Warehouse {
    const warehouse = new Warehouse({
      id: v4(),
      city: props.city,
      managerId: v4(),
      numberOfEmployees: props.numberOfEmployees,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return warehouse;
  }

  update(newNumberOfEmployees: number): Warehouse {
    this.props.numberOfEmployees = newNumberOfEmployees;
    return this;
  }
}
