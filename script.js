const plusBtn=document.querySelector('#plus');
const input=document.querySelector("#inputText");
const container=document.querySelector(".inputContainer")
const outContainer=document.querySelector(".outputContainer")
let clearBtn=document.createElement('button');
clearBtn.innerText="Clear all The Items";
outContainer.appendChild(clearBtn);

let editId="";



outContainer.style.display="none";

function Plus() {
    let task=document.createElement('div');
    task.classList.add("task");
    outContainer.appendChild(task);

    let deleteBtn=document.createElement('button');
    deleteBtn.innerText="delete";
    deleteBtn.classList.add('delete');
    
    deleteBtn.addEventListener('click',function Delete() {
        task.remove();
        
            
    })
    let li=document.createElement('li');
    li.textContent=input.value;
    li.classList.add("outputTextStyle")
    
    task.appendChild(li);
    let editBtn=document.createElement('button');
    editBtn.innerText="edit";
    editBtn.classList.add('tick');
    li.append(editBtn); 
        
    const id= new Date().getTime().toString();
   
    const atrr=document.createAttribute('data-id');
    atrr.value=id;
    li.setAttributeNode(atrr)
    li.append(deleteBtn);
    AddToLocalStorage(id,input.value);
    /* GetFromLocalStorage(); */
    let tasks=document.querySelectorAll(".task");
    if(tasks.length<2){clearBtn.style.display="none"}
    else{clearBtn.style.display="block"}
    
    outContainer.style.display="inherit";

    clearBtn.addEventListener('click', ()=>{
        
        outContainer.style.display="none";
        
        tasks.forEach(element => {
                element.remove();
        });
    })
    EditLocalStorage(editId,input.value)

    input.value="";
    editBtn.addEventListener('click',function UFF(e) {
        
        var target = e.target;
        var parent = target.parentElement       
        plusBtn.style.display="none";
        let  inputEditBtn=document.createElement('button');
        inputEditBtn.innerText="edit";
        inputEditBtn.setAttribute('id','plus');
       
        container.append(inputEditBtn);
        inputEditBtn.addEventListener("click", ()=>{
            
            parent.textContent=`${input.value}`;
            let editBtn=document.createElement('button');
            editBtn.innerText="edit";
            editBtn.classList.add('tick');
            parent.append(editBtn);
            editBtn.addEventListener("click",UFF);
            let deleteBtn=document.createElement('button');
            deleteBtn.innerText="delete";
            deleteBtn.classList.add('delete');
            parent.append(deleteBtn);
            deleteBtn.addEventListener('click',()=> {
                task.remove();
                
                    
            })
            
            inputEditBtn.style.display="none";
            plusBtn.style.display="block";
            input.value="";
        },{once:false})
        
    
    })
}    
plusBtn.addEventListener('click', Plus)

window.addEventListener("keydown", (e)=>{
    if(e.code=="Enter"){
        Plus();
    }
})
function AddToLocalStorage(id,value){
    const groceries={id,value}
    let items=localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")):[];
    console.log(items)
    items.push(groceries);
    
    localStorage.getItem('list',JSON.stringify(items))
    

}
function GetFromLocalStorage(){
    return localStorage.getItem("list")? JSON.parse(localStorage.getItem("list")):[];

}
function EditLocalStorage(id,value){

}
GetFromLocalStorage();
function RemoveLocalStorage(id){
    let items=GetFromLocalStorage();
    items=items.filter(function(item){
        if(item.id!==id){
            return item;
        }
    })
    localStorage.getItem('list',JSON.stringify(items))
}