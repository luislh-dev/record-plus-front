import { DropDownFilter } from './components/DropDownFilter';
import { Header } from './components/Header';
import { Search } from './components/Search';
import { UserList } from './components/UserList';

const User = () => {
  return (
    <>
      <section>
        <Header />
        <nav className='flex gap-x-4 px-2 pb-2 pt-4'>
          <Search />
          <DropDownFilter />
        </nav>
        <UserList />
      </section>
    </>
  );
};

export default User;
