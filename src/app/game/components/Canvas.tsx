import { useEffect } from "react";
import * as THREE from "three";

export default function Canvas() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, // fov
      window.innerWidth / window.innerHeight, // aspect
      0.1, // near
      1000 // far
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //    // add to div
    document.querySelector("#canvas")!.appendChild(renderer.domElement);

    //    const geometry = new THREE.SphereGeometry(2, 100, 100);
    // });
    //    const sphere = new THREE.Mesh(geometry, material);
    //    scene.add(sphere);

    const geometry = new THREE.BoxGeometry(4, 1, 1); // make a cube class
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // make a material class
    const cube = new THREE.Mesh(geometry, material); // make a mesh class
    const cube2 = new THREE.Mesh(geometry, material); // make a mesh class
    scene.add(cube); // place the mesh in the scene(0,0,0)
    scene.add(cube2);

    camera.position.z = 20; // move the camera back
    cube2.position.y = 10;

    // 키 반복 지연 시간이 있다
    const key = (
      cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>
    ) => {
      window.addEventListener(
        "keydown",
        function (event) {
          switch (event.keyCode) {
            case 37: // Left
              cube.position.x -= 1;
              break;

            case 38: // Up
              cube.position.y += 1;
              break;

            case 39: // Right
              cube.position.x += 1;
              break;

            case 40: // Down
              cube.position.y -= 1;
              break;
          }
        },
        false
      );
    };
    key(cube);

    function animate() {
      requestAnimationFrame(animate); // call animate() again
      //cube.rotation.x += 0.01;
      //cube.rotation.y += 0.01;
      renderer.render(scene, camera); // render the scene
    }
    animate();
  }, []);

  return <div id="canvas"></div>;
}
