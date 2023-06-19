import User from "./components/User";
import CustomButton from "./components/CustomButton";
import EmailButton from "./components/EmailButton";

export default function Profile() {
  return (
    <div>
      <h3>main page (user info)</h3>
      <User />
      <hr />
      <CustomButton title="edit profile" />
      <CustomButton title="edit image" />
    </div>
  );
}
