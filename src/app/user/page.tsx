import CustomButton from "../components/Button";
import User from "./components/User";

export default function Profile() {
  return (
    <div>
      <h3>main page (user info)</h3>
      <User />
      <hr />
      <CustomButton title="home" routeLink="/" />
      <CustomButton title="edit profile" routeLink="/edit" />
      <CustomButton title="edit image" routeLink="/edit" />
    </div>
  );
}
