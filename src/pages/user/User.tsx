import { DropDownFilter } from "./components/DropDownFilter";
import { Search } from "./components/Search";
import { UserList } from "./components/UserList";

const User = () => {
  return (
    <>
      <nav className="flex gap-x-4 px-2 pb-2 pt-4">
        <Search />
        <DropDownFilter />
      </nav>
      <UserList />
    </>
  );
};

export default User;
