import { getQdrantVectorStore } from "./qdrant/qdrant";
import type { VectorStore } from "llamaindex";
import { getMilvusVectorStore } from "./milvus/milvus";

export const COLLECTION_NAME = "mashina";

export enum VectorStoreType {
    QDRANT = "QDRANT",
    MILVUS = "MILVUS",
    LOCAL_STORAGE = "LOCAL_STORAGE",
    INMEMORY = "IN_MEMORY"
}

export const getVectorStore = (vectorStoreType: VectorStoreType): VectorStore => {
    switch (vectorStoreType) {
        case VectorStoreType.QDRANT:
            return getQdrantVectorStore(COLLECTION_NAME);
        case VectorStoreType.MILVUS:
            return getMilvusVectorStore(COLLECTION_NAME);
        case VectorStoreType.LOCAL_STORAGE:
        case VectorStoreType.INMEMORY:
        default:
            return undefined;
    }
};
