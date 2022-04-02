import { TextEncoder, TextDecoder } from "node:util";
import fetch from "node-fetch";
import { DOMParser } from "@xmldom/xmldom";

if (!globalThis.TextEncoder) globalThis.TextEncoder = TextEncoder;
if (!globalThis.TextDecoder) globalThis.TextDecoder = TextDecoder;
if (!globalThis.fetch) globalThis.fetch = fetch;
globalThis.DOMParser = DOMParser;
