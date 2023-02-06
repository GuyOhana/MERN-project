import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
export default function SearchBar(props){
        const handleSubmit = (e) => e.preventDefault()
    
        const handleSearchChange = (e) => {
            if (!e.target.value) return props.setSearchResults(props.posts)
    
            const resultsArray = props.posts.filter(post => post.name.includes(e.target.value) || post.position.includes(e.target.value) || post.level.includes(e.target.value))
            props.setSearchResults(resultsArray)
        }
    
        return (
            <header>
                <form className="search" onSubmit={handleSubmit}>
                    <input
                        className="search__input"
                        placeholder="חפש..."
                        type="text"
                        id="search"
                        onChange={handleSearchChange}
                    />
                <button className="search__button">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                </form>
            </header>
        )
}
    