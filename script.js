const loadCatagory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    return data.data.news_category
}
const catagoryDisplay = async () => {
    const data = await loadCatagory();
    const mainCategory = document.getElementById("main-category")
    data.forEach((categories) => {
        const { category_name,category_id} = categories;
        const li = document.createElement('li')
        li.classList.add('menu-items')
        li.innerHTML = `
        <a class="text-secondary mx-4 fs-5" href="#">${category_name}</a>
        `
        mainCategory.appendChild(li)
    });
}
catagoryDisplay()

const loadNews = async () => {
    const url = `https://openapi.programming-hero.com/api/news/category/01`
    const res = await fetch(url);
    const data = await res.json();
    neonNews(data.data);
    // console.log(data);
}
const neonNews = news => {
    const newsContainer = document.getElementById('news-container');
    news.forEach(nes => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <div class="card mt-5 mb-4">
            <div class="row">
                
                    <div class="col-md-4">
                        <img src="${nes.image_url}" class="img-fluid rounded-start h-100" alt="...">
                    </div>     
                    <div class="col-md-8">
                        <div class="card-body p-0">
                            <h5 class="card-title">${nes.title}</h5>
                            <p class="card-text">${nes.details}</p>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                
                                    <img class="author-img" src="${nes.author.img}">
                                    <div class="ps-2">
                                        <p>${nes.author.name}</p>
                                        <p>${nes.author.published_date}</p>
                                    </div>
                                
                                <p>${nes.total_view}</P>
                                <button type="button" class="btn btn-primary">Primary</button>
                            </div>
                            
                        <div>
                    </div>

            </div>
        </div>
        
        `
        newsContainer.appendChild(newsDiv)
    })
}

loadNews();

// <div class="d-flex align-items-center">
//     <a href="#">${nes.author.img}</a>
//     <div>
//     <p>${nes.authur.name}</p>
//     <p>${nes.authur.published_date}</p>

//     </div>
// </div>
// <p>${nes.total_view}</P>
// <span>${nes.ratings}</span>