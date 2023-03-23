import { useEffect } from 'react';
import { useState } from 'react';
import '../styles/Searchbar.css';

export default function Searchbar ({ updateSearchValue, handleSort }) { 
    const [searchValue, setSearchValue] = useState(""); 
    const [sortValue, setSortValue] = useState("");
    
    useEffect(() => {
        setSortValue("Newest");
        updateSearchValue(searchValue);
      }, [])

    const searchbarHandler = (event) => {
        const searchText = event.target.value;
        setSearchValue(searchText)
    }

    const sortBtn = (event) => {
        const sorted = event.target.value;
        console.log("sort form searchbar: ", sorted);
        setSortValue(sorted);
        handleSort(sorted);
    }

    const searchBtnHandler = () => {
        handleSort(sortValue);
        updateSearchValue(searchValue);
    }
    

    return (
        <div className="searchbarDiv">
            <input className="searchbar" type="text" placeholder="Search for your trips" value={searchValue} onChange={searchbarHandler}/>
            <button className="searchbutton" type="submit" onClick={searchBtnHandler}> Search </button>
            <select className="filterdropdown" name="filter" id="filter" value={sortValue} onChange={sortBtn}>
                <option value="Newest">Sort by...</option>
                <option value="Rating">Rating</option>
                <option value="Country">Country</option>
                <option value="Duration (low to high)">Duration (low to high)</option>
                <option value="Price (low to high)">Price (low to high)</option>
            </select>
        </div>
    )
}