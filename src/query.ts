// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import { printResponse } from "./responseUtils";
import { SAMPLE_QUERY } from "./data/dataSet";
import { getStorageContext } from "./storage/storage";
import { type EngineResponse, VectorStoreIndex } from "llamaindex";
import { applyOllamaGlobals } from "./models/ollamaGlobalSettings";

applyOllamaGlobals();

export const query = async (externalIndex?: VectorStoreIndex) => {
    let index: VectorStoreIndex = externalIndex;
    if (!externalIndex) {
        const storageContext = await getStorageContext();
        index = await VectorStoreIndex.fromDocuments([], { storageContext });
    }

    // Query the index
    const queryEngine = index.asQueryEngine();

    const results: EngineResponse = await queryEngine.query({
        query: SAMPLE_QUERY
    });

    // Output response with sources
    printResponse(results, true);
};
