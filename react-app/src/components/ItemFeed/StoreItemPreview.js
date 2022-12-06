import React from "react";

function ItemPreview({ item }) {
  return (
    <div className="item-preview-container">
      <div
        className="item-img-preview-container"
        style={{ backgroundImage: `url('${item?.image_url}')` }}
      ></div>
            <p className="item-name-preview-text">{item?.name}</p>
            <p className="item-price-preview-container">${item?.price}</p>
    </div>
  );
}

export default ItemPreview;
