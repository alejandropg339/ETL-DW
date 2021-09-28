const cron = require("node-cron");
const { etlInserts } = require("./helper/etl-job");
const Server = require("./app");

//call job each hour
cron.schedule("0 0 */1 * * *", etlInserts);

//call job each two minutes
// cron.schedule('0 */2 * * * *', etlInserts);

const server = new Server();
server.listen();
