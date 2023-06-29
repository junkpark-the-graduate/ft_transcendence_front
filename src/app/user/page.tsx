import User from "./components/User";
import LinkButton from "@/ui/Button/LinkButton";

export default function Profile() {
  return (
    <div>
      <h3>main page (user info)</h3>
      <User />
      <hr />
      <LinkButton text="home" goTo="/" />
      <LinkButton text="edit profile" goTo="/user/edit" />
      <LinkButton text="edit image" goTo="/user/edit" />
    </div>
  );
}
