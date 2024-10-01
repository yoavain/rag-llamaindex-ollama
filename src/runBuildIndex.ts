// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import { buildIndex } from "./buildIndex";

buildIndex().catch(console.error);
