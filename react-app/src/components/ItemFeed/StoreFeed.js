import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getStoreFeed } from "../../store/items";
import ItemPreview from "./ItemPreview";

function StoreFeed({ items }) {
  const dispatch = useDispatch();

  // const items = Object.values(useSelector((state) => state.itemState));
  // const sessionUser = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     await dispatch(getStoreFeed());
  //     setLoaded(true);
  //   })();
  // }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <div className="store-feed-div">
      <div className="store-feed-preview-items">
        {loaded &&
          items?.map((item, i) => {
            return (
              <div key={i}>
                <NavLink
                  key={i}
                  to={`/items/${item.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <ItemPreview item={item} />
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default StoreFeed;
