// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import { storageContextFromDefaults } from "llamaindex";
import type { StorageContext } from "llamaindex/storage/StorageContext";
import { getVectorStore, VectorStoreType } from "../vectorDb/vectorStoreFactory";


const VECTOR_STORE_TYPE: VectorStoreType  = process.env.VECTOR_STORE_TYPE as VectorStoreType;
const PERSIST_DIR = "./.storage";

let storageContext: StorageContext;
export const getStorageContext = async (vectorStoreType?: VectorStoreType): Promise<StorageContext> => {
    if (!storageContext) {
        storageContext = await storageContextFromDefaults({
            vectorStore: getVectorStore(vectorStoreType || VECTOR_STORE_TYPE),
            persistDir: VECTOR_STORE_TYPE === VectorStoreType.LOCAL_STORAGE ? PERSIST_DIR : undefined
        });
    }
    return storageContext;
};
