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