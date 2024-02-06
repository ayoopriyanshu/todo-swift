let tasks=[];
let previousTasks =[];
displayTasks();
displayPrevious();

function signInUser(){
    let uName=document.querySelector('#uname-input').value;
    let pKey=document.querySelector('#pkey-input').value;
    if(isNotValid(uName,pKey)){
        document.querySelector('#uname-input').value="";
        document.querySelector('#pkey-input').value="";
        document.querySelector('#reg-info').innerHTML=`<h5 style="color: red;">Invalid Username or Passkey</h5>`;
        setTimeout(function(){
        document.querySelector('#reg-info').innerHTML="";
        },2000);
    }
    else{
        document.querySelector('#uname-input').value="";
        document.querySelector('#pkey-input').value="";
        document.querySelector('#reg-info').innerHTML=`<h5 style="color: rgb(23, 235, 23);"">Signed In Successfully !!!</h5>`;
        setTimeout(function emptyDiv(){
            document.querySelector('#reg-info').innerHTML=" ";
        },2000);
        document.querySelector('#signup-conatiner').innerHTML=`
        <h4>Hey whats happening <u id="user-name" style="cursor: pointer;">${uName}</u> </h4> 
        `;
        //displayDashboard(uName);
        //displayPrevious(uName);
        document.getElementById('tasks-dashboard').style.display="block";
        displayTasks();
        displayPrevious();
        //displayTasks(uName);
    }
}
function isNotValid(uName,pKey){
    return (!localStorage.getItem(`user_${uName}`,`${pKey}`));

}

function addTask(){
    let task = document.querySelector('#input-box').value;
    let date = document.querySelector('#date-input-box').value;
    
    tasks.push({item:task,dueDate:date});
    //let userName=document.querySelector('#userName').innerText;
    displayTasks();
    displayPrevious();
    
}

function displayTasks(){
    console.log(document.querySelector('#user-name').innerText);
    let displaySection = document.querySelector('.div-container');
    let newHtml=`
            <span><h4>Task</h4></span>
            <span><h4>Due Date</h4></span>
            <h4> </h4>
    `;
    
    //console.log(tasks_stored);
    //let tasks3=JSON.parse(tasks1);
    for(let i=0; i<tasks.length; i++){
        let{item,dueDate}=tasks[i];
        //let{previousItem,previousDuedate}=previousTasks[i];
        newHtml += `
            <span>${item}</span>
            <span>${dueDate}</span>
            <button id="del-btn" class="btn" onclick="tasks.splice(${i},1);
            previousTasks.push({previousItem:'${item}',previousDueDate:'${dueDate}'});
            displayTasks(); displayPrevious();"><img src="bin.png" width="13">Delete</button>
        `;
    }
    if(tasks.length!=0)
    displaySection.innerHTML = newHtml;
    else displaySection.innerHTML = `
    <span><h4>Task</h4></span>
    <span><h4>Due Date</h4></span>
    <h4> </h4>
    <p class="grey-null">no upcoming tasks</p>
`;
}

function displayPrevious(){
    let displaySection = document.querySelector('.previous-section');
    let newHtml='';
    
    for(let i=0; i<previousTasks.length; i++){
        //let{previousItem,previousDuedate}=previousTasks[i];
        newHtml += `
            <span>${previousTasks[i].previousItem}</span>
            <span>${previousTasks[i].previousDueDate}</span>
            <button id="del-btn" class="btn" onclick=" previousTasks.splice(${i},1);
            displayPrevious(); "><img src="trash.png" width="13">Forget</button>
        `;
    }
    if(previousTasks.length!=0)
    displaySection.innerHTML = newHtml;
    else displaySection.innerHTML = '<p class="grey-null">no previous tasks</p>';
}

