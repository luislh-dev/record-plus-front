import { DropDownFilter } from './components/DropDownFilter';
import { PeopleList } from './components/PeopleList';
import { Search } from './components/Search';

const People = () => {
  return (
    <section>
      <nav className="flex gap-x-4 px-2 pb-2 pt-4">
        <Search />
        <DropDownFilter />
      </nav>
      <PeopleList />
    </section>
  );
};

export default People;
