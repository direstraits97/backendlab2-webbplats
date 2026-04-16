"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("#navbar");
  const openMenu = document.querySelector("#openmenu");
  const closeMenu = document.querySelector("#closemenu");

  if (window.innerWidth < 600) {
    nav.setAttribute("inert", "");
  } else {
    nav.removeAttribute("inert");
  }

  openMenu.addEventListener("click", () => {
    nav.classList.add("show");
    openMenu.setAttribute("aria-expanded", "true");
    nav.removeAttribute("inert");
  });

  closeMenu.addEventListener("click", () => {
    nav.classList.remove("show");
    openMenu.setAttribute("aria-expanded", "false");
    nav.setAttribute("inert", "");
  });
});
