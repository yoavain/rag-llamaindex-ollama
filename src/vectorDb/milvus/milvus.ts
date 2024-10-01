import { MilvusClient } from "@zilliz/milvus2-sdk-node";
import { MilvusVectorStore } from "llamaindex";

/*
https://docs.llamaindex.ai/en/stable/examples/vector_stores/MilvusIndexDemo/
 */

export const milvus_address = "http://localhost:19530";
export const milvus_db_name = "milvus";

// 1. Set up a Milvus Client
let milvusClient: MilvusClient;
export const getMilvusClient = (): MilvusClient => {
    if (!milvusClient) {
        milvusClient = new MilvusClient({
            address: milvus_address,
            logLevel: "debug"
        });
    }
    return milvusClient;
};

export const getMilvusVectorStore = (collectionName: string): MilvusVectorStore => {
    return new MilvusVectorStore({
        milvusClient: getMilvusClient(),
        collection: collectionName
    });
};
