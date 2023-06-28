import User from "./components/User";
import LinkButton from "@/ui/Button/LinkButton";

export default function Profile() {
  return (
    <div>
      <h3>main page (user info)</h3>
      <User />
      <hr />
      <LinkButton text="home" routeLink="/" />
      <LinkButton text="edit profile" routeLink="/user/edit" />
      <LinkButton text="edit image" routeLink="/user/edit" />
    </div>
  );
}
