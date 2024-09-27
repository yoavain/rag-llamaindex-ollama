import { MilvusClient } from "@zilliz/milvus2-sdk-node";
import { milvus_address, milvus_collection_name } from "./consts";

/*
https://docs.llamaindex.ai/en/stable/examples/vector_stores/MilvusIndexDemo/
 */

// 1. Set up a Milvus Client
const milvusClient: MilvusClient = new MilvusClient({
    address: milvus_address,
    logLevel: "debug"
});

export const getMilvusClient = (): MilvusClient => {
    return milvusClient;
};

export const getMilvusCollection = () => {
    return milvus_collection_name;
};
