const loadCatagory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    return data.data.news_category;
}
const catagoryDisplay = async () => {
    const data = await loadCatagory();
    const mainCategory = document.getElementById("main-category")
    data.forEach((categories) => {
        const { category_name,category_id} = categories;
        const li = document.createElement('li');
        li.innerHTML = `
        <a class="text-secondary mx-4 fs-6" href="#" onclick="loadNews('${category_id}')">${category_name}</a>
        `
        mainCategory.appendChild(li);
    });
}
catagoryDisplay();
const loadNews = async (category_id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
    const spinnerContainer = document.getElementById("loader");
    spinnerContainer.classList.remove("d-none");
    const data = await res.json();
    const newsdata = data.data;
    neonNews(newsdata);
}

const neonNews = async(newsdata) => { 
    newsdata.sort((a, b)=>{
        return b.total_view - a.total_view;
    })

    const allNews = newsdata.length;
    const items = document.getElementById('how-many-news')
    items.innerText = allNews;

    if(allNews === 0){
        let noNews = document.getElementById('no-news-found') 
        noNews.classList.remove('d-none')
    }
    else{
        let noNews = document.getElementById('no-news-found') 
        noNews.classList.add('d-none')
    }

    const spinnerConatiner = document.getElementById("loader");
    spinnerConatiner.classList.add("d-none");
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = ''; 

    newsdata.forEach(nes => {
        const {_id, total_view, title, image_url, details, author} = nes
        const {name, img, published_date} = author
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <div class="card mt-5 mb-4">
            <div class="row">
                    <div class="col-md-4">
                        <img src="${image_url}" class="img-fluid rounded-start h-100" alt="...">
                    </div>     
                    <div class="col-md-8">
                        <div class="card-body p-4">
                            <h5 class="card-title">${title.length > 60 ? title.slice(0, 60)+'...': title}</h5>
                            <p class="card-text">${details.length > 400 ? details.slice(0, 400)+'...': details}</p>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                    <img class="author-img" src="${img}">
                                    <div class="ps-2">
                                        <p>${name ? name:'N/A'}</p>
                                        <p>${published_date}</p>
                                    </div>
                                <p>${total_view ? total_view: 'N/A'}</P>
                                <button onclick="newsDetails('${_id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsModal">Primary</button>
                              </div>
                            </div>
                            
                        <div>
                    </div>
            </div>
        </div>
        
        `
        newsContainer.appendChild(newsDiv);
    })
}
const toggleSpiner = (isLoading) => {
    const loadingSection = document.getElementById('loader');
    if(isLoading){
        loadingSection.classList.remove('d-none');
    }
    else{
        loadingSection.classList.add('d-none')
    }
}

//MODAL PART
const newsDetails = async (_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${_id}`;
    const res = await fetch(url);
    const data = await res.json();
    const newsdata=data.data;
    newsDataDetails(newsdata);
}
const newsDataDetails = async (newsdata) =>{
    newsdata.forEach(nes => {
        const {_id, total_view, title, image_url, details, author} = nes
        const {name, img, published_date} = author
        const modalTitle = document.getElementById('newsModalLabel');
        modalTitle.innerText = title;
        const modalD = document.getElementById('modalDetails');
        modalD.innerHTML=`
        <div class="p-4">
            <div class="d-flex align-items-center justify-content-between mt-4">
                <p>Author: ${name ? name : 'N/A'}</p>
                <img class="author-image" src="${img}">
            </div>
            <p>Total View: ${total_view ? total_view : 'N/A'}</p>
            <p>Publish Date and Time: ${published_date.length > 10 ? published_date.slice(0, 11): published_date}</p>
            <p class="mt-2">${details.length > 400 ? details.slice(0, 100)+'...': details}</P>
        </div>
        `
    })
}
