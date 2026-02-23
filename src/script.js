const myAnimations = {
  initializeAnimations: function () {
    this.setupLoadingAndHeader();
    this.animatePhoneArrival();
    this.animateBackgroundBoxes();
    this.buildFloatingImages();
    this.configureBackgroundColors();
    this.synchronizeRailTitles();
    this.playPhoneInnerScreens();
    this.triggerFinalImageBurst();
  },

  setupLoadingAndHeader: function () {
    const tl = gsap.timeline();

    tl.to(".loader-spinner", {
      width: "100%",
      duration: 1,
      onComplete: () => {
        document.querySelector(".loader-spinner").classList.add("display-none");
      },
    });

    tl.to(".loader__top, .loader__bottom", {
      height: 0,
      duration: 1,
      onComplete: () => {
        document.querySelector(".loader").classList.add("display-none");
      },
    });

    gsap.to(".bg-scroll", {
      transform: "translate3d(0px, -300vh, 0px)",
      scrollTrigger: {
        trigger: ".bg-scroll",
        scroller: "body",
        scrub: 2,
      },
    });

    gsap.from(".heading__track", {
      x: 200,
      y: 60,
      duration: 0.5,
      delay: 1,
    });

    gsap.to(".heading", {
      x: "-120vw",
      opacity: 0,
      scrollTrigger: {
        trigger: ".heading__track",
        scroller: "body",
        start: "top 30%",
        end: "top -100%",
        scrub: 2,
      },
    });

    gsap.to(".nav-scroll__pin", {
      x: () =>
        document.querySelector(".nav-scroll").offsetWidth -
        document.querySelector(".nav-scroll__pin").offsetWidth,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });
  },

  animatePhoneArrival: function () {
    gsap.from(".phone-container", {
      opacity: 0,
      y: 100,
      duration: 1.5,
      delay: 0.5,
    });

    gsap.to(".phone-mockup, .phone-media-images", {
      transform: "translate(0px,0vh) scale(1, 1)",
      scrollTrigger: {
        trigger: ".header",
        scroller: "body",
        start: "top 0",
        scrub: 2,
      },
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".header",
          scroller: "body",
          start: "top -100%",
          endTrigger: ".wide-space",
          end: "top 0%",
          scrub: true,
        },
      })
      .fromTo(".phone-notch", { opacity: 0 }, { opacity: 1, duration: 0.05 })
      .to(".phone-notch", { opacity: 1, duration: 0.9 })
      .to(".phone-notch", { opacity: 0, duration: 0.05 });

    gsap.to(".phone-media-box", {
      transform: "translate3d(0px, 0px, 0px)",
      scrollTrigger: {
        trigger: ".header",
        scroller: "body",
        start: "top 0",
        scrub: 2,
      },
    });
  },

  animateBackgroundBoxes: function () {
    const leftBoxes = [1, 2, 3, 7, 8, 11, 13, 14, 18, 19, 22];
    const rightBoxes = [4, 5, 6, 9, 10, 12, 15, 16, 17, 20, 21];

    leftBoxes.forEach((i) => {
      gsap.from(`.bg${i}`, {
        x: -500,
        opacity: 0,
        duration: 1.5,
        delay: 0.5 + Math.random() * 0.5,
        ease: "power2.out",
      });
    });

    rightBoxes.forEach((i) => {
      gsap.from(`.bg${i}`, {
        x: 500,
        opacity: 0,
        duration: 1.5,
        delay: 0.5 + Math.random() * 0.5,
        ease: "power2.out",
      });
    });

    for (let i = 1; i <= 22; i++) {
      const direction = leftBoxes.includes(i) ? -1 : 1;
      const speed = 50 + Math.random() * 150;
      gsap.to(`.bg${i}`, {
        x: direction * speed * -1,
        y: (Math.random() - 0.5) * 100,
        scrollTrigger: {
          trigger: "body",
          scroller: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });
    }
  },

  buildFloatingImages: function () {
    const imagesTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".phone-media-box",
        scroller: "body",
        scrub: 2,
        end: "top 0",
      },
    });

    imagesTimeline.to(".phone-media-box__images--1", {
      transform: "rotateZ(-18.2deg)",
    });
    imagesTimeline.to(
      ".phone-media-box__images--2",
      {
        transform: "rotateZ(-15.19deg)",
      },
      "<",
    );
    imagesTimeline.to(
      ".phone-media-box__images--3",
      {
        transform: "rotateZ(-11deg)",
      },
      "<",
    );
    imagesTimeline.to(
      ".phone-media-box__images--4",
      {
        transform: "rotateZ(20.6deg)",
      },
      "<",
    );
    imagesTimeline.to(
      ".phone-media-box__images--5",
      {
        transform: "rotateZ(23deg)",
      },
      "<",
    );
    imagesTimeline.to(
      ".phone-media-box__images--6",
      {
        transform: "rotateZ(29deg)",
      },
      "<",
    );
    imagesTimeline.to(
      ".phone-media-box__images--1,.phone-media-box__images--2,.phone-media-box__images--3,.phone-media-box__images--4,.phone-media-box__images--5,.phone-media-box__images--6",
      {
        transform: "rotateZ(0deg)",
      },
    );

    for (let i = 1; i <= 6; i++) {
      imagesTimeline.to(
        `.phone-media-box__images--${i}`,
        {
          transform: "translate3d(0vw, 0vh, 0px) scale3d(1,1,1)",
          width: window.innerWidth > 1024 ? "360px" : "250px",
          height: window.innerWidth > 1024 ? "280px" : "210px",
        },
        "<",
      );
    }
    imagesTimeline.to(".phone-media-box__images", {
      display: "none",
      duration: 0.1,
    });

    const breathingEffectTimeline = gsap.timeline();

    breathingEffectTimeline.fromTo(
      ".phone-media-box__images--2, .phone-media-box__images--3, .phone-media-box__images--5, .phone-media-box__images--6",
      {
        scale: 0.75,
      },
      {
        scale: 1,
        duration: 1,
      },
      "<",
    );

    breathingEffectTimeline.fromTo(
      ".phone-media-box__images--1,.phone-media-box__images--4",
      {
        scale: 0.75,
      },
      {
        scale: 1,
        duration: 1,
        repeat: 0,
      },
      "<0.3",
    );
  },

  configureBackgroundColors: function () {
    gsap.to("body", {
      backgroundColor: "rgba(50,74,87)",
      scrollTrigger: {
        trigger: ".main-description__feed",
        scroller: "body",
        start: "top -30%",
        end: "top -200%",
        scrub: 2,
      },
    });

    gsap.to("body", {
      backgroundColor: "rgb(80, 134, 153)",
      scrollTrigger: {
        trigger: ".main-description__friends",
        scroller: "body",
        start: "top -30%",
        end: "bottom",
        scrub: 2,
      },
    });

    gsap.to("body", {
      backgroundColor: "rgba(116,107,104)",
      scrollTrigger: {
        trigger: ".main-description__search",
        scroller: "body",
        start: "top -20%",
        end: "top center",
        scrub: 2,
      },
    });

    gsap.to("body", {
      backgroundColor: "rgba(177,71,118)",
      scrollTrigger: {
        trigger: ".main-description__news",
        scroller: "body",
        start: "top -20%",
        end: "top center",
        scrub: 2,
      },
    });

    gsap.to("body", {
      backgroundColor: "rgba(146,72,148)",
      scrollTrigger: {
        trigger: ".main-description__profile",
        scroller: "body",
        start: "top -20%",
        end: "top center",
        scrub: 2,
      },
    });

    gsap.to("body", {
      backgroundColor: "rgba(65,60,126)",
      scrollTrigger: {
        trigger: ".main-description__slot",
        scroller: "body",
        start: "top -20%",
        end: "top center",
        scrub: 2,
      },
    });
  },

  synchronizeRailTitles: function () {
    const sections = [
      {
        trigger: ".main-description__feed",
        title: ".main-side__scroll--wrapper .side-title-feed",
      },
      {
        trigger: ".main-description__friends",
        title: ".main-side__scroll--wrapper .side-title-friends",
      },
      {
        trigger: ".main-description__search",
        title: ".main-side__scroll--wrapper .side-title-search",
      },
      {
        trigger: ".main-description__news",
        title: ".main-side__scroll--wrapper .side-title-news",
      },
      {
        trigger: ".main-description__profile",
        title: ".main-side__scroll--wrapper .side-title-profile",
      },
      {
        trigger: ".main-description__slot",
        title: ".main-side__scroll--wrapper .side-title-slot",
      },
    ];

    sections.forEach(({ trigger, title }) => {
      gsap.set(title, { opacity: 0, yPercent: -50, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          scroller: "body",
          start: "top 40%",
          end: "bottom 60%",
          scrub: true,
        },
      });

      tl.to(title, { opacity: 1, duration: 0.15, ease: "none" })
        .to(title, { opacity: 1, duration: 0.7, ease: "none" })
        .to(title, { opacity: 0, duration: 0.15, ease: "none" });
    });
  },

  playPhoneInnerScreens: function () {
    gsap.set(".phone-flow > div:not(.phone-flow__navbar)", {
      yPercent: 100,
      y: 0,
      opacity: 1,
      visibility: "visible",
    });
    gsap.set(".phone-flow__navbar", { y: "100vh" });

    const scrubValue = 1;
    const transitionStart = "top 90%";
    const transitionEnd = "top 20%";

    const welcomeToFeed = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-description__feed",
        scroller: "body",
        start: transitionStart,
        end: transitionEnd,
        scrub: scrubValue,
      },
    });

    welcomeToFeed
      .to(".phone-media-images", { opacity: 0, duration: 1 }, 0)
      .to(
        ".phone-flow__feed",
        { yPercent: 0, y: 0, opacity: 1, duration: 1 },
        0,
      );

    gsap.to(".phone-flow__feed--image", {
      y: (index, target) => {
        const panDist = target.offsetHeight - target.parentElement.offsetHeight;
        return panDist > 0 ? -panDist : 0;
      },
      scrollTrigger: {
        trigger: ".main-description__feed",
        scroller: "body",
        start: transitionEnd,
        end: "bottom bottom",
        scrub: scrubValue,
      },
    });

    const feedToFriends = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-description__friends",
        scroller: "body",
        start: transitionStart,
        end: transitionStart.replace("90%", "40%"),
        scrub: scrubValue,
      },
    });

    feedToFriends
      .to(".phone-flow__feed", { yPercent: -100, duration: 1 }, 0)
      .to(".phone-flow__friends", { yPercent: 0, y: 0, duration: 1 }, 0)
      .to(
        ".phone-flow__navbar",
        { y: 0, transform: "translate(0, 0)", duration: 1 },
        0,
      );

    const friendsToSearch = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-description__search",
        scroller: "body",
        start: transitionStart,
        end: transitionEnd,
        scrub: scrubValue,
      },
    });

    friendsToSearch
      .to(".phone-flow__friends", { yPercent: -100, duration: 1 }, 0)
      .to(".phone-flow__search", { yPercent: 0, y: 0, duration: 1 }, 0);

    const searchToNews = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-description__news",
        scroller: "body",
        start: transitionStart,
        end: transitionEnd,
        scrub: scrubValue,
      },
    });

    searchToNews
      .to(".phone-flow__search", { yPercent: -100, duration: 1 }, 0)
      .to(".phone-flow__news", { yPercent: 0, y: 0, duration: 1 }, 0);

    const newsToProfile = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-description__profile",
        scroller: "body",
        start: transitionStart,
        end: transitionEnd,
        scrub: scrubValue,
      },
    });

    newsToProfile
      .to(".phone-flow__news", { yPercent: -100, duration: 1 }, 0)
      .to(".phone-flow__profile", { yPercent: 0, y: 0, duration: 1 }, 0);

    const profileToSlot = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-description__slot",
        scroller: "body",
        start: transitionStart,
        end: transitionEnd,
        scrub: scrubValue,
      },
    });

    profileToSlot
      .to(".phone-flow__profile", { yPercent: -100, duration: 1 }, 0)
      .to(".phone-flow__slots", { yPercent: 0, y: 0, duration: 1 }, 0);
  },

  triggerFinalImageBurst: function () {
    const slotsTimeline = gsap.timeline();

    slotsTimeline.to(
      ".phone-burst-box",
      {
        opacity: 1,
        scrollTrigger: {
          trigger: ".wide-space",
          start: "top 10%",
          end: "top 10%",
          scroller: "body",
          scrub: 2,
        },
      },
      "<",
    );
    slotsTimeline.to(
      ".phone-burst-box__image1,.phone-burst-box__image2,.phone-burst-box__image3,.phone-burst-box__image4,.phone-burst-box__image5,.phone-burst-box__image6",
      {
        borderRadius: "0px",
        scrollTrigger: {
          trigger: ".wide-space",
          start: "top 0",
          end: "top 0",
          scroller: "body",
          scrub: 2,
        },
      },
    );

    gsap.to(".phone-mockup, .phone-notch, .phone-flow, .phone-media-images", {
      opacity: 0,
      immediateRender: false,
      scrollTrigger: {
        trigger: ".wide-space",
        start: "top 10%",
        end: "top -10%",
        scroller: "body",
        scrub: true,
      },
    });

    gsap.to(".phone-media-box", {
      backgroundColor: "rgba(0,0,0,0)",
      scrollTrigger: {
        trigger: ".wide-space",
        start: "top 10%",
        end: "top -10%",
        scroller: "body",
        scrub: true,
      },
    });

    const burstTimeline1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".wide-space",
        scroller: "body",
        start: "top 10%",
        end: "top -150%",
        scrub: 2,
      },
    });

    burstTimeline1.to(".phone-burst-box__image1", {
      transform: "translate(6vw,64vh) rotateZ(12deg)",
    });
    burstTimeline1.to(".phone-burst-box__image1", {
      transform: "translate(4vw,55vh) rotateZ(0deg)",
    });

    const burstTimeline2 = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".wide-space",
        scroller: "body",
        start: "top 10%",
        end: "top -150%",
        scrub: 2,
      },
    });

    burstTimeline2.to(".phone-burst-box__image2", {
      transform: "translate(0vw,42vh) rotateZ(-22deg)",
    });
    burstTimeline2.to(".phone-burst-box__image2", {
      transform: "translate(12vw,46vh) rotateZ(0deg)",
    });
    burstTimeline2.to(".phone-burst-box__image2", {
      transform: "translate(16vw,48vh) rotateZ(22deg)",
    });
    burstTimeline2.to(".phone-burst-box__image2", {
      transform: "translate(20vw,50vh) rotateZ(0deg)",
    });

    const burstTimeline3 = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".wide-space",
        scroller: "body",
        start: "top 10%",
        end: "top -150%",
        scrub: 2,
      },
    });
    burstTimeline3.to(".phone-burst-box__image3", {
      transform: "translate(25vw,20vh)",
    });

    const burstTimeline4 = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".wide-space",
        scroller: "body",
        start: "top 10%",
        end: "top -150%",
        scrub: 2,
      },
    });
    burstTimeline4.to(".phone-burst-box__image4", {
      transform: "translate(-1.15vw,2.88vh) rotateZ(-10deg)",
    });
    burstTimeline4.to(".phone-burst-box__image4", {
      transform: "translate(-2.3vw,12.3vh) rotateZ(13.2deg)",
    });
    burstTimeline4.to(".phone-burst-box__image4", {
      transform: "translate(10vw,30vh) rotateZ(0deg)",
    });

    const burstTimeline5 = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".wide-space",
        scroller: "body",
        start: "top 10%",
        end: "top -150%",
        scrub: 2,
      },
    });
    burstTimeline5.to(".phone-burst-box__image5", {
      transform: "translate(3.3vw,2.6vh) rotateZ(29deg)",
    });
    burstTimeline5.to(".phone-burst-box__image5", {
      transform: "translate(36vw,28vh) rotateZ(0deg)",
    });

    const burstTimeline6 = gsap.timeline({
      delay: 3,
      scrollTrigger: {
        trigger: ".wide-space",
        scroller: "body",
        start: "top 10%",
        end: "top -150%",
        scrub: 2,
      },
    });
    burstTimeline6.to(".phone-burst-box__image6", {
      transform: "translate(3vw,-0.1vh) rotateZ(26deg)",
    });
    burstTimeline6.to(".phone-burst-box__image6", {
      transform: "translate(34vw,-10vh) rotateZ(0deg)",
    });
  },
  addListeners: function () {
    document.addEventListener("DOMContentLoaded", () =>
      this.initializeAnimations(),
    );
  },
};
myAnimations.addListeners();
