const form = document.querySelector('form')
const load = document.querySelector('.lds-ring')

window.addEventListener('load',e => {
    getData()
    form.addEventListener('submit',e =>{
        e.preventDefault()
        const item = Object.fromEntries(new FormData(e.target))
        postData(item)
    })
})



const url = 'http://localhost:3000/products'


const postData = async (item) => {
    let response = await fetch(url,{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(item)        
    })
    response = await response.json()
    console.log(response)

}

const getData =  () => {
    fetch(url,{
        method : 'GET',
        headers: {
            'Content-Type': 'application/json'
          },        
    }).then((data) => {
        const {ok,status} = data
        if(ok){
            load.style.display  = 'none'
        }
        return data
    })
    .then((data) => data.json())
    .then((data) => {
        showData(data)
        return data        
    }).catch(err => {
        console.log(err)
    }).finally(() => {
        console.log('işlem bitti')
    })
}


const showData = (data = []) => {
    data.forEach((item,id) => {
        let section = document.createElement('section') 
        section.innerHTML = `
            <h3>${item.brand}</h3>
            <span class="type">${item.type}</span>
            <img src=${item.img} alt=${item.id}>
            <span class="price">${item.price}</span>       
        `
        document.body.appendChild(section)
    })
}