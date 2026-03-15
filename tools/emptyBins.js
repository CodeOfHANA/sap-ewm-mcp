import { s4hGet } from '../lib/s4hClient.js';

const BASE = `/sap/opu/odata4/sap/api_whse_storagebin/srvd_a2x/sap/whsestoragebin/0001/StorageBin`;

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
      blocked: b.EWMStorageBinIsBlocked,
    }))
  };
}
