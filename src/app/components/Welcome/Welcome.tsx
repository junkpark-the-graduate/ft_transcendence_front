import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";

interface FormBoxProps {
  className?: any;
}

const Welcome: any = styled("div")(({ theme }: any) => ({
  backgroundColor: `rgba(36, 55, 102, 1)`,
  border: `7px solid rgba(112, 133, 249, 1)`,
  boxSizing: `border-box`,
  borderRadius: `20px`,
  display: `flex`,

  position: `relative`,
  isolation: `isolate`,
  flexDirection: `row`,
  width: "580px",
  height: `271px`,

  margin: `50px auto`,

  justifyContent: `center`,
  alignItems: `flex-start`,
  padding: `0px`,
}));

const Title: any = styled("div")({
  textAlign: `center`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(239, 239, 239, 1)`,
  fontStyle: `normal`,
  fontFamily: `Futura`,
  fontWeight: `700`,
  fontSize: `30px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  textTransform: `none`,
  position: `absolute`,
  left: `86px`,
  top: `20px`,
});

const Line1: any = styled("div")({
  backgroundColor: `rgba(239, 239, 239, 1)`,
  border: `1.1778291463851929px solid rgba(239, 239, 239, 1)`,
  width: `494.69px`,
  height: `0px`,
  position: `absolute`,
  left: `30px`,
  top: `83px`,
});

const LoremIpsumDolorSitAm: any = styled("div")({
  textAlign: `center`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(239, 239, 239, 1)`,
  fontStyle: `normal`,
  fontFamily: `Outfit`,
  fontWeight: `400`,
  fontSize: `16px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  textTransform: `none`,
  width: `431px`,
  height: `69px`,
  position: `absolute`,
  left: `61px`,
  top: `101px`,

  display: "flex",
  alignItems: "center",
  lineHeight: "1.8",
});

const Button1: any = styled(Button)(({ theme }: any) => ({
  display: `flex`,

  background: "#7085F9",
  borderRadius: "12px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "8px 22px",

  width: `278px`,
  position: `absolute`,
  left: `138px`,
  top: `183px`,
  color: `rgba(255, 255, 255, 1)`,
  fontStyle: `normal`,
  fontFamily: `Futura`,
  fontWeight: `700`,
  fontSize: `15px`,
  letterSpacing: `0.46000000834465027px`,
  textDecoration: `none`,
  lineHeight: `26px`,
  textTransform: `uppercase`,
}));

function FormBox(props: FormBoxProps): JSX.Element {
  const router = useRouter();

  function onClick() {
    router.push(`${process.env.NEXT_PUBLIC_AUTH_URL}`);
  }

  return (
    <Welcome className={props.className}>
      <Title>{`welcome to ping-pong !`}</Title>
      <Line1></Line1>
      <LoremIpsumDolorSitAm>{`핑퐁을 하고싶으면 아래 버튼을 눌러서 로그인 하세요. 회원가입 같은 거 한 적이 없다구요? 하하하. 걱정말고 그냥 눌러보세요.`}</LoremIpsumDolorSitAm>
      <Button1
        size={"large"}
        color={"primary"}
        disabled={false}
        variant={"contained"}
        onClick={onClick}
      >
        {"sign in with 42 intra"}
      </Button1>
    </Welcome>
  );
}

export default FormBox;
