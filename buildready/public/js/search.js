document.addEventListener("DOMContentLoaded", () => {
    const inputSearch = document.getElementById("search-input");
    const btnIcon = document.getElementById("searchBar-icon"); 
    const searchBtn = document.getElementById("search-btn");  

    const path = window.location.pathname;

    let basePath = "../"; 
    if (path.includes("/projects/") || path.includes("/properties/")) {
        basePath = "../../";
    }

    inputSearch.addEventListener('input', () => {
        btnIcon.src = inputSearch.value.trim() !== "" 
            ? `${basePath}images/search-active.svg`
            : `${basePath}images/search-icon.svg`;
    });

    searchBtn.addEventListener('click', () => {
        inputSearch.value = "";
        btnIcon.src = `${basePath}images/search-icon.svg`;
    });
});
