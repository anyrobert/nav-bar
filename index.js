const toggleNav = () => {
  document.body.dataset.nav =
    document.body.dataset.nav === "true" ? "false" : "true";
};

let viewHeight = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${viewHeight}px`);

window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

const nav = document.getElementById("nav");

const handleOnDown = (e) => (nav.dataset.mouseDownAt = e.clientX);

const handleOnUp = () => {
  nav.dataset.mouseDownAt = "0";
  nav.dataset.prevPercentage = nav.dataset.percentage;
};

const handleOnMove = (e) => {
  if (nav.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(nav.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(nav.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  nav.dataset.percentage = nextPercentage;

  nav.animate(
    {
      transform: `translateX(${nextPercentage}%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of nav.getElementsByClassName("nav-link-image")) {
    console.log(image);
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

/* -- Had to add extra lines for touch events -- */

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);
