import "@testing-library/jest-dom";
import { loadEnvConfig } from "@next/env";
import fetch, { Request, Response } from "node-fetch";
import {
  ReadableStream,
  TransformStream,
  WritableStream,
} from "web-streams-polyfill";
import { TextEncoder, TextDecoder } from "util";

loadEnvConfig(process.cwd());

global.fetch = fetch;
global.Request = Request;
global.Response = Response;
global.ReadableStream = ReadableStream;
global.TransformStream = TransformStream;
global.WritableStream = WritableStream;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
