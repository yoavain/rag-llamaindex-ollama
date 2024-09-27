import { getMilvusClient } from "./milvus";
import { milvus_collection_name } from "./consts";


const main = async () => {
    // 1. Set up a Milvus Client
    const client = getMilvusClient();

    // 2. Create a collection in quick setup mode
    const dropCollectionRes = await client.dropCollection({
        collection_name: milvus_collection_name
    });

    console.log(dropCollectionRes.error_code);
};

main().catch(console.error);
