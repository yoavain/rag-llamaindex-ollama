// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import { query } from "./query";

query().catch(console.error);
