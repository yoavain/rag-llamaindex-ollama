import { getMilvusClient, milvus_db_name } from "./milvus";
import type { MilvusClient } from "@zilliz/milvus2-sdk-node";


const main = async () => {
    // 1. Set up a Milvus Client
    const client: MilvusClient = getMilvusClient();

    // 3. Create a database
    const res = await client.createDatabase({
        db_name: milvus_db_name
    });

    console.log(res);

};

main().catch(console.error);
