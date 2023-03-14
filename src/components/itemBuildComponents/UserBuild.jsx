import React from "react";
import BuildDisplay from "./BuildDisplay";
import { useNavigate } from "react-router-dom";
import classes from "./UserBuild.module.css";

const UserBuild = ({ builds, deleteBuild, clickHandler }) => {
  const navigate = useNavigate();

  return (
    <>
      {builds.length > 0 ? (
        builds.map((build, i) => {
          return (
            <div key={i} className={classes.build}>
              <div className={classes.name_button_picture}>
                <img
                  alt=''
                  src={`http://ddragon.leagueoflegends.com/cdn/13.4.1/img/champion/${build.champion}.png`}
                ></img>
                <div className={classes.name_button}>
                  <h2>{build.buildName}</h2>
                  <button onClick={deleteBuild} id={build.id}>
                    Delete
                  </button>
                </div>
              </div>
              <BuildDisplay build={build} clickHandler={clickHandler} />
            </div>
          );
        })
      ) : (
        <div className={classes.no_builds}>
          <h2>No Builds Created Yet</h2>
          <button onClick={() => navigate("/items/new-build")}>
            Create a Build?
          </button>
        </div>
      )}
    </>
  );
};

export default UserBuild;
