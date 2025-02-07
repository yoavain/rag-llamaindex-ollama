import { HuggingFaceEmbedding, Ollama, Settings } from "llamaindex";


export const applyOllamaGlobals = () => {
    Settings.llm = new Ollama({
        model: "phi4:14b"
    });

    Settings.embedModel = new HuggingFaceEmbedding({
        modelType: "sentence-transformers/all-MiniLM-L6-v2"
    });
};
