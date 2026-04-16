"use strict";

/**
 * Denna fil valdierar input i ett formulär och lägger sedan till information från input vid lyckad inmatning i en databas med hjälp av fetch-anrop med POST.
 * AV: Josefine Backlund
 */
document.addEventListener("DOMContentLoaded", validateExperience);

function validateExperience() {
  //Variabler för formulär, input och felmeddelande/bekräftelsemeddelande.
  const form = document.querySelector("#addexperienceform");
  const employer = document.querySelector("#company");
  const workTitle = document.querySelector("#title");
  const location = document.querySelector("#location");
  const startDate = document.querySelector("#startdate");
  const endDate = document.querySelector("#enddate");
  const description = document.querySelector("#description");
  const errorContainer = document.querySelector("#errorcontainer");
  const confirmContainer = document.querySelector("#confirmcontainer");

  //Ett submitevent läggs till på formuläret så att beteendet kan manipuleras. Annars hamnar input-värden i adressraden.
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    //Ett objekt med informationen skapas för att sedan kunna skickas vidare detta i ett färdigt format som matchar databasen.
    let workExperienceInfo = {
      companyname: employer.value,
      jobtitle: workTitle.value,
      location: location.value,
      startdate: startDate.value,
      enddate: endDate.value,
      description: description.value,
    };

    let errors = []; //Här hamnar felmeddelanden vid felaktig input.

    if (workExperienceInfo.companyname === "") {
      errors.push("Ange arbetsgivare!");
    }
    if (workExperienceInfo.jobtitle === "") {
      errors.push("Ange yrkesroll!");
    }
    if (workExperienceInfo.location === "") {
      errors.push("Ange stad!");
    }
    if (workExperienceInfo.startdate === "") {
      errors.push("Ange startdatum!");
    }
    if (workExperienceInfo.enddate === "") {
      errors.push("Ange slutdatum!");
    }
    if (workExperienceInfo.description === "") {
      errors.push("Ange beskrivning av arbetsuppgifter!");
    }
    //Om felmeddelanden finns lagrade i arrayen kommer de radas i toppen av formuläret.
    if (errors.length > 0) {
      errorContainer.innerHTML = "";
      confirmContainer.innerHTML = "";
      errors.forEach((error) => {
        const errorEl = document.createElement("p");
        const errorContent = document.createTextNode(error);
        errorEl.appendChild(errorContent);
        errorContainer.appendChild(errorEl);
      });
    } else {
      //Om input är godkänd skapas ett bekräftelsemeddelande och skrivs ut i formuläret.
      errorContainer.innerHTML = "";
      confirmContainer.innerHTML = "";
      const confirmEl = document.createElement("p");
      const confirmContent = document.createTextNode(
        "Ny arbetslivserfarenhet tillagd! Du hittar den på startsidan.",
      );
      confirmEl.appendChild(confirmContent);
      confirmContainer.appendChild(confirmEl);

      addExperience(workExperienceInfo); //Input skickas vidare som ett objekt i funktionen addExperience.
      form.reset(); //Nollställa formulär.
    }
  });
}

async function addExperience(info) {
  //Ett fetch-anrop med POST som metod skickar inputvärden till API:et där informationen ska lagras.
  let response = await fetch("http://localhost:3000/workexperience/", {
    method: "POST",
    headers: {
      "Content-type": "application/json", //Specificerar json-format.
    },
    body: JSON.stringify(info), //Konverterar objektet till en json-sträng
  });
}
