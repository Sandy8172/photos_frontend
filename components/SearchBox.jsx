// reusable serch component which which provides search value


"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const SearchBox = ({ onSearch }) => {
  const [value, setValue] = useState("");

  // search handler function to get the searched text and send it to homepage -----------

  const handleChange = (e) => {
    const text = e.target.value;
    setValue(text);
    onSearch(text);
  };

  return (
    <Input
      type="text"
      className="border border-gray-400 p-2 rounded-md w-40 sm:w-xs md:w-sm bg-gray-200"
      placeholder="Search title..."
      value={value}
      onChange={handleChange}
    />
  );
};

export default SearchBox;
