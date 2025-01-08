import { DateValue, toCalendarDate } from '@internationalized/date';
import { DateRangePicker, RangeValue } from '@nextui-org/react';
import { useRecordDetailSearch } from '../hooks/useRecordDetailSearch';

export const DateRangeFilter = () => {
  const { setRangeDate } = useRecordDetailSearch();

  const handleDateChange = (newValue: RangeValue<DateValue> | null) => {
    if (!newValue?.start || !newValue?.end) {
      setRangeDate([null, null]);
      return;
    }

    const startDate = toCalendarDate(newValue.start);
    const endDate = toCalendarDate(newValue.end);

    setRangeDate([startDate, endDate]);
  };

  return (
    <div className="w-full">
      <DateRangePicker
        aria-label="Escoger rango de tiempo"
        variant="bordered"
        visibleMonths={2}
        onChange={handleDateChange}
      />
    </div>
  );
};
