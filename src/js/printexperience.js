"use strict";

document.addEventListener("DOMContentLoaded", getData);
const url = "http://localhost:3000/workexperience/";

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

  info.forEach((workexperience) => {
    const articleEl = document.createElement("article");
    const employerHolder = document.createElement("h3");
    const locationHolder = document.createElement("h4");
    const titleHolder = document.createElement("h4");
    const descriptionHolder = document.createElement("p");
    const timeHolder = document.createElement("h4");
    const deleteButton = document.createElement("button");
    const deleteText = document.createTextNode("Radera");
    deleteButton.appendChild(deleteText);
    deleteButton.classList.add("deleteform");
    deleteButton.addEventListener("click", () =>
      deleteExperience(workexperience.id),
    );

    const employerContent = document.createTextNode(workexperience.companyname);
    const locationContent = document.createTextNode(workexperience.location);
    const titleContent = document.createTextNode(workexperience.jobtitle);
    const descriptionContent = document.createTextNode(
      workexperience.description,
    );
    const timeStartContent = document.createTextNode(workexperience.startdate);
    const timeEndContent = document.createTextNode(workexperience.enddate);
    const timeSpace = document.createTextNode(" - ");

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
