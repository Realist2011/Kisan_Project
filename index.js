"use strict";
//---------------------------------------------------------------
let images = [];
images.push("banner1.png");
images.push("banner2.jpg");
images.push("banner3.jpg");
let index = 0;
let banner = document.querySelector(".banner");
banner.style.backgroundImage = `url(${images[index]})`;
function changeslide(bool) {
  if (bool == true) {
    index = (index + 1) % images.length;
  } else {
    index = (index - 1 + images.length) % images.length;
  }
  banner.style.backgroundImage = `url(${images[index]})`;
  console.log(index);
}
let nextslide = document.getElementById("next_banner");
let prevslide = document.getElementById("previous_banner");

nextslide.addEventListener("click", function () {
  changeslide(true);
});
prevslide.addEventListener("click", function () {
  changeslide(false);
});
//---------------------------------------------------------
const nextprotbutton = document.getElementById("next_product_protection");
const prevprotbutton = document.getElementById("previous_product_protection");
const nextseedbutton = document.getElementById("next_product_seeds");
const prevseedbutton = document.getElementById("previous_product_seeds");
const protectionboxes = document.querySelectorAll(".protectionbox");
const seedboxes = document.querySelectorAll(".seedbox");

prevprotbutton.style.display = "none";
prevseedbutton.style.display = "none";
let counter = 1;
nextprotbutton.addEventListener("click", () => {
  if (counter < 7) {
    prevprotbutton.style.display = "block";
    protectionboxes.forEach((element) => {
      element.style.right = `${counter * 16}vw`;
    });
    counter++;
    console.log(counter);
  }
  if (counter == 7) {
    nextprotbutton.style.display = "none";
  }
});
prevprotbutton.addEventListener("click", () => {
  if (counter > 1) {
    nextprotbutton.style.display = "block";
    counter--;
    protectionboxes.forEach((element) => {
      element.style.right = `${(counter - 1) * 16}vw`;
    });
    console.log(counter);
  }
  if (counter == 1) {
    prevprotbutton.style.display = "none";
  }
});
///////////////////////////////////////////////////////
let counter2 = 1;
nextseedbutton.addEventListener("click", () => {
  if (counter2 < 7) {
    prevseedbutton.style.display = "block";
    seedboxes.forEach((element) => {
      element.style.right = `${counter2 * 16}vw`;
    });
    counter2++;
    console.log(counter);
  }
  if (counter2 == 7) {
    nextseedbutton.style.display = "none";
  }
});
prevseedbutton.addEventListener("click", () => {
  if (counter2 > 1) {
    nextseedbutton.style.display = "block";
    counter2--;
    seedboxes.forEach((element) => {
      element.style.right = `${(counter2 - 1) * 16}vw`;
    });

    console.log(counter);
  }
  if (counter2 == 1) {
    prevseedbutton.style.display = "none";
  }
});
