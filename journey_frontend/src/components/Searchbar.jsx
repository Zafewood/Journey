export default function Searchbar () { 
    return (
        <div className="searchbarDiv">
            <h3> hallo </h3>
            <input className="searchbar" type="text" placeholder="Search for your trips" />
            <button type="submit" > Search </button>
            <select className="dropdown" name="filter" id="filter">
                <option value="rating">Rating</option>
                <option value="country">Country</option>
                <option value="duration">Duration</option>
                <option value="price">Price</option>
            </select>
        </div>
    )
}