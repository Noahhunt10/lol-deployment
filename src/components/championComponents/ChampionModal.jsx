import classes from "./ChampionModal.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const ChampionModal = ({ champName, onConfirm }) => {
  const [skinNumber, setSkinNumber] = useState(0);
  const [skinArr, setSkinArr] = useState([]);
  const [screenState, setScreenState] = useState("");
  const [championData, setChampionData] = useState({});
  const [abilityDescription, setAbilityDescription] = useState();
  const [abilityName, setAbilityName] = useState();
  const [abilityKey, setAbilityKey] = useState("");
  const [activeAbility, SetActiveAbility] = useState();
  const ability = ["Q", "W", "E", "R"];

  const getChampInfo = () => {
    axios
      .get(
        `http://ddragon.leagueoflegends.com/cdn/13.3.1/data/en_US/champion/${champName}.json`
      )
      .then((res) => {
        const champ = res.data.data[champName];
        setSkinArr(champ.skins);
        setChampionData(champ);
        setAbilityDescription(champ.passive.description);
        setAbilityName(champ.passive.name);
        setAbilityKey("P");
        SetActiveAbility(champ.passive.name);
      });
  };
  useEffect(() => {
    getChampInfo();
  }, []);
  useEffect(() => {}, [championData]);

  const abilityDesc = (e) => {
    const aKey = e.target.getAttribute("ability-key");
    const description = e.target.id.replace(/<.*?>/gm, "").replace(":", ": ");
    setAbilityDescription(description);
    setAbilityName(e.target.name);
    setAbilityKey(aKey);
    SetActiveAbility(e.target.name);
  };

  return (
    <>
      <div className={classes.backdrop} onClick={onConfirm} />
      <div className={classes.buttons_modal_container}>
        <div
          className={classes.modal}
          style={{
            backgroundImage: `url(${`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_${skinArr[skinNumber]?.num}.jpg`})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        >
          {skinNumber === 0 ? (
            <h1 className={classes.champ_name}>{championData.name}</h1>
          ) : (
            <h1 className={classes.champ_name}>
              {championData.skins[skinNumber].name}
            </h1>
          )}
          {screenState === "Lore" && (
            <div className={classes.lore_backround}>
              <p>{championData.lore}</p>
            </div>
          )}
          {screenState === "Abilities" && (
            <div className={classes.ability_ability_description_container}>
              <div className={classes.ability_container}>
                {
                  <div className={classes.ability_img_container}>
                    <img
                      alt=''
                      src={`http://ddragon.leagueoflegends.com/cdn/13.3.1/img/passive/${championData.passive.image.full}`}
                      id={championData.passive.description}
                      name={championData.passive.name}
                      ability-key="P"
                      className={
                        activeAbility === championData.passive.name
                          ? classes.active_spell
                          : classes.spells
                      }
                      onClick={abilityDesc}
                    />
                  </div>
                }
                {championData.spells.map((ele, i) => {
                  return (
                    <div className={classes.ability_img_container}>
                      <img
                        alt=''
                        src={`http://ddragon.leagueoflegends.com/cdn/13.3.1/img/spell/${ele.image.full}`}
                        id={ele.description}
                        name={ele.name}
                        className={
                          activeAbility === ele.name
                            ? classes.active_spell
                            : classes.spells
                        }
                        ability-key={ability[i]}
                        onClick={abilityDesc}
                      />
                    </div>
                  );
                })}
              </div>
              <div className={classes.description_backround}>
                <h2>
                  {abilityKey} - {abilityName}
                </h2>
                <p>{abilityDescription}</p>
              </div>
            </div>
          )}
        </div>

        <ul className={classes.screen_buttons}>
          <li>
            <button
              onClick={() => {
                if (skinNumber > 0) {
                  setSkinNumber(skinNumber - 1);
                }
                if (skinNumber === 0) {
                  setSkinNumber(skinArr.length - 1);
                }
              }}
            >
              {"<"}
            </button>
          </li>
          <li>
            <button onClick={() => setScreenState("Lore")}>Lore</button>
          </li>
          <li>
            <button onClick={() => setScreenState("Abilities")}>
              Abilities
            </button>
          </li>
          <li>
            <button onClick={() => setScreenState("Hide")}>Hide</button>
          </li>
          <li>
            <button
              onClick={() => {
                if (skinNumber < skinArr.length - 1) {
                  setSkinNumber(skinNumber + 1);
                }
                if (skinNumber === skinArr.length - 1) {
                  setSkinNumber(0);
                }
              }}
            >
              {">"}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ChampionModal;
