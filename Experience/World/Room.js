import Experience from "../Experience";
import * as THREE from "three"
import { Camera, Scene } from "three";
export default class Room {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room
        this.acturalRoom = this.room.scene;
      
        this.setModel();
    }

    setModel(){
        this.acturalRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            }

            if(child.name === "water"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0xffffff);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;
            }
        });

        this.scene.add(this.acturalRoom);
        this.acturalRoom.scale.set(0.11, 0.11, 0.11);
        // this.acturalRoom.rotation.y = Math.PI
    }


    resize(){
        
    }

    update(){
        
    }
}