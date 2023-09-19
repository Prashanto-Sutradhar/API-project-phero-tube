let newData = []
const handleCategory = async() => {
    const response = await fetch(
        "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await response.json();
    const tabContainer = document.getElementById("tab-container");
    data.data.forEach((category) => {

        // console.log(category);
        const div = document.createElement('div');
        div.innerHTML = `<div id="tab-container">
        <ul >
            <li class="mr-2">
                <a onclick="handleClickButton('${category.category_id}')" href="#" class="inline-block px-4 py-3 rounded-lg bg-gray-300 hover:text-white hover:bg-[#FF1F3D] dark:hover:bg-[#FF1F3D] dark:hover:text-white">${category.category}</a>
            </li>
            
        </ul>`
        tabContainer.appendChild(div)
    });
};
const handleClickButton = async(categoryID) => {
    // console.log("categoryID");
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`)
    const data = await response.json();
    // console.log(data.data);
    card(data.data)
};

const card = (data) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    newData = data;
    console.log(newData)

    if (data.length > 0) {

        data.forEach((cardElement) => {

            const hour = parseInt(cardElement.others.posted_date / 3600);
            const min = parseInt((cardElement.others.posted_date % 3600) / 60);
            const date = `${hour}hrs ${min} min ago `;


            const div = document.createElement('div');
            div.innerHTML = `<div class=" h-[400px] w-[350px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
           <div class="relative">

           <img class="rounded-t-lg w-[350px] h-[200px]" src="${cardElement.thumbnail}" alt=" " />
           <p class="absolute bg-black p-2 text-white right-0 bottom-0"> ${cardElement?.others?.posted_date ? date : ' '} 
           </P>
           </div>
            <div class="flex gap-6">
                <div>
                    <img src=${cardElement?.authors[0]?.profile_picture} alt=" " class="w-10 h-10 rounded-full mt-3" >
                </div>
    
                <div class=" ">
                    <a href="# ">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">${cardElement.title}</h5>
                    </a>
                    <div class="flex gap-2  mb-2">
                    <p class="text-[14px] font-[400] text-[#111111B2]">${cardElement?.authors[0]?.profile_name}</p>
                    ${cardElement?.authors[0]?.verified ? '<img src="./fi_10629607.svg" alt="">' : ''}
                  </div>
                    <p>${cardElement?.others?.views}</p>
                </div>
            </div>
        </div>`
            cardContainer.appendChild(div);
        });
    } else {
        const div = document.createElement('div');
        div.innerHTML = `
       <div class="container w-screen mt-11 pt-[100px]">
            <div class="flex flex-col gap-8 justify-center items-center text-center">
                <img src="./Icon.png" />
                <p class="text-2xl font-bold text-black">Oops!! Sorry, There is no<br> content here</p>
            </div>
       </div> 
            `;

        cardContainer.appendChild(div);
    }

}
const shortViews = () => {
    // console.log("card id 3")
    let shortingData = newData.sort((a, b) => {
        const first = parseFloat(a.others.views);
        const second = parseFloat(b.others.views);
        return second - first
    });
    card(shortingData)
        //  console.log(shotData)


}


handleClickButton("1000");
handleCategory();