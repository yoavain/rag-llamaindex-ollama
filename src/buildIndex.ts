// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

import { getDocuments } from "./dataSet";
import type { Document } from "llamaindex";
import { VectorStoreIndex } from "llamaindex";
import { getStorageContext } from "./store";
import { applyOllamaGlobals } from "./ollamaGlobalSettings";
import type { StorageContext } from "llamaindex/storage/StorageContext";

applyOllamaGlobals();

const main = async () => {
    const documents: Document[] = await getDocuments();
    const storageContext: StorageContext = await getStorageContext();

    // Split text and create embeddings. Store them in a VectorStoreIndex
    const index: VectorStoreIndex = await VectorStoreIndex.fromDocuments(documents, { storageContext });

    // todo - remove this

    // Query the index
    const queryEngine = index.asQueryEngine();

    const response = await queryEngine.query({
        query: "מה אני עושה למעני?"
    });

    // Output response
    console.log(response.toString());
};

main().catch(console.error);
