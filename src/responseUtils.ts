import type { EngineResponse, NodeWithScore } from "llamaindex";
import { MetadataMode } from "llamaindex";

export const printResponse = (results: EngineResponse, printSources?: boolean) => {
    const { response, sourceNodes } = results;

    // Output response with sources
    console.log(response);

    if (printSources && sourceNodes) {
        sourceNodes.forEach((source: NodeWithScore, index: number) => {
            console.log(
                `\n${index}: Score: ${source.score} - ${source.node.getContent(MetadataMode.NONE).substring(0, 50)}...\n`
            );
        });
    }
};
