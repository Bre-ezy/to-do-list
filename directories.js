import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const __rootDir = __dirname;
export const __publicDir = path.join(__dirname, "public");
export const __viewsDir = path.join(__dirname, "views");