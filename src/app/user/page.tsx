import User from "./components/User";
import CustomButton from "./components/CustomButton";

export default function Profile() {
  return (
    <div>
      <User />
      <hr />
      <CustomButton title="edit profile" />
      <button>edit image</button>
    </div>
  );
}
