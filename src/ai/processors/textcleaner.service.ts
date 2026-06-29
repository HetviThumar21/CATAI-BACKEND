export class TextCleanerService {
  clean(text: string): string {
    return text
      .replace(/\r/g, " ")
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
}