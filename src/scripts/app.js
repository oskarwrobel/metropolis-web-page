/* eslint-env browser */

import Parallax from "parallax-js";
import { loadImages, blink, horizontalMove, random, repeat, wait } from "./utils";

import img1 from "../images/bird.png";
import img2 from "../images/building-apartment.jpg";
import img3 from "../images/building-apartment-light.png";
import img4 from "../images/building-apartment-neon.png";
import img5 from "../images/building-apartment-smoker.png";
import img6 from "../images/building-apartment-tv-set.png";
import img7 from "../images/building-balcony.jpg";
import img8 from "../images/building-balcony-light-c1.png";
import img9 from "../images/building-balcony-light-c2.png";
import img10 from "../images/building-balcony-light-c3.png";
import img11 from "../images/building-crime.jpg";
import img12 from "../images/building-glass.jpg";
import img13 from "../images/building-glass-light.png";
import img14 from "../images/building-rataje.jpg";
import img15 from "../images/building-rataje-light.png";
import img16 from "../images/cloud-1.png";
import img17 from "../images/cloud-2.png";
import img18 from "../images/cloud-3.png";
import img19 from "../images/crime-scene.png";
import img20 from "../images/moon.png";

import "./analytics";

export async function app() {
  const progressElement = document.querySelector("#progress");

  await loadImages(images, (value) => (progressElement.style.width = `${value}%`));
  await wait(0.3); // To finish progress animation (visual purpose).

  // Parallax effect.
  // eslint-disable-next-line no-new
  new Parallax(document.getElementById("scene"));

  // Moving clouds and birds on the sky.
  horizontalMove(document.querySelector("#birds"), "left", 50, 10);
  horizontalMove(document.querySelector("#cloud-1"), "right", 60, 0);
  horizontalMove(document.querySelector("#cloud-2"), "right", 45, 15);
  horizontalMove(document.querySelector("#cloud-3"), "right", 55, 10);

  // Blinking "Kosmos" neon.
  blink(
    document.querySelector("#neon"),
    () => random(0.4, 1),
    () => random(8, 12),
  );

  // Lights inside a buildings.
  for (const building of document.querySelectorAll(".building")) {
    const lights = building.querySelectorAll(".light");
    const length = lights.length;

    if (length) {
      for (let i = 0; i < length / 2; i++) {
        lights[random(0, length - 1)].classList.add("active");
      }

      repeat(
        () => {
          lights[random(0, length - 1)].classList.toggle("active");
        },
        () => random(2.5, 6),
      );
    }
  }

  // Show up.
  document.body.classList.remove("loading");
}

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
];
