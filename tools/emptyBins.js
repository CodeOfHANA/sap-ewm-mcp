import { s4hGet } from '../lib/s4hClient.js';

const BASE = `/sap/opu/odata4/sap/api_whse_storage_bin_2/srvd_a2x/sap/warehousestoragebin/0001/WarehouseStorageBin`;

export async function findEmptyBins({ warehouse, storageType, top = 50 }) {
  const filters = [
    `EWMWarehouse eq '${warehouse}'`,
    `EWMStorageBinIsEmpty eq true`
  ];
  if (storageType) filters.push(`EWMStorageType eq '${storageType}'`);

  const path = `${BASE}?$filter=${encodeURIComponent(filters.join(' and '))}&$top=${top}`;
  const data = await s4hGet(path);

  return {
    count: data.value.length,
    warehouse,
    storageType: storageType || 'all',
    emptyBins: data.value.map(b => ({
      bin: b.EWMStorageBin,
      storageType: b.EWMStorageType,
      blockedPutaway: b.EWMStorBinIsBlockedForPutaway,
      blockedRemoval: b.EWMStorBinIsBlockedForRemoval,
    }))
  };
}
