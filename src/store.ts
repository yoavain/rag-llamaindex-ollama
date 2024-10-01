import { storageContextFromDefaults } from "llamaindex";
import type { StorageContext } from "llamaindex/storage/StorageContext";
import { getQdrantVectorStore } from "./vectorDb/qdrant";

let storageContext: StorageContext;
export const getStorageContext = async (): Promise<StorageContext> => {
    if (!storageContext) {
        storageContext = await storageContextFromDefaults({
            vectorStore: getQdrantVectorStore()
        });
    }
    return storageContext;
};
