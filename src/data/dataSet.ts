// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import path from "node:path";
import { glob, readFile } from "node:fs/promises";
import { Document } from "llamaindex";

const { DOCUMENTS } = process.env;

export type SongMetadata = { name: string };

export const getDocuments = async (): Promise<Document<SongMetadata>[]> => {
    let documents: Document<SongMetadata>[] = [];
    for await (const entry of glob(DOCUMENTS + "/*.txt")) {
        console.log(`Reading ${entry}`);
        const lyrics = await readFile(entry, "utf-8");
        const name = path.basename(entry, ".txt");
        const document = new Document<SongMetadata>({ text: lyrics, id_: entry, metadata: { name } });
        documents.push(document);
    }
    return documents;
};

export const SAMPLE_QUERY = "מה העלילה בשיר דני?";
