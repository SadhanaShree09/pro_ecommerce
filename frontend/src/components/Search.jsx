import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Search(){
    const [keyword,setKeyword]=useState("");
    const navigate=useNavigate();
    const searchHandler=()=>{
      const query = keyword.trim();
      navigate(query ? '/search?keyword='+encodeURIComponent(query) : '/');
    }
    return <form className="input-group" onSubmit={(event) => { event.preventDefault(); searchHandler(); }}>
    <input
      type="text"
      id="search_field"
      onChange={(e)=>setKeyword(e.target.value)}
      className="form-control"
      aria-label="Search products"
      placeholder="Search products..."/>
    <div className="input-group-append">
      <button type="submit" id="search_btn" className="btn" aria-label="Search">
        <i className="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
  </form>
}