import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";

const useStyles = makeStyles(() => ({
  photos: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    marginBottom: "20px",
  },
  imageList: {
    width: "100%",
    flexWrap: "nowrap",
  },
}));

/** Shows location photos
 * - Recieves list of photos from parent: LocationDetails
 */
function LocationPhotos({ photos }) {
  const classes = useStyles();

  return (
    <div className={classes.photos}>
      <ImageList rowHeight={250} className={classes.imageList} cols={3}>
        {photos.map((p) => (
          <ImageListItem key={p.id} cols={2}>
            <img key={p.id} src={p.images.original.url} alt={p.caption} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default LocationPhotos;
