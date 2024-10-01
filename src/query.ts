// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import { VectorStoreIndex } from "llamaindex";
import { getStorageContext } from "./storage/store";
import { applyOllamaGlobals } from "./models/ollamaGlobalSettings";

applyOllamaGlobals();

const main = async () => {
    const storageContext = await getStorageContext();

    // Split text and create embeddings. Store them in a VectorStoreIndex
    const index: VectorStoreIndex = await VectorStoreIndex.fromVectorStores(storageContext.vectorStores);

    // Query the index
    const queryEngine = index.asQueryEngine();

    const response = await queryEngine.query({
        query: "What did the author do in college?"
    });

    // Output response
    console.log(response.toString());
};

main().catch(console.error);
