document.addEventListener("DOMContentLoaded", () => {
    const inputSearch = document.getElementById("search-input");
    const btnIcon = document.getElementById("searchBar-icon"); 
    const searchBtn = document.getElementById("search-btn");  
    const inputContent = document.getElementById("content-input");
    const contentIcon = document.getElementById("contentBar-icon"); 
    const contentBtn = document.getElementById("content-btn");  

    const path = window.location.pathname;
    const depth = path.split("/").filter(p => p).length;
    const basePath = "../".repeat(depth - 1) || "./";


    inputSearch.addEventListener('input', () => {
        btnIcon.src = inputSearch.value.trim() !== "" 
            ? `${basePath}images/close-icon.svg`
            : `${basePath}images/search-icon.svg`;
    });

    inputContent?.addEventListener('input', () => {
        contentIcon.src = inputContent.value.trim() !== "" 
            ? `${basePath}images/close-icon.svg`
            : `${basePath}images/search-icon.svg`;
    });

    searchBtn.addEventListener('click', () => {
        inputSearch.value = "";
        btnIcon.src = `${basePath}images/search-icon.svg`;
    });

    contentBtn?.addEventListener('click', () => {
        inputContent.value = "";
        contentIcon.src = `${basePath}images/search-icon.svg`;
    });
});
