function removeActiveClass() {
    const activeButtons = document.getElementsByClassName('active');
    for (let btn of activeButtons) {
        btn.classList.remove('active');

    }
}
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
            const categoryDiv = document.createElement('div');
            categoryDiv.innerHTML = `
            <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
            `;
            categoryContainer.appendChild(categoryDiv)
        }
    }

}


function loadVideos(searctText = '') {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searctText}`)
        .then((res) => res.json())

        .then(data => {
            removeActiveClass();
            document.getElementById('btn-all').classList.add('active');
            displayVideos(data.videos)
        })
}

const loadVideoDetails = (videoId) => {
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayVideoDetails(data.video));
};

const displayVideoDetails = (video) => {
    console.log(video);
    document.getElementById('video_details').showModal();

    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
<div class="card bg-base-100 image-full w-96 shadow-sm mx-auto">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    
  </div>
</div>
`
}


const loadCategoryVideos = (id) => {

    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const clickedBtn = document.getElementById(`btn-${id}`);
            clickedBtn.classList.add('active');
            displayVideos(data.category)
        })
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('video-container');

    videoContainer.innerHTML = '';

    if (videos.length == 0) {
        videoContainer.innerHTML = `
        <div class="col-span-full flex flex-col justify-center items-center">
                        <img src="assets/Icon.png" alt="">
                        <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
                    </div>
        `;
        return;
    }

    videos.forEach(video => {
        console.log(video);
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
        <div class="card bg-base-100 ">
                        <figure class="relative">
                            <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="" />
                            <span class="absolute bottom-2 right-2 text-white bg-black px-2 text-xs rounded">3hrs 56 min
                                ago</span>
                        </figure>


                        <div class="flex gap-3 px-0 py-5">
                            <div class="profile">
                                <div class="avatar">
                                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                                        <img
                                            src="${video.authors[0].profile_picture}" />
                                    </div>
                                </div>
                            </div>
                            <div class="info">
                                <h2 class=" font-bold">${video.title}</h2>
                                <p class="text-sm text-[rgba(23, 23, 23, 0.7)] flex gap-1">${video.authors[0].profile_name} ${video.authors[0].verified == true ? `<img
                                        class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"
                                        alt="">` : ``}</p>

                                <p class="text-sm text-[rgba(23, 23, 23, 0.7)]">${video.others.views}</p>
                            </div>

                        </div>
                        <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
                    </div>
        `;
        videoContainer.appendChild(videoCard);
    });
}

document.getElementById('search-input').addEventListener('keyup', (e) => {
    const input = e.target.value;
    loadVideos(input);
})
loadCategory()
loadVideos()
