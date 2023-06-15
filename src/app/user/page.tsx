import User from "./components/User";
import CustomButton from "./components/CustomButton";
import Button from "@mui/material/Button";

export default function Profile() {
  return (
    <div>
      <User />
      <hr />
      <CustomButton title="edit profile" />
      {/*<Button>edit image</Button>*/}
    </div>
  );
}
