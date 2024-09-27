import fs from "node:fs/promises";
import { Document, VectorStoreIndex } from "llamaindex";
import { getStorageContext } from "./store";
import { applyOllamaGlobals } from "./ollamaGlobalSettings";
import type { StorageContext } from "llamaindex/storage/StorageContext";

applyOllamaGlobals();

const main = async () => {
    // Load essay from abramov.txt in Node
    const path = "node_modules/llamaindex/examples/abramov.txt";

    const essay = await fs.readFile(path, "utf-8");

    // Create Document object with essay
    const document = new Document({ text: essay, id_: path, metadata: { name: path } });

    const storageContext: StorageContext = await getStorageContext();

    // Split text and create embeddings. Store them in a VectorStoreIndex
    const index: VectorStoreIndex = await VectorStoreIndex.fromDocuments([document], { storageContext });

    // todo - remove this

    // Query the index
    const queryEngine = index.asQueryEngine();

    const response = await queryEngine.query({
        query: "What did the author do in college?"
    });

    // Output response
    console.log(response.toString());
};

main().catch(console.error);
