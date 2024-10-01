// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import { getStorageContext } from "./storage/storage";
import type { SongMetadata } from "./data/dataSet";
import { getDocuments, SAMPLE_QUERY } from "./data/dataSet";
import type { Document, NodeWithScore } from "llamaindex";
import { MetadataMode, VectorStoreIndex } from "llamaindex";
import { applyOllamaGlobals } from "./models/ollamaGlobalSettings";
import type { StorageContext } from "llamaindex/storage/StorageContext";

applyOllamaGlobals();

const main = async () => {
    const documents: Document<SongMetadata>[] = await getDocuments();
    const storageContext: StorageContext = await getStorageContext();

    // Split text and create embeddings. Store them in a VectorStoreIndex
    const index: VectorStoreIndex = await VectorStoreIndex.fromDocuments(documents, { storageContext });

    // todo - remove this
    const retriever = await index.asRetriever({ similarityTopK: 20 });

    // Query the index
    const queryEngine = index.asQueryEngine({ retriever });

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
