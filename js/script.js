
// get the categories data 
const getTheCategories =async () => {
    loading(true)
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const categories = data.data;
    displayCategories(categories); 
}


// display the categories btn 
const displayCategories = (categories) =>{
    const categoryContainer1 =document.getElementById('categoryContainer')
    categories.forEach(categorie=> {
        const div = document.createElement('div');
        div.innerHTML=`
        <button onclick="cardData('${categorie.category_id}')"  class="btn mt-4 bg-gray-300 hover:text-white text-black outline-none border-none  hover:border-solid border-1 text-lg border-sky-500 hover:bg-red-600">${categorie.category}</button>
        `;
        categoryContainer1.appendChild(div);
    }); 
};


// get the card data and sand the displayCard function  
const cardData = async (categoryId=1000)=> {
    const res = await fetch(` https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const cardArr = data.data
    displayCard(cardArr )
    document.getElementById('sortBybtn').addEventListener('click', ()=>{
        sortDataDisplay(cardArr, dataSort=true)
    });
}
cardData()





// display card and some condition
const displayCard = (cardArr) => {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.textContent=''
    const noDataContainer= document.getElementById('noDataContainer');
    noDataContainer.textContent = ''
    // no data found conditions 
    if(cardArr < 1 ){
        noDataContainer.classList.remove('hidden');
    }else{
        noDataContainer.classList.add('hidden');
    }



    cardArr.forEach(card => {
        // get time 
        const sec = card.others?.posted_date ;
        const timeZone = cardTime(sec)

        // display Card 
        const div = document.createElement('div');
        div.classList =`card  bg-white  h-80 shadow-md`;
        div.innerHTML=`
        <figure class="relative w-full h-40">
        <img  src="${card.thumbnail}" alt="Shoes" />
        <p  class="absolute text-white bg-[#171717] px-4 -mr-32 mt-24 rounded ${sec === 0 ? 'hidden' : ''}">${timeZone}</p>
        </figure>
        <div class="pt-4 pl-2">
        <div class="flex justify-start items-center mb-4">
                <div class="  pr-2 ">
                    <img class="rounded-full w-8 h-8 " src="${card.authors[0].profile_picture}" alt="">
                    
                </div>
                <div class="">
                    <h1 class="text-xl">${card.title}</h1>
                </div>
        </div>
        <div class="flex justify-start items-center gap-3">
            <P>${card.authors[0].profile_name}</P>
            <p> ${card.authors[0].verified? `<img src="images/Group 3.png" alt="">` : ''} </P>
         </div>
        
        <p>${card.others.views}</p>
        </div>
     `;
     cardContainer.appendChild(div)
     
    });
   
    // display no data found 
    const div = document.createElement('div');
    div.innerHTML=`
    <div class="flex justify-center ">
        <img src="images/Icon.png" alt="">
    </div>
    <h1 class="text-4xl font-bold text-center mt-8">
        Oops!! Sorry, There is no <br>content here
    </h1>
    `;
    noDataContainer.appendChild(div);
    loading(false)
}





// card time calculation and condition 
const cardTime = (sec) => {
    const hr = Math.floor(sec / 3600);
    const remainSec = sec % 3600 ;
    const minutes = Math.floor(remainSec / 60 );

    if(hr === 0 && minutes === 0){
        return '';
    }else{
        return `${hr} hrs ${minutes} min ago`;
    }
}


// loading condition
const loading = (isLoading) => {
    const spenner = document.getElementById('spenner')
    if(isLoading){
        spenner.classList.remove('hidden')
    }else{
        spenner.classList.add('hidden')
    }
}



//  sort by views btn condition 
const sortDataDisplay = (categories, dataSort = false ) => {
    categories.forEach(categorie => {
        const views =categorie.others?.views
        categorie.convert =  viewsToNum(views)
    });
    categories.sort((a, b)=> b.convert - a.convert);
    displayCard(categories)
}
const viewsToNum = (viewString) => {
    const multiply = viewString.endsWith('K') ? 1000 : 1 ;
    return parseFloat(viewString)* multiply ;
}
// default call the get categories 
getTheCategories()