import {
    MilvusVectorStore,
    PapaCSVReader,
    storageContextFromDefaults,
    VectorStoreIndex
} from "llamaindex";
import { getMilvusClient } from "../vectorDb/milvus";

const collectionName = "movie_reviews";

export const load = async () => {
    try {
        const reader = new PapaCSVReader(false);
        const docs = await reader.loadData("./src/demo/data/movie_reviews.csv");

        const vectorStore = new MilvusVectorStore({ milvusClient: getMilvusClient(), collection: collectionName });

        const ctx = await storageContextFromDefaults({ vectorStore });
        const index = await VectorStoreIndex.fromDocuments(docs, {
            storageContext: ctx
        });
    }
    catch (e) {
        console.error(e);
    }
};
