import React from "react";

/** Shows location photos
 * - Recieves list of photos from parent: LocationDetails
 */
function LocationPhotos({ photos }) {
  // const DEFAULT_IMG =
  // "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?auto=format&fit=crop&q=80&w=3474&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="">
      {photos.map((p) => (
        <img key={p.id} alt={p.caption} src={p.images.small.url} />
      ))}
    </div>
  );
}

export default LocationPhotos;
