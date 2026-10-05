const background = document.body;
const nav = document.getElementById("nav");
const span = document.getElementById("span");
const all = document.getElementById("all");
const active = document.getElementById("active");
const inactive = document.getElementById("inactive");
const toggleButton = document.getElementById("theme-toggle");
const content = document.getElementById("content");
toggleButton.dataset.mode = "dark";

toggleButton.addEventListener("click", () => {
  const isDarkMode = toggleButton.dataset.mode === "dark";

  toggleButton.src = isDarkMode
    ? "assets/images/icon-sun.svg"
    : "assets/images/icon-moon.svg";

  toggleButton.alt = isDarkMode ? "light mode icon" : "night mode icon";

  background.classList.toggle("dark", isDarkMode);
  background.classList.toggle("light", !isDarkMode);

  nav.classList.toggle("dark", isDarkMode);
  nav.classList.toggle("light", !isDarkMode);

  toggleButton.classList.toggle("dark", isDarkMode);
  toggleButton.classList.toggle("light", !isDarkMode);

  span.classList.toggle("dark", isDarkMode);
  span.classList.toggle("light", !isDarkMode);

  all.classList.toggle("dark", isDarkMode);
  all.classList.toggle("light", !isDarkMode);

  active.classList.toggle("dark", isDarkMode);
  active.classList.toggle("light", !isDarkMode);

  inactive.classList.toggle("dark", isDarkMode);
  inactive.classList.toggle("light", !isDarkMode);

  content.classList.toggle("dark", isDarkMode);
  content.classList.toggle("light", !isDarkMode);

  content.querySelectorAll(".content-items").forEach((item) => {
    item.classList.toggle("dark", isDarkMode);
    item.classList.toggle("light", !isDarkMode);
  });

  toggleButton.dataset.mode = isDarkMode ? "light" : "dark";
});

const data = [
  {
    logo: "./assets/images/logo-devlens.svg",
    name: "DevLens",
    description:
      "Quickly inspect page layouts and visualize element boundaries.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-style-spy.svg",
    name: "StyleSpy",
    description: "Instantly analyze and copy CSS from any webpage element.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-speed-boost.svg",
    name: "SpeedBoost",
    description: "Optimizes browser resource usage to accelerate page loading.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-json-wizard.svg",
    name: "JSONWizard",
    description:
      "Formats, validates, and prettifies JSON responses in-browser.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-tab-master-pro.svg",
    name: "TabMaster Pro",
    description: "Organizes browser tabs into groups and sessions.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-viewport-buddy.svg",
    name: "ViewportBuddy",
    description:
      "Simulates various screen resolutions directly within the browser.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-markup-notes.svg",
    name: "Markup Notes",
    description:
      "Enables annotation and notes directly onto webpages for collaborative debugging.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-grid-guides.svg",
    name: "GridGuides",
    description:
      "Overlay customizable grids and alignment guides on any webpage.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-palette-picker.svg",
    name: "Palette Picker",
    description: "Instantly extracts color palettes from any webpage.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-link-checker.svg",
    name: "LinkChecker",
    description: "Scans and highlights broken links on any page.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-dom-snapshot.svg",
    name: "DOM Snapshot",
    description: "Capture and export DOM structures quickly.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-console-plus.svg",
    name: "ConsolePlus",
    description:
      "Enhanced developer console with advanced filtering and logging.",
    isActive: true,
  },
];

let currentFilter = "all";
let pendingFilterRender;

function getVisibleExtensions() {
  if (currentFilter === "active") {
    return data.filter((extension) => extension.isActive);
  }

  if (currentFilter === "inactive") {
    return data.filter((extension) => !extension.isActive);
  }

  return data;
}

function renderExtensions(extensions) {
  content.innerHTML = "";

  for (const extension of extensions) {
    content.insertAdjacentHTML(
      "beforeend",
      `
        <div class="content-items">
          <div class="heading">
            <img src="${extension.logo}" class="image" alt="${extension.name}">
            <div class="text">
              <p class="name">${extension.name}</p>
              <p class="description">${extension.description}</p>
            </div>
          </div>
          <div class="ctn">
            <button
              type="button"
              class="btn"
              title="You can remove this card by double-clicking."  
              aria-label="Deactivate ${extension.name}; double-click to remove"
            >Remove</button>
            <button
              type="button"
              class="extension-toggle ${extension.isActive ? "is-active" : ""}"
              role="switch"
              aria-checked="${extension.isActive}"
              aria-label="Toggle ${extension.name}"
            ></button>
          </div>
        </div>
      `,
    );

    const card = content.lastElementChild;
    const removeButton = card.querySelector(".btn");
    const extensionToggle = card.querySelector(".extension-toggle");

    // Remove button behavior: start
    removeButton.addEventListener("click", () => {
      if (!extension.isActive) {
        return;
      }

      extension.isActive = false;
      extensionToggle.classList.remove("is-active");
      extensionToggle.setAttribute("aria-checked", "false");

      if (currentFilter === "active") {
        clearTimeout(pendingFilterRender);
        pendingFilterRender = setTimeout(() => {
          renderExtensions(getVisibleExtensions());
        }, 400);
      }
    });

    removeButton.addEventListener("dblclick", () => {
      clearTimeout(pendingFilterRender);
      const extensionIndex = data.indexOf(extension);
      if (extensionIndex !== -1) {
        data.splice(extensionIndex, 1);
        renderExtensions(getVisibleExtensions());
      }
    });
    // Remove button behavior: end

    // Extension toggle behavior: start
    extensionToggle.addEventListener("click", () => {
      clearTimeout(pendingFilterRender);
      extension.isActive = !extension.isActive;
      if (currentFilter !== "all") {
        renderExtensions(getVisibleExtensions());
        return;
      }

      extensionToggle.classList.toggle("is-active", extension.isActive);
      extensionToggle.setAttribute("aria-checked", String(extension.isActive));
    });
    // Extension toggle behavior: end

    const isLightMode = background.classList.contains("light");
    card.classList.toggle("light", isLightMode);
    card.classList.toggle("dark", !isLightMode);
  }
}

// All button behavior: start
all.addEventListener("click", () => {
  clearTimeout(pendingFilterRender);
  currentFilter = "all";
  renderExtensions(getVisibleExtensions());
});
// All button behavior: end

// Active button behavior: start
active.addEventListener("click", () => {
  clearTimeout(pendingFilterRender);
  currentFilter = "active";
  renderExtensions(getVisibleExtensions());
});
// Active button behavior: end

// Inactive button behavior: start
inactive.addEventListener("click", () => {
  clearTimeout(pendingFilterRender);
  currentFilter = "inactive";
  renderExtensions(getVisibleExtensions());
});
// Inactive button behavior: end

renderExtensions(getVisibleExtensions());