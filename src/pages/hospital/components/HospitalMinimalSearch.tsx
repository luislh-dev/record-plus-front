import { Autocomplete, AutocompleteItem } from '@heroui/react';
import { useInfiniteScroll } from '@heroui/use-infinite-scroll';
import { type FC, useState } from 'react';
import { useHospitalGetByName } from '../hooks/useHospitalGetBy';

export const HospitalMinimalSearch: FC<{
  onHospitalSelected: (hospitalId: number) => void;
}> = ({ onHospitalSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { hospitals, isLoading, fetchNextPage, hasNextPage, setSearchTerm } =
    useHospitalGetByName();

  const [, scrollerRef] = useInfiniteScroll({
    hasMore: hasNextPage,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore: fetchNextPage,
  });

  return (
    <Autocomplete
      label='Hospital'
      items={hospitals}
      isLoading={isLoading}
      scrollRef={scrollerRef}
      onInputChange={setSearchTerm}
      onSelectionChange={(item) => onHospitalSelected(Number.parseInt(item as string))}
      variant='bordered'
      onOpenChange={setIsOpen}
    >
      {(item) => (
        <AutocompleteItem key={item.id} value={item.id}>
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};
