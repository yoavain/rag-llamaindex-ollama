import fs from "node:fs/promises";
import type { EngineResponse } from "llamaindex";
import { Document, VectorStoreIndex } from "llamaindex";
import { applyOllamaGlobals } from "../../models/ollamaGlobalSettings";
import type { StorageContext } from "llamaindex/storage/StorageContext";
import { getStorageContext } from "../../storage/storage";
import { VectorStoreType } from "../vectorStoreFactory";
import { printResponse } from "../../responseUtils";

async function main() {
    applyOllamaGlobals();

    const path = "node_modules/llamaindex/examples/abramov.txt";
    const essay = await fs.readFile(path, "utf-8");

    const document = new Document({ text: essay, id_: path });

    const storageContext: StorageContext = await getStorageContext(VectorStoreType.QDRANT);

    const index = await VectorStoreIndex.fromDocuments([document], storageContext);

    const queryEngine = index.asQueryEngine();

    const response: EngineResponse = await queryEngine.query({
        query: "What did the author do in college?"
    });

    // Output response
    printResponse(response, true);
}

main().catch(console.error);