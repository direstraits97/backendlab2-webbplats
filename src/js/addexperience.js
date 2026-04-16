"use strict";

document.addEventListener("DOMContentLoaded", validateExperience);

function validateExperience() {
  const form = document.querySelector("#addexperienceform");
  const employer = document.querySelector("#company");
  const workTitle = document.querySelector("#title");
  const location = document.querySelector("#location");
  const startDate = document.querySelector("#startdate");
  const endDate = document.querySelector("#enddate");
  const description = document.querySelector("#description");
  const errorContainer = document.querySelector("#errorcontainer");
  const confirmContainer = document.querySelector("#confirmcontainer");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let workExperienceInfo = {
      companyname: employer.value,
      jobtitle: workTitle.value,
      location: location.value,
      startdate: startDate.value,
      enddate: endDate.value,
      description: description.value,
    };

    let errors = [];

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
      errorContainer.innerHTML = "";
      confirmContainer.innerHTML = "";
      const confirmEl = document.createElement("p");
      const confirmContent = document.createTextNode(
        "Ny arbetslivserfarenhet tillagd! Du hittar den på startsidan.",
      );
      confirmEl.appendChild(confirmContent);
      confirmContainer.appendChild(confirmEl);

      addExperience(workExperienceInfo);
      form.reset();
    }
  });
}

async function addExperience(info) {
  let response = await fetch("http://localhost:3000/workexperience/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(info),
  });
}
