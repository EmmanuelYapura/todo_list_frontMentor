const tasks = [
    "Complete online Javascript course",
    "Jog around the park 3x",
    "10 minutes meditation",
    "Read for 1 hour",
    "Pick up groceries",
    "Complete Todo App on Frontend Mentor"
];

let id = 0;

let sizeTasks = tasks.length;

function changeSizeTasks ( value ) {
    const p = document.querySelector('.items-left');
    if(sizeTasks + value >= 0) {
        p.innerText = `${sizeTasks += value} items left`;
    }
}


const $input = document.querySelector('input');

$input.addEventListener('keydown' , (e) => {
    if(e.key === 'Enter' && $input.value !== ''){
        createTask( $input.value );
        changeSizeTasks(1);
        $input.value = "";
    }
})

function taskList () { 
    tasks.forEach( (task ) => {
        createTask(task);
    });
};

function createTask ( text ) {
    const containerItems = document.querySelector('.container-items');

    let complete = false;
    let light = /moon/.test($iconTheme.src);

    let div = document.createElement('div');
    div.classList.add('container-item');
    div.draggable = true;
    div.id = id++;

    div.addEventListener('dragstart' , (e) => {
        let selected = document.getElementById(`${e.target.id}`);
        console.log(selected)
        console.log(e)
        containerItems.addEventListener('dragover', (e) => {
            e.preventDefault();
        })

        containerItems.addEventListener('drop', (e) => {
            containerItems.appendChild(selected);
            selected = null;
        })
    })

    let circle = document.createElement('div');
    circle.classList.add('circle');

    
    let img = document.createElement('img');
    img.classList.add('displayNone');
    img.src = './images/icon-check.svg';
    
    circle.appendChild(img);
    
    let p = document.createElement('p');
    p.classList.add('text-item');
    p.innerText = text;
    
    if(light){
        div.classList.toggle('bg-light');
        p.classList.toggle('text-light');
    }
    
    circle.addEventListener('click', () => {
        p.classList.toggle('task-complete');
        img.classList.toggle('displayNone');
        circle.classList.toggle('icon-complete');
        div.classList.toggle('div-complete');

        if(complete){
            changeSizeTasks(1);
            complete = !complete;
        }else{
            changeSizeTasks(-1);
            complete = !complete;
        }
    })
    
    p.addEventListener('click', () => {
        p.classList.toggle('task-complete');
        img.classList.toggle('displayNone');
        circle.classList.toggle('icon-complete');
        div.classList.toggle('div-complete');

        if(complete){
            changeSizeTasks(1);
            complete = !complete;
        }else{
            changeSizeTasks(-1);
            complete = !complete;
        }
    })
    
    let cross = document.createElement('div');
    
    cross.addEventListener('click', () => {
        deleteTask( div );
    });
    
    let crossImg = document.createElement('img');
    crossImg.classList.add('cross');
    crossImg.src = './images/icon-cross.svg';
    
    cross.appendChild(crossImg);
    
    div.appendChild(circle);
    div.appendChild(p);
    div.appendChild(cross);

    containerItems.appendChild(div);
}

function deleteTask ( task ) {
    if(!task.classList.contains('div-complete')) changeSizeTasks(-1); 
    task.remove();
}

function changeBodyBg( ref ){
    ref.classList.toggle('bg-mobile-light');
    ref.classList.toggle('bg-desktop-light');
}

function changeTheme( e ){
    const inputColor = document.querySelector('.input');

    if(/sun/.test(e.target.src)) {
        let newSrc = e.target.src.replace("sun", "moon").split("images")[1];
        $iconTheme.src = `/images${newSrc}`;
        inputColor.classList.replace('text-dark','text-light');
    }else{
        let newSrc = e.target.src.replace("moon", "sun").split("images")[1];
        $iconTheme.src = `/images${newSrc}`;
        inputColor.classList.replace('text-light', 'text-dark');
    }
    
    const body = document.querySelector('body');
    body.classList.toggle('body-light');

    if(window.innerWidth > 375){
        changeBodyBg(body);
    }else{
        changeBodyBg(body);
    }

    const input = document.querySelector('.container-input');
    input.classList.toggle('bg-light');


    const items = document.querySelectorAll('.container-item');
    items.forEach( item => item.classList.toggle('bg-light'));
    
    const text = document.querySelectorAll('.text-item');
    text.forEach( p => p.classList.toggle('text-light'))

    const options = document.querySelector('.container-options');
    options.classList.toggle('bg-light');

    const optionsTasks = document.querySelector('.container-options-task');
    optionsTasks.classList.toggle('bg-light');
}

const $iconTheme = document.querySelector('.icon-theme');

$iconTheme.addEventListener('click', (e) => {
    changeTheme(e);
})

const $clear = document.querySelector('.clear-completed');

$clear.addEventListener('click', () => {
    const arrayItems = document.querySelectorAll('.container-item');
    for (let i = arrayItems.length - 1; i >= 0; i--) {
        deleteTask(arrayItems[i]);  
    }
});

const $all = document.querySelector('.all');

$all.addEventListener('click', () => {
    const arrayItems = document.querySelectorAll('.container-item');
    arrayItems.forEach( div => {
        if(div.classList.contains('displayNone')){
            div.classList.toggle('displayNone');
        }
    });
})

const $active = document.querySelector('.active');

$active.addEventListener('click', () => {
    const arrayItems = document.querySelectorAll('.container-item');
    arrayItems.forEach( div => {
        if(div.classList.contains('div-complete')){
            div.classList.toggle('displayNone');
        }
        if(!div.classList.contains('div-complete') && div.classList.contains('displayNone')){
            div.classList.toggle('displayNone');
        }
    });
})

const $completed = document.querySelector('.completed');

$completed.addEventListener('click', () => {
    const arrayItems = document.querySelectorAll('.container-item');
    arrayItems.forEach( div => {
        if(!div.classList.contains('div-complete')){
            div.classList.toggle('displayNone');
        }
        if(div.classList.contains('div-complete') && div.classList.contains('displayNone')){
            div.classList.toggle('displayNone');
        }
    });
})

taskList();
