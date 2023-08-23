import { Box, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { socket } from "../socket";
import { useRouter } from "next/navigation";

enum Role {
  Player1,
  Player2,
  Spectator,
}

interface KeyState {
  [key: number]: boolean;
}

const PADDLE_WIDTH = 8;
const PADDLE_HEIGHT = 1;

// TODO refactoring
export default function Game() {
  const router = useRouter();
  const [score, setScore] = useState("0 : 0");
  const [isGaming, setIsGaming] = useState(false);
  const keyState: KeyState = {
    37: false, // left
    39: false, // right
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      90, // fov
      window.innerWidth / window.innerHeight, // aspect
      0.1, // near
      1000 // far
    );

    const light = new THREE.PointLight(0xffffff, 1); // 흰색 광원
    light.position.set(0, 0, 10); // 광원의 위치 설정

    const renderer = new THREE.WebGLRenderer();

    const background = new THREE.Mesh(
      new THREE.BoxGeometry(50, 100, 100),
      new THREE.MeshPhongMaterial({
        color: localStorage.getItem("backgroundColor") ?? "white",
        side: THREE.BackSide,
      })
    );

    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(1, 100, 100),
      new THREE.MeshPhongMaterial({
        color: localStorage.getItem("ballColor") ?? "white",
      })
    );

    const paddleMaterial = new THREE.MeshPhongMaterial({
      color: localStorage.getItem("paddleColor") ?? "white",
    });

    const paddleGeometry = new THREE.BoxGeometry(
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
      1
    );

    const paddle = new THREE.Mesh(paddleGeometry, paddleMaterial); // make a mesh class
    const paddle2 = new THREE.Mesh(paddleGeometry, paddleMaterial); // make a mesh class
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 100, 100),
      new THREE.MeshPhongMaterial({
        color: localStorage.getItem("planeColor") ?? "white",
      })
    );

    scene.add(light); // 씬에 광원 추가
    scene.add(new THREE.AmbientLight(0x404040)); // 씬에 주변광 추가
    scene.add(paddle);
    scene.add(paddle2);
    scene.add(ball);
    scene.add(plane);
    scene.add(background);

    plane.position.z = -2;

    socket.on("game", (data: any) => {
      setIsGaming(true);
      setScore(`${data.score.player1} : ${data.score.player2}`);
      paddle.position.x = data.paddle1.x;
      paddle.position.y = data.paddle1.y;

      paddle2.position.x = data.paddle2.x;
      paddle2.position.y = data.paddle2.y;

      ball.position.x = data.ball.pos.x;
      ball.position.y = data.ball.pos.y;
    });

    socket.emit("game_init", (role: Role) => {
      camera.position.z = 10;
      paddle.position.y = -30;
      paddle2.position.y = 30;
      switch (role) {
        case Role.Player1:
          camera.position.y = -50;
          camera.lookAt(0, 4, -1);
          break;
        case Role.Player2:
          camera.position.y = 50;
          camera.up.set(0, -1, 0);
          camera.lookAt(0, -4, -1);
          break;
        case Role.Spectator:
          camera.position.z = 45;
          camera.position.y = 0;
          camera.lookAt(0, 0, -1);
          camera.rotateZ(Math.PI / 2);
          break;
      }
    });

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    renderer.setSize(canvas!.clientWidth, canvas!.clientHeight);
    canvas.appendChild(renderer.domElement);

    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        const { width, height } = entries[0].contentRect;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    );
    resizeObserver.observe(canvas);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
      }
      keyState[event.keyCode || event.which] = true;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keyState[event.keyCode || event.which] = false;
    };

    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keyup", handleKeyUp, true);

    let animationId: any;
    function animate() {
      animationId = requestAnimationFrame(animate);
      if (keyState[37]) {
        socket.emit("key_left");
      }
      if (keyState[39]) {
        socket.emit("key_right");
      }
      renderer.render(scene, camera); // render the scene
    }
    animate();

    return () => {
      socket.removeAllListeners();
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <Box id="canvas" height="full" width="full" position="relative">
      <Text
        position="absolute"
        top="10px"
        fontSize="30px"
        color="tomato"
        width="100%"
        textAlign="center"
        z-index="100"
        display={"block"}
      >
        {isGaming ? score : "대기중"}
      </Text>
      {isGaming ? null : (
        <Button
          position="absolute"
          onClick={() => {
            socket.emit("leave_room");
            router.push("/game");
          }}
        >
          나가기
        </Button>
      )}
    </Box>
  );
}
