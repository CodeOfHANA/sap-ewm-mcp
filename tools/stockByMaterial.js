import { s4hGet } from '../lib/s4hClient.js';

const BASE = `/sap/opu/odata4/sap/api_whse_physstockprod/srvd_a2x/sap/whsephysicalstockproducts/0001/WarehousePhysicalStockProducts`;

export async function getStockForMaterial({ warehouse, material, top = 20 }) {
  const filters = [`EWMWarehouse eq '${warehouse}'`];
  if (material) filters.push(`Product eq '${material}'`);

  const path = `${BASE}?$filter=${encodeURIComponent(filters.join(' and '))}&$top=${top}`;
  const data = await s4hGet(path);

  return {
    count: data.value.length,
    warehouse,
    material: material || 'all',
    stock: data.value.map(s => ({
      product: s.Product,
      warehouse: s.EWMWarehouse,
      storageType: s.EWMStorageType,
      storageBin: s.EWMStorageBin,
      quantity: s.EWMStockQuantityInBaseUnit,
      unit: s.EWMBaseUnit,
      stockCategory: s.EWMStockCategory,
    }))
  };
}
