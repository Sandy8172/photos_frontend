// Home page to show the list of images and added other funtion like search box logout button and user name

"use client";

import { useEffect, useState, useMemo } from "react";
import SearchBox from "@/components/SearchBox";
import TitleList from "@/components/TitleList";
import { logout } from "../../utils/auth";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import useTitlesFetch from "@/app/hooks/useTitlesFetch";
import { Button } from "@/components/ui/button";
import { getUsernameFromToken } from "../../utils/auth";

const HomePage = () => {
  const { items, loading, error } = useTitlesFetch();
  const [filtered, setFiltered] = useState([]); // filtered by search
  const [currentPage, setCurrentPage] = useState(1);
  const [loggedInUser, setLoggedInUser] = useState("");

  // getting username to show on navbar -------------
  useEffect(() => {
    const username = getUsernameFromToken(); // safe on client
    setLoggedInUser(username.toUpperCase());
  }, []);

  // items per page for pagination --------
  const itemsPerPage = 32;

  // initially setting items to filtered state ----------
  useEffect(() => {
    setFiltered(items);
  }, [items]);

  // filtering the searched items using there title and updaing it to filtered state ----------

  const handleSearch = (querry) => {
    const matchingText = querry.toLowerCase();
    const filteredData = items.filter((item) =>
      item?.title.toLowerCase().includes(matchingText)
    );
    setFiltered(filteredData);
    setCurrentPage(1);
  };

  //  counting total pages to show on ui-----

  const totalPages = useMemo(() => {
    return Math.ceil(filtered.length / itemsPerPage);
  }, [filtered]);

  // extracting paginated items from start index to end intex to show on single page -----------

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filtered.slice(start, end);
  }, [filtered, currentPage]);

  // generating page number array to show bottom of the page and for page navigation -----------

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      // If pages are small, show all
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // Always show first page
    pages.push(1);

    // Show left ellipsis
    if (currentPage > 4) {
      pages.push("...");
    }

    // Middle pages
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Show right ellipsis
    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  const pageNumbersList = generatePageNumbers();

  // handling privious and next page click buttons and updating the state -------------

  const previousPageClickHandle = (e) => {
    e.preventDefault();
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const nextPageClickHandle = (e) => {
    e.preventDefault();
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div>
      <nav className="flex justify-between items-center px-2 py-3 bg-gray-300">
        <h3 className="">
          Welcome, <span className="font-semibold"> {loggedInUser}</span>{" "}
        </h3>
        <SearchBox onSearch={handleSearch} />
        <Button
          onClick={logout}
          variant={"outline"}
          className="border-red-500 bg-red-600 text-white px-1 sm:px-3"
        >
          Logout
        </Button>
      </nav>
      {/* Loading */}
      {loading && (
        <p className="text-center mt-5 text-green-600 font-bold">
          Loading...
        </p>
      )}
      {/* Error */}
      {error && (
        <p className="text-center mt-5 text-red-500 font-bold">
          {error}
        </p>
      )}
      {/* List */}
      {!loading && !error && <TitleList items={paginatedItems} />}
      {!loading && !error && totalPages > 1 && (
        <div className="flex items-center">
          <Pagination className="mt-3">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => previousPageClickHandle(e)}
                />
              </PaginationItem>

              {pageNumbersList.map((num, ind) => {
                return (
                  <PaginationItem key={ind}>
                    <PaginationLink
                      onClick={(e) => {
                        e.preventDefault();
                        if (num === "...") return;
                        setCurrentPage(num);
                      }}
                      isActive={num === currentPage}
                    >
                      {num}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext onClick={(e) => nextPageClickHandle(e)} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <p className="font-semibold text-sm">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filtered.length)} of{" "}
            {filtered.length} items
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
