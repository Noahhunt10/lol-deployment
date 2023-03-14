import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Authcontext from "../../store/authContext";
import { useNavigate } from "react-router-dom";
import classes from "./NewBuild.module.css";

const NewBuild = ({ item, sameItemHelper }) => {
  const [champs, setChamps] = useState([]);
  const [buildArr, setBuildArr] = useState([]);
  const [champion, setChampion] = useState();
  const [buildName, setName] = useState();

  const { userId, token } = useContext(Authcontext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json`
      )
      .then((res) => {
        setChamps(Object.keys(res.data.data));
      });
  }, []);

  useEffect(() => {
    if (item && buildArr.length < 6) {
      setBuildArr((prev) => [...prev, item]);
    }
    if (item && buildArr.length >= 6) {
      alert("Too many items, delete items to add more.");
    }
  }, [item, setBuildArr, sameItemHelper]);

  const handleClick = async () => {
    let buildId;
    await axios
      .post(
        "http://localhost:4545/api/build",
        { champion, userId, buildName },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        buildId = res.data.id;
      });
    addItems(buildId);
  };
  const addItems = (id) => {
    axios
      .post("http://localhost:4545/api/items", { buildArr, id })
      .then((res) => console.log("hi"));
  };
  const removeItem = (i) => {
    const filtArr = buildArr.filter((ele, index) => index !== i);

    setBuildArr(filtArr);
  };

  return (
    <div className={classes.build}>
      <TextField
        onChange={(e) => setName(e.target.value)}
        className={classes.name_input}
        placeholder="Build Name"
      ></TextField>
      <Autocomplete
        className={classes.auto_complete}
        disablePortal
        options={champs}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Champion" className={classes.label} />
        )}
        onInputChange={(e, newValue) => setChampion(newValue)}
      />
      <div className={classes.items}>
        <div className={classes.row_1}>
          {buildArr[0] ? (
            <div>
              <img
                alt=''
                src={`http://ddragon.leagueoflegends.com/cdn/13.3.1/img/item/${buildArr[0].image.full}`}
              />
              <button
                onClick={() => removeItem(0)}
                className={classes.remove_button}
              >
                X
              </button>
            </div>
          ) : (
            <div className={classes.blank_square}></div>
          )}
          {buildArr[1] ? (
            <div>
              <img
                alt=''
                src={`http://ddragon.leagueoflegends.com/cdn/13.3.1/img/item/${buildArr[1].image.full}`}
              />
              <button
                onClick={() => removeItem(1)}
                className={classes.remove_button}
              >
                X
              </button>
            </div>
          ) : (
            <div className={classes.blank_square}></div>
          )}
          {buildArr[2] ? (
            <div>
              <img
                alt=''
                src={`http://ddragon.leagueoflegends.com/cdn/13.3.1/img/item/${buildArr[2].image.full}`}
              />
              <button
                onClick={() => removeItem(2)}
                className={classes.remove_button}
              >
                X
              </button>
            </div>
          ) : (
            <div className={classes.blank_square}></div>
          )}
        </div>
        <div className={classes.row_2}>
          {buildArr[3] ? (
            <div>
              <img
                alt=''
                src={`http://ddragon.leagueoflegends.com/cdn/13.3.1/img/item/${buildArr[3].image.full}`}
              />
              <button
                onClick={() => removeItem(3)}
                className={classes.remove_button}
              >
                X
              </button>
            </div>
          ) : (
            <div className={classes.blank_square}></div>
          )}
          {buildArr[4] ? (
            <div>
              <img
                alt=''
                src={`http://ddragon.leagueoflegends.com/cdn/13.3.1/img/item/${buildArr[4].image.full}`}
              />
              <button
                onClick={() => removeItem(4)}
                className={classes.remove_button}
              >
                X
              </button>
            </div>
          ) : (
            <div className={classes.blank_square}></div>
          )}
          {buildArr[5] ? (
            <div>
              <img
                alt=''
                src={`http://ddragon.leagueoflegends.com/cdn/13.3.1/img/item/${buildArr[5].image.full}`}
              />
              <button
                onClick={() => removeItem(5)}
                className={classes.remove_button}
              >
                X
              </button>
            </div>
          ) : (
            <div className={classes.blank_square}></div>
          )}
        </div>
      </div>
      {buildArr.length === 6 && champion && buildName ? (
        <button
          className={classes.save_button}
          onClick={() => {
            handleClick();
            navigate("/items");
          }}
        >
          Save
        </button>
      ) : (
        <button disabled={true}></button>
      )}
    </div>
  );
};

export default NewBuild;
