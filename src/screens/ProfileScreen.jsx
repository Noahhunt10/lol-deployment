import { useContext, useEffect, useState } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";
import UserBuild from "../components/itemBuildComponents/UserBuild";
import classes from "./ProfileScreen.module.css";
import ItemModal from "../components/itemBuildComponents/ItemModal";

const ProfileScreen = () => {
  const { userId } = useContext(AuthContext);
  const [username, setUsername] = useState();
  const [builds, setBuilds] = useState([]);
  const [modalItem, setModalItem] = useState("");
  const [modal, setModal] = useState(false);
  const clickHandler = (e) => {
    setModalItem(e.item_object);
    setModal(true);
  };
  useEffect(() => {
    getUserData();
  }, [username]);

  const getUserData = () => {
    axios.get(`http://localhost:4545/api/username/${userId}`).then((res) => {
      setUsername(res.data.user[0].username);
      setBuilds(res.data.userBuilds);
    });
  };
  const deleteBuild = async (e) => {
    const buildId = e.target.id;
    await axios.delete(`http://localhost:4545/api/delete/${buildId}`);
    getUserData();
  };

  return (
    <div>
      <div className={classes.username_div}>
        <h1 className={classes.username}>{username}'s Builds</h1>
      </div>
      <div className={classes.builds}>
        <UserBuild
          builds={builds}
          deleteBuild={deleteBuild}
          clickHandler={clickHandler}
        />
        {modal && (
          <ItemModal item={modalItem} onConfirm={() => setModal(!modal)} />
        )}
      </div>
    </div>
  );
};
export default ProfileScreen;
export const UserContext = () => {};
