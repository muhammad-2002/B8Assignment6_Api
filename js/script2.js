//get categories from Api
const getTheCategories =async ()=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await res.json();
    console.log(data.data)
    displayCategories(data.data)
    

}
//display categories button in UI
const displayCategories =(categories)=>{
    const categoryContainer = document.getElementById('categoryContainer')
    categories.forEach(element => {
    const newDiv = document.createElement('div')
    newDiv.innerHTML = `<button onclick="getData('${element.category_id}')" class='btn text-[16px] hover:bg-[white] font-bold'>${element.category}</button>`
    categoryContainer.appendChild(newDiv)
        
    });
    
}

//when categories button clicked then
//load corresponding category data

const getData= async(category_id ='1000')=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`)
    const data = await res.json();
    displayDataToCard(data.data)

    console.log(data.data)

}
const displayDataToCard=(cards)=>{
    
    const cardContainer = document.getElementById('cardContainer')
    cardContainer.innerHTML='';
    const noDataContainer = document.getElementById('noDataContainer')
    noDataContainer.innerHTML=''
    if(cards<1){
        noDataContainer.classList.remove('hidden')
    }else{
        noDataContainer.classList.add('hidden')
    }
    cards.forEach(element=>{
        const newDiv = document.createElement('div')
        newDiv.innerHTML =`<div class="card bg-base-100 min-h-[380px] shadow-xl">
        <figure>
          <img class='h-[200px] w-full'
            src="${element.thumbnail}"
            alt="Shoes"
          />
        </figure>
        <div class="card-body">
        <div class ='flex items-center gap-6'><img class ='w-[40px] h-[40px] rounded-full'
        src="${element.authors[0].profile_picture}"
        alt="Shoes"
      /> <h1 class='text-xl font-bold'>${element.title}</h1></div>
          <p>${element.authors[0].profile_name}</p>
          <p>${element.others.views}</p>
        </div>
      </div>`
      cardContainer.appendChild(newDiv)
    })

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

}
getData()

//call get categories
getTheCategories()