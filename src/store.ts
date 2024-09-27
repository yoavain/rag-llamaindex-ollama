import { MilvusVectorStore, storageContextFromDefaults } from "llamaindex";
import type { StorageContext } from "llamaindex/storage/StorageContext";
import { getMilvusClient, getMilvusCollection } from "./vectorDb/milvus";

const getVectorStore = (): MilvusVectorStore => {
    return new MilvusVectorStore({
        milvusClient: getMilvusClient(),
        collection: getMilvusCollection()
    });
};

let storageContext: StorageContext;
export const getStorageContext = async (): Promise<StorageContext> => {
    if (!storageContext) {
        storageContext = await storageContextFromDefaults({
            vectorStore: getVectorStore()
        });
    }
    return storageContext;
};
