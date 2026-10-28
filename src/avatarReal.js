import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let model, mixer, clock, animationGroup;

export function createRealAvatar(scene, onLoaded) {
  const group = new THREE.Group();
  const loader = new GLTFLoader();
  clock = new THREE.Clock();
  animationGroup = new THREE.AnimationObjectGroup();
  mixer = new THREE.AnimationMixer(animationGroup);

  loader.load('/default_model.glb', (gltf) => {
    model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);

    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        if (object.material) {
          if (object.material.map && object.material.name && !String(object.material.name).toLowerCase().includes('hair')) {
            object.material.map.generateMipmaps = false;
            object.material.map.needsUpdate = true;
          }
        }
      }
    });

    animationGroup.add(model);
    group.add(model);

    loader.load('/animation.glb', function (animGltf) {
      if (animGltf.animations && animGltf.animations[0]) {
        const clip = animGltf.animations[0].clone();
        clip.tracks = clip.tracks.filter((track) => {
          const name = track.name;
          return name.endsWith('Hips.position') || name.endsWith('.quaternion');
        });
        const action = mixer.clipAction(clip);
        action.play();
      }
    });

    if (onLoaded) onLoaded(model);
  });

  return group;
}

export function updateAvatarAnimation(delta) {
  if (mixer) mixer.update(delta);
}