const {kafka}  = require("./client");

async function init() {
    const admin = kafka.admin();
    console.log("Admin Connecting..")
    admin.connect();
    console.log("Admin Connected Successfully");

    console.log("Creating topics..")
    await admin.createTopics({
        topics: [
            {
                topic: "rider-updates",
                numPartitions: 2
            }
        ]
    });
    console.log("Topic created [rider.updates");
    await admin.disconnect();
    console.log("Admin Disconnected");
}
init();