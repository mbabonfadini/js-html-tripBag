const lista = document.querySelector("#lista")
const form = document.querySelector("#novoItem")
const salvo = JSON.parse(localStorage.getItem("itens")) || []

salvo.forEach(element => {
    craftItem(element)
});

form.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    const nomeItem = document.querySelector("#nome")
    const qtdItem = document.querySelector("#quantidade")

    const itemAtual = {"name": nomeItem.value,
                        "qtd": qtdItem.value}
    
    

    let existe = salvo.find(element => element.name === itemAtual.name)

    if(existe){
        attLista(existe,itemAtual)
        
        
    }
    else{
        itemAtual.id = salvo[salvo.length-1] ? (salvo[salvo.length-1]).id + 1 : 0
        craftItem(itemAtual)
        addLocalStorage()
        salvo.push(itemAtual)
    }
    
})

function craftItem(item){
    let itenList = document.createElement("li")
        itenList.classList.add("item")

    let qtd = document.createElement("strong")
        qtd.innerText = item.qtd
        qtd.dataset.id = item.id
    
    itenList.appendChild(qtd)
    itenList.innerHTML += item.name
    itenList.appendChild(btRemove(item.id))
    lista.appendChild(itenList)
    
    
}

function addLocalStorage(){
    localStorage.setItem("itens",JSON.stringify(salvo))
}

function attLista(itemSalvo,item){
    item.id = itemSalvo.id
    let qtd = document.querySelector("[data-id='"+item.id+"']")
    qtd.innerHTML=item.qtd
    salvo[salvo.findIndex(element=> element.id === item.id)] = item
    addLocalStorage()
}

function btRemove(id){
    const bt = document.createElement("button")
    bt.innerText = "X"
    bt.addEventListener("click",function(){
            removeItem(this,id)
        }
    )
    return bt
}

function removeItem(tag,id){
    tag.parentNode.remove()
    salvo.splice(salvo.findIndex(element=> element.id === id),1)
    localStorage.setItem("itens",JSON.stringify(salvo)) 
}
    
