import { getMilvusClient } from "./milvus";


const main = async () => {
    // 1. Client
    const client = getMilvusClient();

    // 2. Create a collection in quick setup mode
    await client.createCollection({
        collection_name: "quick_setup",
        dimension: 5,
        metric_type: "IP"
    });

    // 3. Insert randomly generated vectors
    const colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"];
    const data = [];

    for (let i = 0; i < 1000; i++) {
        const current_color = colors[Math.floor(Math.random() * colors.length)];
        data.push({
            id: i,
            vector: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
            color: current_color,
            color_tag: `${current_color}_${Math.floor(Math.random() * 8999) + 1000}`
        });
    }

    let res = await client.insert({
        collection_name: "quick_setup",
        data: data
    });

    console.log(res.insert_cnt);

    await client.createPartition({
        collection_name: "quick_setup",
        partition_name: "red"
    });

    await client.createPartition({
        collection_name: "quick_setup",
        partition_name: "blue"
    });

    // 4. Single vector search
    const query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592];

    const searchRes = await client.search({
        collection_name: "quick_setup",
        data: [query_vector],
        limit: 3 // The number of results to return
    });

    console.log(searchRes.results);

    // 5. Batch vector search
    let query_vectors = [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],
        [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]
    ];

    const batchRes = await client.search({
        collection_name: "quick_setup",
        data: query_vectors,
        limit: 2
    });

    console.log(batchRes.results);

    // 6.1 Insert data into partitions
    let red_data = [];
    let blue_data = [];

    for (let i = 1000; i < 1500; i++) {
        red_data.push({
            id: i,
            vector: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
            color: "red",
            color_tag: `red_${Math.floor(Math.random() * 8999) + 1000}`
        });
    }

    for (let i = 1500; i < 2000; i++) {
        blue_data.push({
            id: i,
            vector: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
            color: "blue",
            color_tag: `blue_${Math.floor(Math.random() * 8999) + 1000}`
        });
    }

    res = await client.insert({
        collection_name: "quick_setup",
        data: red_data,
        partition_name: "red"
    });

    console.log(res.insert_cnt);

    res = await client.insert({
        collection_name: "quick_setup",
        data: blue_data,
        partition_name: "blue"
    });

    console.log(res.insert_cnt);


    // 6.2 Search within partitions
    const query_vector2 = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592];

    let res2 = await client.search({
        collection_name: "quick_setup",
        data: [query_vector2],
        partition_names: ["red"],
        limit: 5
    });

    console.log(res2.results);

    res2 = await client.search({
        collection_name: "quick_setup",
        data: [query_vector2],
        partition_names: ["blue"],
        limit: 5
    });

    console.log(res2.results);


    // 7. Search with output fields
    const query_vector3 = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592];

    const res3 = await client.search({
        collection_name: "quick_setup",
        data: [query_vector3],
        limit: 5,
        output_fields: ["color"]
    });

    console.log(res3.results);

    // 8. Filtered search
    // 8.1 Filter with "like" operator and prefix wildcard
    const query_vector4 = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592];

    const res4 = await client.search({
        collection_name: "quick_setup",
        data: [query_vector4],
        limit: 5,
        filters: "color_tag like \"red%\"",
        output_fields: ["color_tag"]
    });

    console.log(res4.results);

    // 9. Range search
    const query_vector5 = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592];

    const res5 = await client.search({
        collection_name: "quick_setup",
        data: [query_vector5],
        limit: 5,
        params: {
            radius: 0.1,
            range: 1.0
        },
        output_fields: ["color_tag"]
    });

    console.log(res5.results);
};


main().catch(console.error);

