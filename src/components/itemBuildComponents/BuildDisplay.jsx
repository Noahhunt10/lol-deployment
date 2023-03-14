import React from "react";
import classes from "./BuildDisplay.module.css";

const BuildDisplay = ({ build, clickHandler }) => {
  return (
    <div className={classes.items}>
      {build.items.map((item, i) => {
        return (
          <img
            alt=''
            src={`http://ddragon.leagueoflegends.com/cdn/13.4.1/img/item/${item.item_object.image.full}`}
            key={i}
            onClick={() => clickHandler(item)}
          ></img>
        );
      })}
    </div>
  );
};

export default BuildDisplay;
