import { load } from "./load";
import { query } from "./query";
import { applyOllamaGlobals } from "../ollamaGlobalSettings";

const main = async () => {
    applyOllamaGlobals();

    await load();
    await query();
};

main().catch(console.error);
