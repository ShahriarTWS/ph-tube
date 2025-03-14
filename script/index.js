
function loadCategory() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(response => response.json())
        .then(data => displayCategories(data.categories))

    function displayCategories(categories) {
        // get container 
        const categoryContainer = document.getElementById('category-container');
        // loop

        // category:"Music"
        // category_id:"1001"

        for (let cat of categories) {
            // create element
            const categoryDiv= document.createElement('div');
            categoryDiv.innerHTML=`
            <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
            `;
            categoryContainer.appendChild(categoryDiv)
        }
    }

}
loadCategory()