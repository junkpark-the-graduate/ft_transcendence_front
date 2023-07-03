import { useEffect } from "react";
import * as THREE from "three";

const PADDLE_WIDTH = 8;
const PADDLE_HEIGHT = 1;
const PADDLE_SPEED = 1;
const BALL_SIZE = 1;
let BALL_SPEED = 0.5;
const PLANE_WIDTH = 50;
const PLANE_HEIGHT = 100;

export default function Collision() {
  useEffect(() => {
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
    const ballDirection = new THREE.Vector3(1, 1, 0);

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

    camera.position.z = 10; // move the camera back
    camera.position.y = -50;
    camera.lookAt(0, 4, -1);
    // 1인칭
    //camera.position.y = -40;
    //camera.lookAt(0, 1, 0);

    paddle.position.y = -30;
    paddle2.position.y = 30;
    plane.position.z = -2;

    // TODO 키 반복 지연 시간 문제
    window.addEventListener(
      "keydown",
      function (event) {
        event.preventDefault();
        switch (event.keyCode) {
          case 37: // Left
            paddle.position.x -= PADDLE_SPEED;
            break;
          case 39: // Right
            paddle.position.x += PADDLE_SPEED;
            break;
        }
      },
      false
    );

    function animate() {
      requestAnimationFrame(animate);
      ball.position.x += ballDirection.x * BALL_SPEED;
      ball.position.y += ballDirection.y * BALL_SPEED;
      paddle2.position.x = ball.position.x;

      // 1인칭
      // camera.position.x = paddle.position.x;

      if (
        ball.position.x <= -PLANE_WIDTH / 2 ||
        ball.position.x >= PLANE_WIDTH / 2
      ) {
        ballDirection.x = -ballDirection.x;
      }
      if (
        ball.position.y <= -PLANE_HEIGHT / 2 ||
        ball.position.y >= PLANE_HEIGHT / 2
      ) {
        ball.position.x = 0;
        ball.position.y = 0;
      }

      if (
        ball.position.x <= paddle.position.x + PADDLE_WIDTH / 2 &&
        ball.position.x >= paddle.position.x - PADDLE_WIDTH / 2
      ) {
        // and if ball is aligned with paddle on y plane

        if (
          ball.position.y <= paddle.position.y + PADDLE_HEIGHT / 2 &&
          ball.position.y >= paddle.position.y - PADDLE_HEIGHT / 2
        ) {
          // ball is intersecting with the front half of the paddle
          ballDirection.x = (Math.random() - 0.5) * 2;
          ballDirection.y = -ballDirection.y;
          if (BALL_SPEED * 1.2 < PADDLE_HEIGHT) BALL_SPEED *= 1.2;
        }
      }

      if (
        ball.position.x <= paddle2.position.x + PADDLE_WIDTH / 2 &&
        ball.position.x >= paddle2.position.x - PADDLE_WIDTH / 2
      ) {
        // and if ball is aligned with paddle on y plane

        if (
          ball.position.y <= paddle2.position.y + PADDLE_HEIGHT / 2 &&
          ball.position.y >= paddle2.position.y - PADDLE_HEIGHT / 2
        ) {
          // ball is intersecting with the front half of the paddle
          ballDirection.x = (Math.random() - 0.5) * 2;
          ballDirection.y = -ballDirection.y;
          if (BALL_SPEED * 1.2 < PADDLE_HEIGHT) BALL_SPEED *= 1.2;
        }
      }

      ballDirection.normalize();
      renderer.render(scene, camera); // render the scene
    }
    animate();
  }, []);

  return <div id="canvas">Collision</div>;
}
