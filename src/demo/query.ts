import { MilvusVectorStore, VectorStoreIndex } from "llamaindex";
import { getMilvusClient } from "../vectorDb/milvus";

const collectionName = "movie_reviews";

export const query = async () => {
    try {
        const milvus = new MilvusVectorStore({ milvusClient: getMilvusClient(), collection: collectionName });

        const index = await VectorStoreIndex.fromVectorStore(milvus);

        const retriever = await index.asRetriever({ similarityTopK: 20 });

        const queryEngine = await index.asQueryEngine({ retriever });

        const results = await queryEngine.query({
            query: "What is the best reviewed movie?"
        });

        console.log(results.response);
    }
    catch (e) {
        console.error(e);
    }
};
