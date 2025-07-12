import { DropDownFilter } from '../DropDownFilter';
import { Header } from '../Header';
import { SearchInput } from '../Search';

export const TopContent = (totalElements: number) => (
  <div className='flex flex-col gap-y-3'>
    <Header totalAllergies={totalElements} />
    <search className='flex'>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='flex gap-x-4'>
          <SearchInput />
          <div className='flex items-center gap-x-2'>
            <DropDownFilter />
          </div>
        </div>
      </form>
    </search>
  </div>
);
