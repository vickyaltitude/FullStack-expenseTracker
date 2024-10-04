const uLists = document.getElementById('expenseList');


const getData = async() =>{
    try{
      const receiveData = await fetch('http://localhost:3500/exp-details');
      const convertData = await receiveData.json();

      convertData.forEach(lists =>{
        const list = document.createElement('li');
        const li = `Amount : ${lists.amount} 
                    Description : ${lists.description}
                    Category : ${lists.category}  <a href='/edit-exp/${lists.id}'>Edit</a>  <a href='/delete-exp/${lists.id}'>Delete</a>`

        list.innerHTML = li;
        uLists.appendChild(list);
      })
     
      
    }catch(err){
        console.log(err)
    }
}

getData();