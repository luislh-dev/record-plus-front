import { Close } from '@/icons/Close';
import { DateValue, toCalendarDate } from '@internationalized/date';
import { DateRangePicker, RangeValue } from '@nextui-org/react';
import { useState } from 'react';
import { useRecordDetailSearch } from '../hooks/useRecordDetailSearch';

export const DateRangeFilter = () => {
  const { setRangeDate } = useRecordDetailSearch();
  const [value, setValue] = useState<RangeValue<DateValue> | null>(null);

  const handleDateChange = (newValue: RangeValue<DateValue> | null) => {
    setValue(newValue);

    if (!newValue?.start || !newValue?.end) {
      setRangeDate([null, null]);
      return;
    }

    const startDate = toCalendarDate(newValue.start);
    const endDate = toCalendarDate(newValue.end);

    setRangeDate([startDate, endDate]);
  };

  const handleClear = () => {
    setValue(null);
    setRangeDate([null, null]);
  };

  return (
    <div className="w-full">
      <DateRangePicker
        aria-label="Escoger un rango de tiempo para poder filtrar"
        variant="bordered"
        visibleMonths={2}
        selectorButtonPlacement="start"
        value={value}
        endContent={
          <div>
            {value && (
              <div className="hover:bg-[#EEEEEF] rounded-full cursor-pointer p-1">
                <Close
                  aria-label="Icono para limpiar el rango de fechas"
                  size={20}
                  fill="#A1A1AA"
                  onClick={handleClear}
                />
              </div>
            )}
          </div>
        }
        onChange={handleDateChange}
      />
    </div>
  );
};
