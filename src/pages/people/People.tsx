import { DropDownFilter } from './components/DropDownFilter';
import { HeaderList } from './components/HeaderList';
import { PeopleList } from './components/PeopleList';
import { Search } from './components/Search';

const People = () => {
  return (
    <section>
      <HeaderList />
      <nav className='flex gap-x-4 px-2 pb-2 pt-4'>
        <Search />
        <DropDownFilter />
      </nav>
      <PeopleList />
    </section>
  );
};

export default People;
