const apiKey = "cd40eece7b114508b08aba34485035cd";

const bolgContainer = document.getElementById("blog-container");
const searchFeild = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
       const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`
       const response = await fetch(apiUrl);
       const data = await response.json();
       return data.articles;
    }
    catch (error) {
        console.log("Fetchind News Error",error);
        return [];
    }
}

searchBtn.addEventListener("click", async () => {
    const searchTerm = searchFeild.value.trim();
    if (searchTerm !== "") {
        try {
            const articles = await fetchNewsQuery(searchTerm)
            displayBlogs(articles);
        } catch (error) {
            console.log("error data", error);
        }
    }
})

async function fetchNewsQuery(searchTerm) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apiKey}`
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
     }
     catch (error) {
         console.log("Fetchind News Error",error);
         return [];
     }
}

function displayBlogs(articles) {
    bolgContainer.innerHTML = "";
    articles.forEach((article) => {
        const articleDiv = document.createElement("div");
        articleDiv.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h1");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        const truncatedDescription = article.description.length > 120 ? article.title.slice(0, 120) + "..." : article.description;
        description.textContent = truncatedDescription;


        articleDiv.appendChild(img);
        articleDiv.appendChild(title);
        articleDiv.appendChild(description);
        articleDiv.addEventListener("click", () => {
            window.open(article.url, "_black");
        });
        bolgContainer.appendChild(articleDiv);

    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.log("error data", error);
    }
})();