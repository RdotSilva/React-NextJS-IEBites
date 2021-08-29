import { useState, useEffect } from "react";
import { faSearch } from "react-icons/fa";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  return <div>Search Bar</div>;
}
