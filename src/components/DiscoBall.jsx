import { useEffect, useRef } from "react";
import * as THREE from "three";

function DiscoBall() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;

    if (!container) return;

    // Escena 3D
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);

    camera.position.z = 3.5;

    // Renderizador transparente
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.setSize(container.clientWidth, container.clientHeight);

    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    // Grupo que contiene la bola
    const ballGroup = new THREE.Group();
    scene.add(ballGroup);

    // Cuerpo esférico
    const sphereGeometry = new THREE.SphereGeometry(1, 48, 48);

    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xc4c8d2,
      metalness: 0.9,
      roughness: 0.2,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    ballGroup.add(sphere);

    // Luces para los reflejos
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));

    const whiteLight = new THREE.DirectionalLight(0xffffff, 3);
    whiteLight.position.set(2, 3, 4);
    scene.add(whiteLight);

    const purpleLight = new THREE.PointLight(0x9b5cff, 8, 10);
    purpleLight.position.set(-2, 1, 2);
    scene.add(purpleLight);

    const blueLight = new THREE.PointLight(0x348bff, 15, 10);
    blueLight.position.set(2, -1, 2);
    scene.add(blueLight);

    // Pequeños espejos distribuidos por toda la esfera
    const rows = 18;
    const columns = 32;

    const tileGeometry = new THREE.PlaneGeometry(0.105, 0.105);

    const tileColors = [0xfafaff, 0xd9dce6, 0xb5bac8, 0xe9eaf2];

    const tileMaterials = tileColors.map(
      (color) =>
        new THREE.MeshStandardMaterial({
          color,
          metalness: 1,
          roughness: 0.18,
          side: THREE.DoubleSide,
        }),
    );

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const theta = (Math.PI * (row + 0.5)) / rows;

        const phi = (2 * Math.PI * column) / columns;

        const normal = new THREE.Vector3(
          Math.sin(theta) * Math.cos(phi),
          Math.cos(theta),
          Math.sin(theta) * Math.sin(phi),
        );

        const tile = new THREE.Mesh(
          tileGeometry,
          tileMaterials[(row + column) % tileMaterials.length],
        );

        // Cada espejo sigue la curvatura de la esfera
        tile.position.copy(normal).multiplyScalar(1.008);

        tile.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

        ballGroup.add(tile);
      }
    }

    // Animación continua
    let animationId;

    function animate() {
      animationId = requestAnimationFrame(animate);

      ballGroup.rotation.y += 0.008;

      renderer.render(scene, camera);
    }

    animate();

    // Adaptar el tamaño si cambia el contenedor
    function handleResize() {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    }

    window.addEventListener("resize", handleResize);

    // Limpiar al desmontar el componente
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);

      renderer.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      tileGeometry.dispose();

      tileMaterials.forEach((material) => {
        material.dispose();
      });

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="disco-canvas" aria-hidden="true" />;
}

export default DiscoBall;
