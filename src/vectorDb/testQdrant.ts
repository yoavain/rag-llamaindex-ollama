import fs from "node:fs/promises";
import { Document, VectorStoreIndex } from "llamaindex";
import { applyOllamaGlobals } from "../ollamaGlobalSettings";
import { getStorageContext } from "../store";
import type { StorageContext } from "llamaindex/storage/StorageContext";

async function main() {
    applyOllamaGlobals();

    const path = "node_modules/llamaindex/examples/abramov.txt";
    const essay = await fs.readFile(path, "utf-8");

    const document = new Document({ text: essay, id_: path });

    const storageContext: StorageContext = await getStorageContext();

    const index = await VectorStoreIndex.fromDocuments([document], storageContext);

    const queryEngine = index.asQueryEngine();

    const response = await queryEngine.query({
        query: "What did the author do in college?"
    });

    // Output response
    console.log(response.toString());
}

main().catch(console.error);