import { InputGroup, InputGroupInput } from "./ui/input-group";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

export function SearchBar({ searchQuery, setSearchQuery }: Props) {
  return (
    <InputGroup className="flex max-w-2xl">
      <InputGroupInput
        placeholder="🔍 Search short codes or long URLs..."
        className="text-2xl"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </InputGroup>
  );
}
