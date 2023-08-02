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
                this.room.scale.set(0.11, 0.11, 0.11);
                this.rectLight.width = 0.5;
                this.rectLight.height = 0.7;
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
                    y: -1,
                    x: -2.5,
                })

                
            },

            "(max-width: 968px)": () => {
            // Mobile
                console.log("fired Mobile");

                // Resets
                this.room.scale.set(0.09, 0.09, 0.09);
                this.room.position.set(0, 0, 0);
                this.rectLight.width = 0.3;
                this.rectLight.height = 0.4;

                // First-section ------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    } 
                }).to(this.room.scale, {
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                })

                // Second-section ------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    } 
                }).to(this.room.scale, {
                    x: 0.25,
                    y: 0.25,
                    z: 0.25,
                }, "same").to(this.rectLight,{
                    width: 0.3 * 3.4,
                    height: 0.4 * 3.4,
                },"same").to(this.room.position,{
                    x: 1.5,
                }, "same")
                // Third-section ------------------------
                this.ThirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    } 
                }, "same").to(this.room.position,{
                    z: -3.5,
                })
                // .to(this.room.scale, {
                //     x: 0.3,
                //     y: 0.3,
                //     z: 0.3,
                // }, "same")
  
              },
                    
            // all 
            "all": () => {
                // Mini Platform Animations
                console.log(this.room.children)
                // Third-section ------------------------
                this.secondPartTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "center center",
                        // end: "bottom bottom",
                        // scrub: 0.6,
                        // invalidateOnRefresh: true,
                    } 
                });
                
                

                this.room.children.forEach((child) => {
                    if(child.name === "MiniFloor"){
                        
                        this.first = GSAP.to(child.position, {
                            x: -4.55761,
                            z: 11.2323,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if(child.name === "Mailbox"){
                        this.second = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 0.3
                        })
                    }
                    if(child.name === "Lamp"){
                        this.third = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if(child.name === "FloorFirst"){
                        this.fourth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if(child.name === "FloorSecond"){
                        this.fifth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if(child.name === "FloorThird"){
                        this.sixth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if(child.name === "Dirt"){
                        this.seventh = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if(child.name === "FlowerOne"){
                        this.eighth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                });
                this.secondPartTimeline.add(this.first);
                this.secondPartTimeline.add(this.second,"-= 0.1");
                this.secondPartTimeline.add(this.third,"-= 0.1" );
                this.secondPartTimeline.add(this.fourth, );
                this.secondPartTimeline.add(this.fifth, );
                this.secondPartTimeline.add(this.sixth, );
                this.secondPartTimeline.add(this.seventh, "-= 0.1");
                this.secondPartTimeline.add(this.eighth);
                
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