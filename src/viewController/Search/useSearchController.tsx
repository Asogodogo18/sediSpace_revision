import React, { useEffect, useMemo, useState } from "react";

import debounce from "lodash.debounce";
import { useSearchUserMutation } from "../../Api/SearchApi";

const useUserSearchController = () => {
  const [
    searchUser,
    { isLoading, isSuccess, isError, data: userSearchResults, error },
  ] = useSearchUserMutation();

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (text) => {
    setSearchTerm(text);
  };

  const debouncedUserSearch = useMemo(() => {
    return debounce((query) => {
      if (query.length >2 ) searchUser(query);
    }, 500);
  }, []);

  useEffect(() => {
    debouncedUserSearch(searchTerm);
    return () => {
      debouncedUserSearch.cancel();
    };
  }, [searchTerm]);

  return {
    isLoading,
    searchTerm,
    handleChange,
    error,
    debouncedUserSearch,
    isSuccess,
    isError,
    userSearchResults,
  };
};

export default useUserSearchController;
