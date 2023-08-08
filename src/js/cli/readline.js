import os from "os";
import fs from "fs";
import { join } from "path";
import ffi from "ffi-napi";
import { readUTF8, writeUTF8 } from "../shared/io.js";

const rllib = ffi.Library("libreadline", {
  readline: ["string", ["string"]],
  add_history: ["int", ["string"]],
});

const HISTORY_FILE = join(os.homedir(), ".arith-history");
let historyLoaded = false;

export const readline = (prompt = ">") => {
  if (!historyLoaded) {
    let lines = [];

    if (fs.existsSync(HISTORY_FILE)) {
      lines = readUTF8(HISTORY_FILE)
        .split(os.EOL)
        .filter((line) => line !== "");
    }

    lines = lines.slice(Math.max(lines.length - 2000, 0));

    for (let line of lines) {
      rllib.add_history(line);
    }
  }

  const line = rllib.readline(prompt);

  if (line) {
    rllib.add_history(line);

    try {
      writeUTF8(HISTORY_FILE, line + os.EOL);
    } catch (e) {
      // nothing to do
    }
  }

  return line;
};
