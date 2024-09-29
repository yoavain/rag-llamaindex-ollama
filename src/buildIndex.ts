// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import type { SongMetadata } from "./dataSet";
import { SAMPLE_QUERY, getDocuments } from "./dataSet";
import type { Document, NodeWithScore } from "llamaindex";
import { MetadataMode, VectorStoreIndex } from "llamaindex";
import { getStorageContext } from "./store";
import { applyOllamaGlobals } from "./ollamaGlobalSettings";
import type { StorageContext } from "llamaindex/storage/StorageContext";

applyOllamaGlobals();

const main = async () => {
    const documents: Document<SongMetadata>[] = await getDocuments();
    const storageContext: StorageContext = await getStorageContext();

    // Split text and create embeddings. Store them in a VectorStoreIndex
    const index: VectorStoreIndex = await VectorStoreIndex.fromDocuments(documents, { storageContext });

    // todo - remove this

    // Query the index
    const queryEngine = index.asQueryEngine();

    const { response, sourceNodes } = await queryEngine.query({
        query: SAMPLE_QUERY
    });

    // Output response
    // Output response with sources
    console.log(response);

    if (sourceNodes) {
        sourceNodes.forEach((source: NodeWithScore, index: number) => {
            console.log(
                `\n${index}: Score: ${source.score} - ${source.node.getContent(MetadataMode.NONE).substring(0, 50)}...\n`
            );
        });
    }
};

main().catch(console.error);
