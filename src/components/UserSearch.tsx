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
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Buscar usuario..."
    />
  );
};
