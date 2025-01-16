export interface PDFTextItem {
  transform: number[];
  fontSize?: number;
  fontName?: string;
  hasEOL?: boolean;
  str: string;
  dir: string;
  width: number;
  height: number;
}
