import { useEffect } from "react";
import * as THREE from "three";
import { io } from "socket.io-client";

const PADDLE_WIDTH = 8;
const PADDLE_HEIGHT = 1;
const PADDLE_SPEED = 1;
const BALL_SIZE = 1;
let BALL_SPEED = 0.5;
const PLANE_WIDTH = 50;
const PLANE_HEIGHT = 100;

const ENDPOINT = "ws://localhost:4242/game";

export default function Collision() {
  useEffect(() => {
    //const socket = io(`${process.env.NEXT_PUBLIC_BACK_END_POINT}`);
    const socket = io(ENDPOINT);

    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });

    socket.on("game", (data) => {
      // data : paddle1, paddle2, ball position
      //console.log(data);

      paddle.position.x = data.paddle1.position.x;
      paddle.position.y = data.paddle1.position.y;

      paddle2.position.x = data.paddle2.position.x;
      paddle2.position.y = data.paddle2.position.y;

      ball.position.x = data.ball.position.x;
      ball.position.y = data.ball.position.y;
    });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, // fov
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

    //camera.position.z = 10; // move the camera back
    //camera.position.y = -50;
    //camera.lookAt(0, 4, -1);
    // 1인칭
    camera.position.y = -30;
    camera.lookAt(0, 1, 0);

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
        socket.emit("key_left", "left");
      }
      if (keyState[39]) {
        socket.emit("key_right", "right");
      }
      // 1인칭
      camera.position.x = paddle.position.x;

      renderer.render(scene, camera); // render the scene
    }
    animate();
  }, []);

  return <div id="canvas">Collision</div>;
}
