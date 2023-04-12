import React, { useState } from "react";
import "./SearchTopic.css";
import { HashLink as Link } from 'react-router-hash-link';
export const SearchTopic = ({ placeholder, data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setSearchWord(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const handleButtonClick = () => {
    const searchInput = document.querySelector(".form-control");
    const searchWord = searchInput.value;
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilteredData(searchWord === "" ? [] : newFilter);
    if (filteredData.length > 0) {
      const link = filteredData[0].link;
      window.location.href = link;
    }
  };

  return (
    <div className="container">
      <div className="search-box">
        <input
          type="search"
          className="form-control"
          value={searchWord}
          placeholder={placeholder}
          onChange={handleFilter}
        />
        <button
          className="btn btn-primary rounded-pill"
          onClick={handleButtonClick}
        >
          {" "}
          <i className="fa fa-search"> </i> Search{" "}
        </button>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <Link className="dataItem" to={value.link}>
                {value.title}
              </Link>
            );
          })}
        </div>
      )}
      {filteredData.length === 0 && searchWord !== "" && (
        <div className="notFound">
          No results found for "{searchWord}"
        </div>
      )}
    </div>
  );
};
