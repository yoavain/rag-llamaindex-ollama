import { type QdrantVectorStore, VectorStoreIndex } from "llamaindex";
import { getQdrantVectorStore } from "../vectorDb/qdrant";

export const query = async () => {
    try {
        const vectorStore: QdrantVectorStore = getQdrantVectorStore();

        const index = await VectorStoreIndex.fromVectorStore(vectorStore);

        const retriever = await index.asRetriever({ similarityTopK: 20 });

        const queryEngine = await index.asQueryEngine({ retriever });

        const results = await queryEngine.query({
            query: "What is the best reviewed movie?"
        });

        console.log(results.message);
    }
    catch (e) {
        console.error(e);
    }
};
