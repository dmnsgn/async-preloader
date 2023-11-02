import { promisify } from "util";
import { exec as execCb } from "child_process";
import setupPuppeteer from "jest-environment-puppeteer/setup";

const exec = promisify(execCb);

export default async function globalSetup(globalConfig) {
  const { stdout, stderr } = await exec("npm run coverage");
  if (stderr) throw new Error(stderr);
  console.log(stdout);
  await setupPuppeteer(globalConfig);
}
