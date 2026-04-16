"use strict";

/**
 * Denna fil skapar och skriver ut innehåll baserat på det som hämtas från API:et. Möjlighet att ta bort skapat innehåll är också inkluderad.
 * Av: Josefine Backlund
 */

document.addEventListener("DOMContentLoaded", getData);
const url = "http://localhost:3000/workexperience/";

//En asynkron funktion som hämtar data från länken ovan. Vid lyckat anrop skjutsas information vidare till funktionen printExperience.
async function getData() {
  try {
    const response = await fetch(url);
    const experienceData = await response.json();
    printExperience(experienceData);
  } catch (error) {
    console.error("Fel: " + error);
  }
}

function printExperience(info) {
  const experienceContainer = document.querySelector("#collectedexperience");
  experienceContainer.innerHTML = "";

  info.forEach((workexperience) => {
    //Datat loopas igenom, och allt inom forEachen görs för varje objekt som finns att hämta.
    //Nedan skapas de element som ska inkluderas i varje artikel.
    const articleEl = document.createElement("article");
    const employerHolder = document.createElement("h3");
    const locationHolder = document.createElement("h4");
    const titleHolder = document.createElement("h4");
    const descriptionHolder = document.createElement("p");
    const timeHolder = document.createElement("h4");
    const deleteButton = document.createElement("button");
    const deleteText = document.createTextNode("Radera");
    const deleteIcon = document.createElement("img");
    deleteIcon.setAttribute("src", "/ikoner/delete.svg");
    deleteIcon.setAttribute("alt", "");
    deleteButton.appendChild(deleteText);
    deleteButton.appendChild(deleteIcon);
    deleteButton.classList.add("deleteform");
    deleteButton.addEventListener(
      "click",
      () => deleteExperience(workexperience.id),
      //Varje artikel får en radera-knapp som triggas av ett klick-event. Vid klick skickas objektets id vidare till funktionen deleteExperience.
    );
    //Nedan skapas text baserat på innehållet i de objekt som hämtas.
    const employerContent = document.createTextNode(workexperience.companyname);
    const locationContent = document.createTextNode(workexperience.location);
    const titleContent = document.createTextNode(workexperience.jobtitle);
    const descriptionContent = document.createTextNode(
      workexperience.description,
    );
    const timeStartContent = document.createTextNode(workexperience.startdate);
    const timeEndContent = document.createTextNode(workexperience.enddate);
    const timeSpace = document.createTextNode(" - ");
    //Nedan tilldelas alla element den information som hämtats.
    employerHolder.appendChild(employerContent);
    locationHolder.appendChild(locationContent);
    titleHolder.appendChild(titleContent);
    descriptionHolder.appendChild(descriptionContent);
    timeHolder.appendChild(timeStartContent);
    timeHolder.appendChild(timeSpace);
    timeHolder.appendChild(timeEndContent);

    articleEl.appendChild(employerHolder);
    articleEl.appendChild(locationHolder);
    articleEl.appendChild(timeHolder);
    articleEl.appendChild(descriptionHolder);
    articleEl.appendChild(timeHolder);
    articleEl.appendChild(deleteButton);

    experienceContainer.appendChild(articleEl);
  });
}

async function deleteExperience(id) {
  //Länken till API:et läggs ihop för att komma åt rätt objekt, t.ex. "http://localhost:3000/workexperience/1".
  //Ett DELETE-kommando körs, och det API:et returnerar som svar kastas in i printExperience igen för att skriva ut en uppdaterad version.
  let response = await fetch(url + id, {
    method: "DELETE",
  });
  let jsonResponse = await response.json();
  printExperience(jsonResponse);
}
