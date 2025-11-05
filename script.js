$(document).ready(function () {
  // ===== MENU TOGGLE =====
  $("#menu-icon").click(function () {
    $(".navbar").toggleClass("active");
  });

  $(".navbar a").click(function () {
    $(".navbar").removeClass("active");
  });

  // ===== SCROLL EFFECT =====
  $(window).on("scroll", function () {
    let top = $(window).scrollTop();

    $("section").each(function () {
      let offset = $(this).offset().top - 150;
      let height = $(this).outerHeight();
      let id = $(this).attr("id");

      if (top >= offset && top < offset + height) {
        $(".navbar a").removeClass("active");
        $('.navbar a[href*="' + id + '"]').addClass("active");
      }
    });

    $(".header").toggleClass("sticky", top > 100);
  });

  // ===== CONTACT FORM =====
  $(".contact form").submit(function (e) {
    e.preventDefault();

    let name = $("input[placeholder='Full Name']").val().trim();
    let email = $("input[placeholder='Email']").val().trim();
    let phone = $("input[placeholder='Phone Number']").val().trim();
    let message = $("textarea").val().trim();

    if (name && email && phone && message) {
      alert("Thank you, " + name + "! Your message has been sent.");
      $(this)[0].reset();
    } else {
      alert("Please fill out all fields.");
    }
  });

  // ===== LOAD XML DATA =====
  fetch("portfolio.xml")
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");

      // ==== OWNER INFO ====
      const owner = xml.querySelector("owner");
      const name = owner.querySelector("name").textContent;
      const title = owner.querySelector("title").textContent;
      const description = owner.querySelector("description").textContent;

      $(".home-content h1 span").text(name.split(" ")[0]);
      $(".home-content h3 span").text(title);
      $(".home-content h3").append(" " + description);

      // ==== ABOUT SECTION ====
      const aboutList = xml.querySelectorAll("about education level");
      const aboutSection = $("#about .info-box:nth-of-type(2) ul");
      aboutSection.empty();

      aboutList.forEach(level => {
        const school = level.querySelector("school").textContent;
        const year = level.querySelector("year").textContent;
        aboutSection.append(`<li><b>${level.getAttribute("type")}:</b> ${school} <i>(${year})</i></li>`);
      });

      // ==== SERVICES SECTION ====
      const services = xml.querySelectorAll("services service");
      const servicesContainer = $(".services-container");
      servicesContainer.empty();

      services.forEach(service => {
        const name = service.querySelector("name").textContent;
        const icon = service.querySelector("icon").textContent;
        const desc = service.querySelector("description").textContent;

        servicesContainer.append(`
          <div class="service-box">
            <div class="service-info">
              <i class='bx ${icon}'></i>
              <h4>${name}</h4>
              <p>${desc}</p>
            </div>
          </div>
        `);
      });

      // ==== PROJECTS SECTION ====
      const projects = xml.querySelectorAll("projects project");
      const projectsBox = $(".projects-box");
      projectsBox.empty();

      projects.forEach(project => {
        const title = project.querySelector("title").textContent;
        const image = project.querySelector("image").textContent;
        const desc = project.querySelector("description").textContent;

        projectsBox.append(`
          <div class="project-card">
            <img src="${image}" alt="">
            <h3>${title}</h3>
            <p>${desc}</p>
          </div>
        `);
      });

      console.log("✅ Portfolio data loaded successfully from XML!");
    })
    .catch(error => console.error("❌ Error loading XML data:", error));
});
