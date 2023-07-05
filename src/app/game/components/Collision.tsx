import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

const PADDLE_WIDTH = 8;
const PADDLE_HEIGHT = 1;
const PADDLE_SPEED = 1;
const BALL_SIZE = 1;
let BALL_SPEED = 0.5;
const PLANE_WIDTH = 50;
const PLANE_HEIGHT = 100;

const ENDPOINT = "ws://localhost:4242/game";

export default function Collision() {
  const [score, setScore] = useState("0 : 0");

  let isPlayer1: boolean = false;

  useEffect(() => {
    //const socket = io(`${process.env.NEXT_PUBLIC_BACK_END_POINT}`);
    const socket = io(ENDPOINT);

    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });

    socket.on("game_test", (data) => {
      console.log("game_test: ", data);
    });

    socket.on("score", (data) => {
      console.log("score: ", data);
      setScore(`${data.score.player1} : ${data.score.player2}`);
    });

    socket.on("game_init", (data) => {
      console.log("game_init: ", data);
      camera.position.z = 10; // move the camera back
      if (data.isPlayer1) {
        // 3인칭
        camera.position.y = -50;
        camera.lookAt(0, 4, -1);
        // 1인칭
        //camera.position.y = -30;
        //camera.lookAt(0, 1, 0);
      } else {
        // 3인칭
        camera.up.set(0, -1, 0);
        camera.position.y = 50;
        camera.lookAt(0, -4, -1);
        //camera.rotation.y = 1;
        // 1인칭
        //camera.position.y = 30;
        //camera.lookAt(0, -1, 0);
      }
    });

    socket.on("game", (data) => {
      // data : paddle1, paddle2, ball position
      //console.log(data);

      paddle.position.x = data.paddle1.x;
      paddle.position.y = data.paddle1.y;

      paddle2.position.x = data.paddle2.x;
      paddle2.position.y = data.paddle2.y;

      ball.position.x = data.ball.pos.x;
      ball.position.y = data.ball.pos.y;
    });

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
    renderer.setSize(window.innerWidth, window.innerHeight);
    //    // add to div
    document.querySelector("#canvas")!.appendChild(renderer.domElement);

    // 텍스트
    //  const loader = new FontLoader();
    //loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
    //  const textGeometry = new TextGeometry("Hello, World!", {
    //    //font: new THREE.FontLoader().parse(fontData), // 폰트 데이터 로드 (폰트 파일 또는 JSON 데이터)
    //    size: 10, // 텍스트 크기
    //    height: 1, // 텍스트 높이
    //    curveSegments: 12, // 곡선 세그먼트 수
    //    bevelEnabled: false, // 베벨 효과 사용 여부
    //  });

    // score text
    // const loader = new FontLoader();
    // loader.load("fonts/helvetiker_regular.typeface.json", function (font) {
    //   let me = 0;
    //   let you = 0;
    //   let score = `${me} : ${you}`;
    //   const geometry = new TextGeometry(score, {
    //     font: font,
    //     size: 5,
    //     height: 3,
    //     curveSegments: 12,
    //     bevelEnabled: false,
    //     // bevelThickness: 10,
    //     // bevelSize: 3,
    //     // bevelOffset: 0,
    //     // bevelSegments: 5,
    //   });

    //   // scnene 에 mesh 추가
    //   const textMesh = new THREE.Mesh(geometry, material);
    //   textMesh.lookAt(0, -1, 0);
    //   textMesh.geometry.center();
    //   textMesh.position.z = 25;
    //   scene.add(textMesh);
    // });

    const backgroundTextureLoader = new THREE.TextureLoader();
    const backgroundTexture = backgroundTextureLoader.load("Junkpark.png");
    const backgroundGeometry = new THREE.BoxGeometry(50, 100, 100);
    const backgroundmaterial = new THREE.MeshBasicMaterial({
      map: backgroundTexture,
      side: THREE.BackSide,
    });
    const background = new THREE.Mesh(backgroundGeometry, backgroundmaterial);

    const paddleGeometry = new THREE.BoxGeometry(
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
      1
    ); // make a cube class
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); // make a material class

    const ballGeometry = new THREE.SphereGeometry(1, 100, 100);
    const ball = new THREE.Mesh(ballGeometry, material);

    const planeGeometry = new THREE.PlaneGeometry(50, 100, 100);
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xf9dadd }); // make a material class

    const paddle = new THREE.Mesh(paddleGeometry, material); // make a mesh class
    const paddle2 = new THREE.Mesh(paddleGeometry, material); // make a mesh class
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    scene.add(light); // 씬에 광원 추가
    scene.add(new THREE.AmbientLight(0x404040)); // 씬에 주변광 추가
    scene.add(paddle); // place the mesh in the scene(0,0,0)
    scene.add(paddle2);
    scene.add(ball);
    scene.add(plane);
    scene.add(background);

    // paddle.position.y = -30;
    // paddle2.position.y = 30;
    plane.position.z = -2;

    interface KeyState {
      [key: number]: boolean;
    }

    const keyState: KeyState = {
      37: false, // left
      39: false, // right
    };

    window.addEventListener(
      "keydown",
      function (e: KeyboardEvent) {
        keyState[e.keyCode || e.which] = true;
      },
      true
    );

    window.addEventListener(
      "keyup",
      function (e: KeyboardEvent) {
        keyState[e.keyCode || e.which] = false;
      },
      true
    );

    function animate() {
      requestAnimationFrame(animate);
      if (keyState[37]) {
        socket.emit("key_left", { isPlayer1: isPlayer1 });
      }
      if (keyState[39]) {
        socket.emit("key_right", { isPlayer1: isPlayer1 });
      }
      // 1인칭
      //camera.position.x = paddle.position.x;

      renderer.render(scene, camera); // render the scene
    }
    animate();
  }, []);

  return (
    <div id="canvas">
      <Text
        position="absolute"
        top="10px"
        fontSize="30px"
        color="tomato"
        width="100%"
        textAlign="center"
        z-index="100"
        display="block"
      >
        {score}
      </Text>
    </div>
  );
}
