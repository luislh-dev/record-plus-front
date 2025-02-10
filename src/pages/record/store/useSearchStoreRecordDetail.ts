import { dateUtils } from '@/utils/dateUtils';
import type { CalendarDate } from '@internationalized/date';
import { create } from 'zustand';
import type { RecordDetailRequestParams } from '../types/RecordDetailRequestParams';

interface SearchState {
  searchTerm: string;
  rangeDate: readonly [CalendarDate | null, CalendarDate | null];
  size: number;

  setRangeDate: (rangeDate: readonly [CalendarDate | null, CalendarDate | null]) => void;
  setSearchTerm: (searchTerm: string) => void;
  buildSearchParams: () => Omit<RecordDetailRequestParams, 'page'>;
}
export const useSearchStoreRecordDetail = create<SearchState>((set, get) => ({
  searchTerm: '',
  size: 4,
  rangeDate: [null, null],

  setRangeDate: rangeDate => set({ rangeDate }),
  setSearchTerm: term => set({ searchTerm: term }),

  buildSearchParams: () => {
    const { searchTerm, size, rangeDate } = get();

    const params: Omit<RecordDetailRequestParams, 'page'> = {
      size
    };

    if (searchTerm) {
      params.hospitalName = searchTerm;
    }

    if (rangeDate[0] && rangeDate[1]) {
      params.startDate = dateUtils.formatDateForAPI(rangeDate[0], false);
      params.endDate = dateUtils.formatDateForAPI(rangeDate[1], true);
    }

    return params;
  }
}));
