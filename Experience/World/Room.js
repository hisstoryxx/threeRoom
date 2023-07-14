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