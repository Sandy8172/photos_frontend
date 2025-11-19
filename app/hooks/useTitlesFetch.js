// cusom hook to fetch the api ,handeling loading and error state and creating seperate hook will make code clean, efficiant and reusable--------------

"use client";

import { useCallback, useEffect, useState } from "react";

// const API_URL = "https://picsum.photos/v2/list?page=1&limit=100";
const API_URL = "https://jsonplaceholder.typicode.com/photos";

const useTitlesFetch = () => {
  // defining data state along with error and loading state ----------
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid API response formate");
      }
      setItems(data);
    } catch (error) {
      setError(error.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { items, loading, error };
};
export default useTitlesFetch;
