import { SearchMatch } from './SearchTypes';

export interface SearchResult {
  pageIndex: number;
  text: string;
  matches: SearchMatch[];
}
