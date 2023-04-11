import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import Form from "./Form";
const API = "http://localhost:6001/listings"


function ListingsContainer({ search }) {
  const [listings, setListings] = useState([]);
  const [sortBy, setSortBy] = useState("id");

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(setListings);
  }, []);

  function removeListing(id){
    setListings(listings.filter((listing) => listing.id !== id))
  };

  function addListing(newListing) {
    const newListingsArray = [newListing, ...listings];
    setListings(newListingsArray);
  }

  const listingElements = listings
  .filter((listing) => listing.description.toLowerCase().includes(search.toLowerCase()))
  .sort((listingA, listingB) => {
    if(sortBy === "id") {
      return listingA.id - listingB.id
    } else { 
      return listingA.location.localeCompare(listingB.location)
    }
  })
  .map((listing) => (
    <ListingCard key={listing.id} listing={listing} id={listing.id} removeListing={removeListing} />
  ));

  return (
    <main>
      <Form addListing={addListing} />
      <button onClick={() => setSortBy("id")}>Sort by Default</button>
      <button onClick={() => setSortBy("location")}>Sort by Location</button>
      <ul className="cards">{listingElements}</ul>
    </main>
  );
}

export default ListingsContainer;
