import React from "react";
import classes from "./ItemModal.module.css";

const ItemModal = ({ item, onConfirm }) => {
  const reg = /<.*?>/gm;
  const description = item.description
    .replace(/<s.*<\/stats>/gm, "")
    .replace(/<.*?>/gm, "")
    .replace(reg, "")
    .replaceAll(".", ". ");
  const plainText = item.plaintext.replaceAll(".", ". ");
  const haste = item.description.match(
    /[0-9]*(?=<\/attention> Ability Haste)/gm
  );
  const magicPen = item.description.match(
    /[0-9]*%(?=<\/attention> Magic Penetration)/gm
  );
  const lethality = item.description.match(
    /[0-9]*(?=<\/attention> Lethality)/gm
  );
  const armorPen = item.description.match(
    /[0-9]*%(?=<\/attention> Armor Penetration)/gm
  );
  const healthRegen = item.description.match(
    /[0-9]*%(?=<\/attention> Base Health Regen)/gm
  );
  const manaRegen = item.description.match(
    /[0-9]*%(?=<\/attention> Base Mana Regen)/gm
  );
  const moveSpeed = item.description.match(
    /[0-9]*%(?=<\/attention> Move Speed)/gm
  );
  return (
    <>
      <div className={classes.backdrop} onClick={onConfirm} />
      <div className={classes.modal}>
        <h1>{item.name}</h1>
        <img
          alt=''
          src={`http://ddragon.leagueoflegends.com/cdn/13.3.1/img/item/${item.image.full}`}
        ></img>
        <p className={classes.gold}>{item.gold.total} Gold</p>
        {item.stats.FlatHPPoolMod && <p>{item.stats.FlatHPPoolMod} HP</p>}
        {item.stats.FlatMPPoolMod && <p>{item.stats.FlatMPPoolMod} Mana</p>}
        {item.stats.FlatMagicDamageMod && (
          <p>{item.stats.FlatMagicDamageMod} Ability Power</p>
        )}
        {item.stats.FlatMovementSpeedMod && (
          <p>{item.stats.FlatMovementSpeedMod} Move Speed</p>
        )}
        {item.stats.FlatSpellBlockMod && (
          <p>{item.stats.FlatSpellBlockMod} Magic Resist</p>
        )}
        {item.stats.FlatArmorMod && <p>{item.stats.FlatArmorMod} Armor</p>}
        {item.stats.FlatPhysicalDamageMod && (
          <p>{item.stats.FlatPhysicalDamageMod} Attack Damage</p>
        )}
        {item.stats.PercentAttackSpeedMod && (
          <p>{item.stats.PercentAttackSpeedMod * 100}% Attack Speed</p>
        )}
        {item.stats.FlatCritChanceMod && (
          <p>{item.stats.FlatCritChanceMod * 100}% Critical Stike Chance</p>
        )}
        {item.stats.PercentLifeStealMod && (
          <p>{item.stats.PercentLifeStealMod * 100}% Life Steal</p>
        )}
        {haste && <p>{haste} Ability Haste</p>}
        {magicPen && <p>{magicPen} Magic Penetration</p>}
        {lethality && <p>{lethality} Lethality</p>}
        {armorPen && <p>{armorPen} Armor Penetration</p>}
        {healthRegen && <p>{healthRegen} Base Health Regen</p>}
        {manaRegen && <p>{manaRegen} Base Mana Regen</p>}
        {moveSpeed && <p>{moveSpeed} Move Speed</p>}

        <h4 className={classes.plaintext}>{plainText}</h4>
        <h3>{description}</h3>
      </div>
    </>
  );
};

export default ItemModal;
