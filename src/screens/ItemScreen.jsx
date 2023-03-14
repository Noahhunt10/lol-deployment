import axios from "axios";
import { useEffect, useState } from "react";
import ItemModal from "../components/itemBuildComponents/ItemModal";
import { useNavigate } from "react-router-dom";
import classes from "./ItemScreen.module.css";
// import { BiSearchAlt2 } from "react-icons/bi";

const ItemScreen = () => {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalItem, setModalItem] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const clickHandler = (e) => {
    setModalItem(e);
    setModal(true);
  };
  useEffect(() => {
    axios
      .get("http://ddragon.leagueoflegends.com/cdn/13.3.1/data/en_US/item.json")
      .then((res) => {
        {
          const items = Object.values(res.data.data);
          const itemsArr = items.map((e) => {
            return e;
          });

          setItems(itemsArr);
        }
      });
  }, []);

  const itemDisp = items
    .filter((item) => {
      const names = item.name.toLowerCase();
      const searchParams = search.toLowerCase();
      return names.includes(searchParams);
    })
    .map((item) => {
      if (
        item.gold.purchasable &&
        !item.tags.includes("Jungle") &&
        (item.gold.total > 1500 || item.tags.includes("Boots"))
      ) {
        return (
          <div className={classes.item_card}>
            <h4>{item.name}</h4>
            <img
              alt=''
              src={`http://ddragon.leagueoflegends.com/cdn/13.3.1/img/item/${item.image.full}`}
              onClick={() => clickHandler(item)}
            />
          </div>
        );
      }
    });

  return (
    <>
      <div className={classes.search_button_div}>
        <div className={classes.search_div}>
          {/* <BiSearchAlt2 size="2em" color="#DA7635" /> */}
          <input
            className={classes.search}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Item"
          />
        </div>
        <button
          onClick={() => navigate("/items/new-build")}
          className={classes.create_build}
        >
          Create New Build
        </button>
      </div>
      <div className={classes.item_container}>{itemDisp}</div>
      {modal && (
        <ItemModal item={modalItem} onConfirm={() => setModal(!modal)} />
      )}
    </>
  );
};
export default ItemScreen;
