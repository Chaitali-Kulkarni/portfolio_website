gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("scrollVideo");
const lines = document.querySelectorAll(".line");

gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  scrollTrigger:{
    trigger: ".hero",
    start: "top top",
    end: "+=2500",   // 1000 scroll per sentence
    scrub: true,
    pin: true
  }
});

tl.to(".line:nth-child(1)", {opacity:1, duration:1})
  .to(".line:nth-child(1)", {opacity:0, duration:1})

  .to(".line:nth-child(2)", {opacity:1, duration:1})
  .to(".line:nth-child(2)", {opacity:0, duration:1})

  .to(".line:nth-child(3)", {opacity:1, duration:1})
  .to(".line:nth-child(3)", {opacity:0, duration:1})

  .to(".line:nth-child(4)", {opacity:1, duration:1});


// ----- SCROLL CONTROLS VIDEO -----
video.addEventListener("loadedmetadata", () => {

  let proxy = { time: 0 };

  gsap.to(proxy, {
    time: video.duration,
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
    onUpdate: () => {
      video.currentTime = proxy.time;
      updateText(proxy.time);   // sync text with video time
    }
  });

});


// ----- TEXT TIMELINE BASED ON VIDEO TIME -----

// Your video is 9 seconds
// Divide into equal windows for each line

const textTimings = [
  { start: 0.5, end: 2.5 },
  { start: 2.5, end: 4.5 },
  { start: 4.5, end: 6.5 },
  { start: 6.5, end: 8.8 }
];

function updateText(currentTime) {

  lines.forEach((line, i) => {
    const { start, end } = textTimings[i];

    if (currentTime >= start && currentTime <= end) {
      gsap.to(line, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        overwrite: true
      });
    } else {
      gsap.to(line, {
        opacity: 0,
        x: -80,
        duration: 0.4,
        overwrite: true
      });
    }
  });

}


// ----- Subtle spotlight drift -----
gsap.to(".overlay-spotlight",{
  backgroundPosition:"70% 50%",
  scrollTrigger:{
    trigger:document.body,
    start:"top top",
    end:"bottom bottom",
    scrub:true
  }
});

gsap.to(".text-block", {
  opacity:1,
  scrollTrigger:{
    trigger:".machine-intro",
    start:"top top",
    end:"center center",
    scrub:true
  }
});

gsap.to(".title-layer", {
  opacity:0,
  scrollTrigger:{
    trigger:".machine-intro",
    start:"center center",
    end:"bottom top",
    scrub:true
  }
});


let scrollHintHidden = false;

window.addEventListener("scroll", () => {
  if (!scrollHintHidden && window.scrollY > 50) {
    scrollHintHidden = true;
    gsap.to(".scroll-indicator", {
      opacity: 0,
      duration: 0.6
    });
  }
});

let machineTL = gsap.timeline({
  scrollTrigger:{
    trigger: ".machine-section",
    start: "top top",
    end: "+=5000",
    scrub: true,
    pin: true
  }
});


function focus(part){
  machineTL.to(".part", {
    opacity:0.01,
    scale:0.8,
    duration:1
  });

  machineTL.to(part, {
    opacity:1,
    scale:1.3,
    duration:1
  });
}


// INPUTS
focus(".inputs");
showProjects(".inputs-projects");
machineTL.to(".inputs", {
  x:100,
  yoyo:true,
  repeat:4,
  duration:1
});
hideProjects(".inputs-projects");


// PROCESSING
focus(".processing");
showProjects(".processing-projects");
machineTL.to(".processing", {rotation:360, duration:3, ease:"none"});
hideProjects(".processing-projects");

// PROCESSING
focus(".processing");
machineTL.to(".processing", {
  rotation:360,
  duration:3,
  ease:"none"
});

// RITUAL
focus(".ritual");
machineTL.to(".ritual", {
  x:15,
  yoyo:true,
  repeat:10,
  duration:0.2
});

// ENGINE
focus(".engine");
machineTL.to(".engine", {
  scale:1.15,
  yoyo:true,
  repeat:6,
  duration:1
});

// OUTPUTS
focus(".outputs");
machineTL.to(".outputs", {
  scale:1.1,
  duration:1
});

// FEEDBACK
focus(".feedback");
machineTL.to(".feedback", {
  scale:1.1,
  duration:1
});

function showProjects(selector){
  machineTL.to(selector, {
    opacity:1,
    pointerEvents:"auto",
    duration:0.5
  });

  machineTL.to(`${selector} img`, {
    scale:2,
    stagger:0.1,
    duration:0.6
  });
}

function hideProjects(selector){
  machineTL.to(`${selector} img`, {
    scale:0,
    duration:0.4
  });

  machineTL.to(selector, {
    opacity:0,
    pointerEvents:"none",
    duration:0.4
  });
}
