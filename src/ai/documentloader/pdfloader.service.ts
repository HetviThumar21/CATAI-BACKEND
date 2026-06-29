import * as fs from "fs";

export class PdfLoaderService {
  async loadPdf(filePath: string): Promise<string> {
    const dataBuffer = fs.readFileSync(filePath);

    return dataBuffer.toString();
  }
}