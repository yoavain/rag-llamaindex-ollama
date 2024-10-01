import { applyOllamaGlobals } from "../models/ollamaGlobalSettings";
import { PapaCSVReader, VectorStoreIndex } from "llamaindex";
import { getStorageContext } from "../storage/storage";

const main = async () => {
    applyOllamaGlobals();

    const reader = new PapaCSVReader(false);
    const docs = await reader.loadData("./src/demo/data/movie_reviews.csv");

    const storageContext = await getStorageContext();
    const index = await VectorStoreIndex.fromDocuments(docs, {
        storageContext
    });

    const retriever = await index.asRetriever({ similarityTopK: 20 });

    const queryEngine = await index.asQueryEngine({ retriever });

    const results = await queryEngine.query({
        query: "What is the best reviewed movie?"
    });

    console.log(results.message);
};

main().catch(console.error);
