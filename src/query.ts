// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import { SAMPLE_QUERY } from "./data/dataSet";
import { getStorageContext } from "./storage/storage";
import type { NodeWithScore } from "llamaindex";
import { MetadataMode, VectorStoreIndex } from "llamaindex";
import { applyOllamaGlobals } from "./models/ollamaGlobalSettings";

applyOllamaGlobals();

export const query = async (externalIndex?: VectorStoreIndex) => {
    let index: VectorStoreIndex = externalIndex;
    if (!externalIndex) {
        const storageContext = await getStorageContext();
        index = await VectorStoreIndex.fromVectorStores(storageContext.vectorStores);
    }

    // Query the index
    const queryEngine = index.asQueryEngine();

    const { response, sourceNodes } = await queryEngine.query({
        query: SAMPLE_QUERY
    });

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
