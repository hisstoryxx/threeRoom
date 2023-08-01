import Experience from "../Experience";
import * as THREE from "three"
import { Camera, Scene } from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class Controls {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach((child) => {
            if(child.type == "RectAreaLight"){
                this.rectLight = child;
            }
        })

        GSAP.registerPlugin(ScrollTrigger);
 
        // this.setPath();
        this.setScrollTrigger();

    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
	
            
            "(min-width: 969px)": () => {
            // Desktop
                console.log("fired Desktop");

                // First-section ------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    } 
                });
                this.firstMoveTimeline.to(
                    this.room.position, {
                    x: () => {
                        return this.sizes.width * 0.0014;
                    },
                });

                // Second-section ------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    } 
                })
                .to(
                    this.room.position, {
                    x: () => {
                        return 1
                    },
                    z: () => {
                        return this.sizes.height * 0.0032;
                    },
                }, "same")
               .to(
                    this.room.scale, {
                   x: 0.4,
                   y: 0.4,
                   z: 0.4,
                }, "same")
                .to(
                    this.rectLight, {
                    width: 0.5 * 4,
                    height: 0.7 * 4,
                 }, "same")
                // this.secondMoveTimeline.to(
                //     this.room.position, {
                //     x: () => {
                //         return 1
                //     },
                //     z: () => {
                //         return this.sizes.height * 0.0032;
                //     },
                // }, "same");
                // this.secondMoveTimeline.to(
                //     this.room.scale, {
                //    x: 0.4,
                //    y: 0.4,
                //    z: 0.4,
                // }, "same");
                // this.secondMoveTimeline.to(
                //     this.rectLight, {
                //     width: 0.5 * 4,
                //     height: 0.7 * 4,
                //  }, "same")
                // Third-section ------------------------
                this.ThirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    } 
                })
                .to(
                    this.camera.orthographicCamera.position, {
                    y: 0.5,
                    x: -3.1,
                })
            },

            "(max-width: 968px)": () => {
            // Mobile
                console.log("fired Mobile");
  
              },
                    
            // all 
            "all": function() {
              // ScrollTriggers created here aren't associated with a particular media query,
              // so they persist.
            }
              
          }); 
    }

    // setPath(){
    //     console.log(this.room)
    //     this.timeline = new GSAP.timeline();
    //     this.timeline.to(this.room.position, {
    //         x: () =>  {
    //            return this.sizes.width * 0.0012;
    //         },
    //         scrollTrigger:{
    //             trigger:".first-move",
    //             markers: true,
    //             start: "top top",
    //             end: "bottom bottm",
    //             scrub: 0.6,
    //             invalidateOnRefresh: true,
    //         }
    //     })
    // }

   
    resize(){
        
    }

    update(){
       
       
    }
}