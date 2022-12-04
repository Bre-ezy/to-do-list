import {database} from "./db/databse.js";
import {server} from "./www/server.js";

await database.initialize();
await server.initialize();
