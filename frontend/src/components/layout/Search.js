import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ history }) => {
    const navigate = useNavigate();

    const[keyword, setKeyword] = useState('');
 
    const searchHandler = (e) => {
        e.preventDefault();

        if(keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/')
        }
      
    } 

  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          aria-describedby="search_btn"
          className="form-control"
          placeholder="Enter Product Name ..."
          name="keyword"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button id="search_btn" className="btn" type="submit">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </form>
  );
};

export default Search;
