import { s4hPost } from '../lib/s4hClient.js';

const BASE = `/sap/opu/odata4/sap/api_warehouse_order_task_2/srvd_a2x/sap/warehouseordertask/0001/WarehouseTask`;

export async function createTransferOrder({ warehouse, sourceBin, destinationBin, product, quantity, unit }) {
  const body = {
    EWMWarehouse: warehouse,
    EWMSourceStorageBin: sourceBin,
    EWMDestinationStorageBin: destinationBin,
    Product: product,
    EWMRequestedQuantityInBaseUnit: quantity,
    EWMBaseUnit: unit
  };

  const result = await s4hPost(BASE, body);

  return {
    success: true,
    warehouse,
    warehouseTask: result.EWMWarehouseTask,
    warehouseOrder: result.EWMWarehouseOrder,
    product,
    quantity,
    sourceBin,
    destinationBin,
  };
}
