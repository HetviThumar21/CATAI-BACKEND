export class TextSplitterService {
  split(
    text: string,
    chunksize = 500
  ): string[] {
    const chunks: string[] = [];

    for (
      let i = 0;
      i < text.length;
      i += chunksize
    ) {
      chunks.push(
        text.slice(i, i + chunksize)
      );
    }

    return chunks;
  }
}