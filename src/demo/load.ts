import type { QdrantVectorStore } from "llamaindex";
import { PapaCSVReader, storageContextFromDefaults, VectorStoreIndex } from "llamaindex";
import { getQdrantVectorStore } from "../vectorDb/qdrant";

export const load = async () => {
    try {
        const reader = new PapaCSVReader(false);
        const docs = await reader.loadData("./src/demo/data/movie_reviews.csv");

        const vectorStore: QdrantVectorStore = getQdrantVectorStore();

        const ctx = await storageContextFromDefaults({ vectorStore });
        const index = await VectorStoreIndex.fromDocuments(docs, {
            storageContext: ctx
        });
    }
    catch (e) {
        console.error(e);
    }
};
