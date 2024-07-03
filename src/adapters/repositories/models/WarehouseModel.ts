export interface WarehouseModel {
  id: string;
  city: string;
  manager_id: string;
  number_of_employees: number;
  created_at: Date;
  updated_at?: Date;
}
