import { getMilvusClient } from "./milvus";
import { COLLECTION_NAME } from "../vectorStoreFactory";


const main = async () => {
    // 1. Set up a Milvus Client
    const client = getMilvusClient();

    // 2. Create a collection in quick setup mode
    const dropCollectionRes = await client.dropCollection({
        collection_name: COLLECTION_NAME
    });

    console.log(dropCollectionRes.error_code);
};

main().catch(console.error);
