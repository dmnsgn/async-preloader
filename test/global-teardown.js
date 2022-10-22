import { promisify } from "util";
import { exec as execCb } from "child_process";
import { teardown as teardownPuppeteer } from "jest-environment-puppeteer";

const exec = promisify(execCb);

export default async function globalTeardown(globalConfig) {
  const { stdout, stderr } = await exec("npm run coverage");
  if (stderr) throw new Error(stderr);
  console.log(stdout);
  await teardownPuppeteer(globalConfig);
}
