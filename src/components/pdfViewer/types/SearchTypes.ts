import type { PDFTextItem } from './PDFTextItem';

export interface RawMatch {
  pageIndex: number;
  matchIndex: number;
  text: string;
  surroundingText: string;
  segment: {
    item: PDFTextItem;
    position: number;
  };
}

export interface SearchMatch {
  pageIndex: number;
  text: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  surroundingText: string;
  fontInfo?: {
    size: number;
    name: string;
  };
}
