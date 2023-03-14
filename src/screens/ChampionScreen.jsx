import axios from "axios";
import React, { useEffect, useState } from "react";
import ChampionCard from "../components/championComponents/ChampionCard";
import ChampionModal from "../components/championComponents/ChampionModal";
import classes from "./ChampionScreen.module.css";

const ChampionScreen = () => {
  const [champs, setChamps] = useState([]);
  const [modal, setModal] = useState();
  const [modalChamp, setModalChamp] = useState("");
  const [search, setSearch] = useState("");
  const clickHandler = (e) => {
    setModalChamp(e.target.id);
    setModal(true);
  };
  const getChamps = () => {
    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json`
      )
      .then((res) => {
        setChamps(res.data.data);
      });
  };
  useEffect(() => {
    getChamps();
  }, []);

  const championDisp = Object.values(champs).filter((champ) => {
    let names = champ.id.toLowerCase();
    let searchParams = search.toLowerCase();
    return names.includes(searchParams);
  });
  return (
    <>
      <div className={classes.search_div}>
        <input
          className={classes.search}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Champion"
        />
      </div>
      {modal && (
        <ChampionModal
          champName={modalChamp}
          onConfirm={() => setModal(!modal)}
        />
      )}
      <div>
        <ChampionCard champs={championDisp} onConfirm={clickHandler} />
      </div>
    </>
  );
};

export default ChampionScreen;
