const { kafka } = require("./client")
const readline = require("readline");

const r1 = readline.createInterface({
    input: process.stdin,
    output:process.stdout,  
});

async function init() {
    const producer = kafka.producer();
    console.log("Connecting Producers...");
    await producer.connect();
    console.log("Producers connected successfully..")

    r1.setPrompt("> ");
    r1.prompt();

    r1.on("line", async function(line) {
        const [riderName, location] = line.split(" ");
        await producer.send({
            topic: "rider-updates",
            messages: [
                {
                    partition: location.toLowerCase() === 'north' ? 0 : 1,
                    key: "location-update",
                    value: JSON.stringify({ name: riderName, location})
                }
            ]
        })
    }).on("close", async () => await producer.disconnect())

}
init();