import { Search } from "./components/Search";
import { UserList } from "./components/UserList";

const User = () => {
  return (
    <>
      <nav>
        <Search />
      </nav>
      <UserList />
    </>
  );
};

export default User;
