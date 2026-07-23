const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");
const container = document.getElementById("tab-btns");

let currentTab = 1;

function switchTab(index) {
  contents.forEach((content, i) => {
    content.classList.toggle("hidden", i !== index);
  });

  tabs.forEach((tab, i) => {
    tab.classList.toggle("active-tab", i === index);
  });

  centerActiveTab(index);
}

function centerActiveTab(index) {
  const activeTab = tabs[index];
  const containerCenter = container.offsetWidth / 2;
  const activeTabCenter = activeTab.offsetWidth / 2;
  const scrollOffset = activeTab.offsetLeft + activeTabCenter - containerCenter;
  container.scrollTo({ left: scrollOffset, behavior: "smooth" });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    currentTab = index;
    switchTab(currentTab);
  });
});

setInterval(() => {
  currentTab = (currentTab + 1) % contents.length;
  switchTab(currentTab);
}, 10000);

switchTab(currentTab);

window.addEventListener("load", () => {
  centerActiveTab(currentTab);
});
