// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import { getStorageContext } from "./storage/storage";
import type { SongMetadata } from "./data/dataSet";
import { getDocuments } from "./data/dataSet";
import type { Document } from "llamaindex";
import { VectorStoreIndex } from "llamaindex";
import { applyOllamaGlobals } from "./models/ollamaGlobalSettings";
import type { StorageContext } from "llamaindex/storage/StorageContext";

applyOllamaGlobals();

export const buildIndex = async (): Promise<VectorStoreIndex> => {
    const documents: Document<SongMetadata>[] = await getDocuments();
    const storageContext: StorageContext = await getStorageContext();

    // Split text and create embeddings. Store them in a VectorStoreIndex
    return VectorStoreIndex.fromDocuments(documents, { storageContext });
};
