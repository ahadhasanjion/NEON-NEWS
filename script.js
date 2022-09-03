const loadCategories = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await res.json();
    return data.data.news_category;
};

const categoryDisplay = async () => {
    const data = await loadCategories();
    const categoryList = document.getElementById("main-category");

    data.forEach((categories) => {
        const {
            category_name,
            category_id
        } = categories;
        const li = document.createElement("li");
        li.innerHTML = `
       <a  class="px-4  text-secondary" href="#" onclick="loadnews('${category_id}')">${category_name}</a>
    
    `;
        categoryList.appendChild(li);
    });
};

categoryDisplay();

const loadnews = async (category_id) => {
    const spinn = document.getElementById("spin-loader");
    spinn.classList.remove("d-none");

    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
    const data = await res.json();
    const newsData = data.data;
    displayCategory(newsData);
};

const displayCategory = async (newsData) => {
    let itemFound = newsData.length;
    const noNews = document.getElementById("how-many-news");
    noNews.innerText = itemFound;

    if (itemFound === 0) {
        let notFound = document.getElementById("no-news-found");
        notFound.classList.remove("d-none");
    } else {
        let notFound = document.getElementById("no-news-found");
        notFound.classList.add("d-none");
    }

    newsData.sort((a, b) => {
        return b.total_view - a.total_view
    })

    const newsContainer = document.getElementById("news-container");
    const spinner = document.getElementById("spin-loader");
    spinner.classList.add("d-none");
    newsContainer.textContent = "";

    newsData.forEach((nes) => {
        const {_id,total_view,details, author,title,image_url} = nes;
        const {name,img,published_date} = author;
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
            <div class="card mt-5 mb-4">
                <div class="row">
                    <div class="col-md-4">
                        <img src="${image_url}" class="img-fluid rounded-start h-100" alt="...">
                    </div>   
                    <div class="col-md-8">
                        <div class="card-body p-4">
                            <p class="card-title">${title.length > 70? title.slice(0, 70) + "...": title}</p>
                            <p class="card-text">${details.length > 400? details.slice(0, 400) + "...": details}</p>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <img class="author-img" src="${img}">
                                <div class="ps-2">
                                    <p>${name ? name : "N/A"}</p>
                                    <p>${published_date}</p>
                                </div>
                                <p>${total_view ? total_view : "N/A"}</P>
                                  
                                <button onclick="newDetails('${_id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsModal">Details</button>
                            </div>    
                        </div>
                    <div>
                </div>
            </div>
         `;

        newsContainer.appendChild(div);
    });
};
const newDetails = async (_id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${_id}`);
    const data = await res.json();
    const newsData = data.data;
    shownewsDetails(newsData);
};
const shownewsDetails = async (newsData) => {
    const nes = newsData.forEach((nes) => {
        const {total_view,author,thumbnail_url,title,details} = nes;
        const {name,published_date,img} = author;
        const modalTitle = document.getElementById('newsModalLabel');
      modalTitle.innerText = title;
        const modalBody = document.getElementById("modalDetails");
        modalBody.innerHTML = `
            <div class="p-4">
                <div class="d-flex align-items-center justify-content-between mt-4">
                  <p>Author : ${name ? name : "N/A"}</p>
                  <img class="author-image" src="${img}">
                </div>
                <p class"mb-3">Total View : ${total_view ? total_view : "N/A"}</p>
                <p> Publish Date : ${published_date.length > 10 ? published_date.slice(0, 11): published_date}</p>
                <p class="mt-4"> ${details.length < 200 ? details: details.slice(0, 200) + "..."}</p>
           </div>
        `;
    });
};
