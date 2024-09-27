import { MilvusVectorStore, storageContextFromDefaults } from "llamaindex";
import type { StorageContext } from "llamaindex/storage/StorageContext";
import { getMilvusClient, getMilvusCollection } from "./vectorDb/milvus";

let storageContext: StorageContext;
export const getStorageContext = async (): Promise<StorageContext> => {
    if (!storageContext) {
        storageContext = await storageContextFromDefaults({
            vectorStore: new MilvusVectorStore({
                milvusClient: getMilvusClient(),
                collection: getMilvusCollection()
            })
        });
    }
    return storageContext;
};
