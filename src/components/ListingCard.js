import React, { useState } from "react";

function ListingCard({ listing, removeListing, id }) {
  const [star, setStar] = useState(false);

  const handleStar = () => {
    setStar(!star)
  }

  function handleDelete() {
    fetch(`http://localhost:6001/listings/${id}`, {
      method: 'DELETE',
    })
      .then(resp => resp.json())
      .then(() => {
        removeListing(id)
    });
  }

  return (
    <li className="card">
      <div className="image">
        <span className="price">$0</span>
        <img src={listing.image} alt={listing.description} />
      </div>
      <div className="details">
        {star ? (
          <button onClick={handleStar} className="emoji-button favorite active">★</button>
        ) : (
          <button onClick={handleStar} className="emoji-button favorite">☆</button>
        )}
        <strong>{listing.description}</strong>
        <span> · {listing.location}</span>
        <button onClick={handleDelete} className="emoji-button delete">🗑</button>
      </div>
    </li>
  );
}

export default ListingCard;
