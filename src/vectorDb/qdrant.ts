import { QdrantVectorStore } from "llamaindex";

const QDRANT_ADDRESS = "http://localhost:6333";
const QDRANT_COLLECTION_NAME = "example_collection";


export const getQdrantVectorStore = (): QdrantVectorStore => {
    return new QdrantVectorStore({
        url: QDRANT_ADDRESS,
        collectionName: QDRANT_COLLECTION_NAME
    });
};
