import { applyOllamaGlobals } from "../src/models/ollamaGlobalSettings";
import type { EngineResponse } from "llamaindex";
import { PapaCSVReader, VectorStoreIndex } from "llamaindex";
import { getStorageContext } from "../src/storage/storage";
import { printResponse } from "../src/responseUtils";

const main = async () => {
    applyOllamaGlobals();

    const reader = new PapaCSVReader(false);
    const docs = await reader.loadData("./demo/data/movie_reviews.csv");

    const storageContext = await getStorageContext();
    const index = await VectorStoreIndex.fromDocuments(docs, {
        storageContext
    });

    const retriever = await index.asRetriever({ similarityTopK: 20 });

    const queryEngine = await index.asQueryEngine({ retriever });

    const results: EngineResponse = await queryEngine.query({
        query: "What is the best reviewed movie?"
    });

    printResponse(results, true);
};

main().catch(console.error);
