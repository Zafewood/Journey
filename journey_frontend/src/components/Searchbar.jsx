import { useEffect } from 'react';
import { useState } from 'react';
import '../styles/Searchbar.css';

export default function Searchbar ({ handleSearch, handleSort }) { 
    const [searchValue, setSearchValue] = (""); 
    const [sortingBy, setSortingBy] = useState("Newest");
    
    useEffect(() => {
        handleSort(sortingBy);
      }, [handleSort])

    const searchbarHandler = (event) => {
        const searchText = event.target.value;
        handleSearch(searchText)
    }

    const sortingHandler = (event) => {
        const sortValue = event.target.value
        console.log(sortValue);
        setSortingBy(sortValue);
        handleSort(sortValue);
    }
    

    return (
        <div className="searchbarDiv">
            <input className="searchbar" type="text" placeholder="Search for your trips" value={searchValue} onChange={searchbarHandler}/>
            <button className="searchbutton" type="submit"> Search </button>
            <select className="filterdropdown" name="filter" id="filter" value={sortingBy} onChange={sortingHandler}>
                <option value="Newest">Newest first</option>
                <option value="Rating">Rating</option>
                <option value="Country">Country</option>
                <option value="Duration">Duration</option>
                <option value="Price">Price</option>
            </select>
        </div>
    )
}