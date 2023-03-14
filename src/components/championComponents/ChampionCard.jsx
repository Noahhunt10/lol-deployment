import classes from "./ChampionCard.module.css";
const ChampionCard = ({ champs, onConfirm }) => {
  const champsArr = champs.map((champ) => {
    return (
      <div className={classes.champion_card}>
        <h1>{champ.name}</h1>
        <h3>{champ.title}</h3>
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`}
          id={champ.id}
          onClick={onConfirm}
        ></img>
      </div>
    );
  });

  return <div className={classes.champ_container}>{champsArr}</div>;
};

export default ChampionCard;
