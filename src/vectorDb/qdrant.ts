import { QdrantVectorStore } from "llamaindex";

const QDRANT_ADDRESS = "http://localhost:6333";


export const getQdrantVectorStore = (): QdrantVectorStore => {
    return new QdrantVectorStore({
        url: QDRANT_ADDRESS
    });
};
