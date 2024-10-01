// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import { buildIndex } from "./buildIndex";
import { query } from "./query";

const runInMemory = async () => {
    const index = await buildIndex();
    await query(index);
};

runInMemory().catch(console.error);
