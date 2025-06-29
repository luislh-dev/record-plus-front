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
