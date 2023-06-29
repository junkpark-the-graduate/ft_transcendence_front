import { useEffect } from "react";
import * as THREE from "three";

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

    //    const geometry = new THREE.SphereGeometry(2, 100, 100);
    // });
    //    const sphere = new THREE.Mesh(geometry, material);
    //    scene.add(sphere);

    const geometry = new THREE.BoxGeometry(4, 1, 1); // make a cube class
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); // make a material class

    const cube = new THREE.Mesh(geometry, material); // make a mesh class
    const cube2 = new THREE.Mesh(geometry, material); // make a mesh class

    scene.add(light); // 씬에 광원 추가
    //scene.add(new THREE.AmbientLight(0x404040)); // 씬에 주변광 추가

    scene.add(cube); // place the mesh in the scene(0,0,0)
    scene.add(cube2);

    camera.position.z = 20; // move the camera back
    cube2.position.y = 7;

    const collision = (x: number, y: number) => {
      const box2 = new THREE.Box3().setFromObject(cube2);
      cube.position.x += x;
      cube.position.y += y;
      const box1 = new THREE.Box3().setFromObject(cube);
      if (box1.intersectsBox(box2) || box2.intersectsBox(box1)) {
        cube.position.x -= x;
        cube.position.y -= y;
      }
    };

    // TODO 키 반복 지연 시간 문제
    window.addEventListener(
      "keydown",
      function (event) {
        switch (event.keyCode) {
          case 37: // Left
            collision(-0.2, 0);
            break;
          case 38: // Up
            collision(0, 0.2);
            break;
          case 39: // Right
            collision(0.2, 0);
            break;
          case 40: // Down
            collision(0, -0.2);
            break;
        }
      },
      false
    );

    function animate() {
      requestAnimationFrame(animate); // call animate() again
      //cube.geometry.computeBoundingBox();
      //const bCube = new THREE.Box3(
      //  cube.geometry.boundingBox?.min,
      //  cube.geometry.boundingBox?.max
      //);
      //cube2.geometry.computeBoundingBox();
      //const bCube2 = new THREE.Box3(
      //  cube2.geometry.boundingBox?.min,
      //  cube2.geometry.boundingBox?.max
      //);

      //const box1 = new THREE.Box3().setFromObject(cube);
      //const box2 = new THREE.Box3().setFromObject(cube2);
      //// 두 Box 객체의 AABB(Axis-Aligned Bounding Box)가 교차하는지 확인합니다
      //if (box1.intersectsBox(box2)) {
      //  console.log("두 Box 객체가 충돌했습니다.");
      //  // 충돌 시 필요한 로직을 여기에 추가합니다
      //}

      renderer.render(scene, camera); // render the scene
    }
    animate();
  }, []);

  return <div id="canvas">Collision ;</div>;
}
