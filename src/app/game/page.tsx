"use client";

// import Canvas from "./components/Canvas";

import { useEffect } from "react";
import * as THREE from "three";

export default function Page() {
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

    const geometry = new THREE.BoxGeometry(1, 1, 1); // make a cube class
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // make a material class
    const cube = new THREE.Mesh(geometry, material); // make a mesh class
    scene.add(cube); // place the mesh in the scene(0,0,0)

    camera.position.z = 5; // move the camera back

    function animate() {
      requestAnimationFrame(animate); // call animate() again
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera); // render the scene
    }
    animate();
  }, []);

  // 막대기 움직이는 부분
  // 공 움직이는 거를 해야하는데
  // Object가
  return (
    <div id="canvas">
      <h3>hello</h3>
    </div>
  );
}
