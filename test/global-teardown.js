import { promisify } from "util";
import { exec as execCb } from "child_process";
import teardownPuppeteer from "jest-environment-puppeteer/teardown";

const exec = promisify(execCb);

export default async function globalTeardown(globalConfig) {
  const { stdout, stderr } = await exec("npm run coverage");
  if (stderr) throw new Error(stderr);
  console.log(stdout);
  await teardownPuppeteer(globalConfig);
}
