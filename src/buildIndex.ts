// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import { glob, readFile } from "node:fs/promises";
import { Document, VectorStoreIndex } from "llamaindex";
import { getStorageContext } from "./store";
import { applyOllamaGlobals } from "./ollamaGlobalSettings";
import type { StorageContext } from "llamaindex/storage/StorageContext";

applyOllamaGlobals();

const { DOCUMENTS } = process.env;

const main = async () => {

    let documents: Document[] = [];
    for await (const entry of glob(DOCUMENTS + "/*.txt")) {
        console.log(`Reading ${entry}`);
        const lyrics = await readFile(entry, "utf-8");
        documents.push(new Document({ text: lyrics, id_: entry }));
    }

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
