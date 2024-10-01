// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import { storageContextFromDefaults } from "llamaindex";
import type { StorageContext } from "llamaindex/storage/StorageContext";
import type { VectorStoreType } from "../vectorDb/vectorStoreFactory";
import { getVectorStore } from "../vectorDb/vectorStoreFactory";


const VECTOR_STORE_TYPE: VectorStoreType  = process.env.VECTOR_STORE_TYPE as VectorStoreType;

let storageContext: StorageContext;
export const getStorageContext = async (vectorStoreType?: VectorStoreType): Promise<StorageContext> => {
    if (!storageContext) {
        storageContext = await storageContextFromDefaults({
            vectorStore: getVectorStore(vectorStoreType || VECTOR_STORE_TYPE)
        });
    }
    return storageContext;
};
