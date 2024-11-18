import React, { useState } from "react";
import { useUserContext } from "@/contexts/user/UserContext";
import { Input } from "@nextui-org/react";

export const UserSearch = () => {
  const [query, setQuery] = useState("");
  const { setSearchQuery } = useUserContext();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <Input
      classNames={{
        base: "max-w-full sm:max-w-[15rem] h-10",
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Buscar usuario..."
    />
  );
};
