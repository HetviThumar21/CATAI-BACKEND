console.log("step 1");

import * as fs from "fs";

console.log("step 2");

const text = fs.readFileSync(
  "C:/Users/DELL/Desktop/MBAOS/ai/knowledgebase/mba/mbaosrequirements.txt",
  "utf8"
);

console.log("step 3");

console.log(text);