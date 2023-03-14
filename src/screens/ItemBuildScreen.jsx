import axios from "axios";
import { useEffect, useState } from "react";
import ItemModal from "../components/itemBuildComponents/ItemModal";
import NewBuild from "../components/itemBuildComponents/NewBuild";
// import { BiSearchAlt2 } from "react-icons/bi";
import classes from "./ItemBuildScreen.module.css";

const ItemScreen = () => {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalItem, setModalItem] = useState("");
  const [addItem, setAddItem] = useState();
  const [sameItemHelper, setSameItemHelper] = useState(true);
  const [search, setSearch] = useState("");

  const clickHandler = (e) => {
    setModalItem(e);
    setModal(true);
  };
  const buttonHandler = (e) => {
    setAddItem(e);
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
            <h5>{item.name}</h5>
            <img
              alt=''
              src={`http://ddragon.leagueoflegends.com/cdn/13.3.1/img/item/${item.image.full}`}
              onClick={() => clickHandler(item)}
            />
            <button
              className={classes.add_button}
              onClick={() => {
                buttonHandler(item);
                setSameItemHelper(!sameItemHelper);
              }}
            >
              Add
            </button>
          </div>
        );
      }
    });

  return (
    <div className={classes.page}>
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
      <div className={classes.page_container}>
        <div className={classes.item_container}>{itemDisp}</div>

        <div className={classes.build_container}>
          <NewBuild
            item={addItem}
            sameItemHelper={sameItemHelper}
            className={classes.build}
          />
          {modal && (
            <ItemModal item={modalItem} onConfirm={() => setModal(!modal)} />
          )}
        </div>
      </div>
    </div>
  );
};
export default ItemScreen;
