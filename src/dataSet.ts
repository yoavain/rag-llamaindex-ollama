// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

import { glob, readFile } from "node:fs/promises";
import { Document } from "llamaindex";

const { DOCUMENTS } = process.env;

export const getDocuments = async (): Promise<Document[]> => {
    let documents: Document[] = [];
    for await (const entry of glob(DOCUMENTS + "/*.txt")) {
        console.log(`Reading ${entry}`);
        const lyrics = await readFile(entry, "utf-8");
        documents.push(new Document({ text: lyrics, id_: entry }));
    }
    return documents;
};
