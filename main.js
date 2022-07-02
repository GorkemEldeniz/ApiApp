const form = document.querySelector('form')
const load = document.querySelector('.lds-ring')

window.addEventListener('load',e => {
    getData()
    form.addEventListener('submit',e =>{
        e.preventDefault()
        let item = Object.fromEntries(new FormData(e.target)) 
        postData(item)
    })
})


const url = 'http://localhost:3004/products'


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

const updateData = async (id,data) => {
    try{
        let res = await fetch(url+`/${id}`,{
            method : 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify(data)
        })
        res = await res.json()
        console.log(res)
    }
    catch(er){
        console.log(er.message)
    }
}

const removeData = async (id) => {
    try{
        let res = await fetch(url+`/${id}`,{
            method : 'DELETE'
        })
        if(res.ok){
            console.log('silindi..')
        }
        res = await res.json()
        console.log(res)
    }
    catch(er){
        console.log(er.message)
    }
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
        initialData = [...data]
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
            <button class='${item.id} delete'>Sil</button>
            <button id=${item.id} class='update'>Güncelle</button>

            <form action="" class="update-form">
            <input type="text" name="brand" placeholder="brand" value=${item.brand}>
            <br>
            <input type="text" name="type" placeholder="type" value=${item.type}>
            <br>
            <input type="number" name="price" placeholder="price" value=${item.price}>
            <br>
            <input type="text" name="img" placeholder="image" value=${item.img}>
            <br>
            <input type="submit">
        </form>
        `
        document.body.appendChild(section)

    })
    const btns = document.querySelectorAll('.delete');
    [...btns].forEach(btn => {
        btn.addEventListener('click', e => {
            let [id,del] = e.target.className.split(' ')
            removeData(id)
        })
    })
    
    let show = false
    const upbtns = document.querySelectorAll('.update');
    [...upbtns].forEach(upd => {
        upd.addEventListener('click', e => {
            let id = e.target.getAttribute( 'id' );
            show = !show
            upd.nextElementSibling.classList.toggle('show',show)

            upd.nextElementSibling.addEventListener('submit',e => {
                e.preventDefault()
                let item = Object.fromEntries(new FormData(e.target)) 
                console.log(item)
                updateData(id,item)                
            })
        })
    })    

}