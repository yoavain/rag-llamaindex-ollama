import { HuggingFaceEmbedding, Ollama, Settings } from "llamaindex";


export const applyOllamaGlobals = () => {
    Settings.llm = new Ollama({
        model: "llama3.1:8b"
    });

    Settings.embedModel = new HuggingFaceEmbedding({
        modelType: "BAAI/bge-small-en-v1.5",
        quantized: false
    });
};
