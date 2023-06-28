"use client";

import { useEffect } from "react";
import * as THREE from "three";

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
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1); // make a cube class
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // make a material class
  const cube = new THREE.Mesh(geometry, material); // make a mesh class
  scene.add(cube); // place the mesh in the scene(0,0,0)

  camera.position.z = 5; // move the camera back

  function animate() {
    requestAnimationFrame(animate); // call animate() again
    renderer.render(scene, camera); // render the scene
  }
}, []);

export default function Canvas() {
  return <></>;
}
