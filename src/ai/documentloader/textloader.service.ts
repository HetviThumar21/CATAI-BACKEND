import * as fs from "fs";

export class TextLoaderService {
  loadText(filepath: string): string {
    return fs.readFileSync(filepath, "utf8");
  }
}