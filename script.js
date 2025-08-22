// ========== COMMON ELEMENTS & UTILITIES ==========
function checkAndHideSection(section) {
    section.style.display = section.children.length === 0 ? 'none' : 'block';
}

function alertPopupDaily(message) {
    const alert = document.createElement('div');
    alert.classList.add('alertDaily');
    alert.textContent = message;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
}

// ========== DAILY TASKS ==========

const dailyInput = document.getElementById('daily');
const dailyAddBtn = document.getElementById('daily-add-btn');
const dailyPlusBtn = document.getElementById('daily-plus-btn');
const dailyUnCompleted = document.getElementById('daily-un-completed');
const dailyCompleted = document.getElementById('daily-completed');
const dailyTotalStar = document.getElementById('daily-total-value');
const dailyCompletedStar = document.getElementById('daily-completed-value');
const dailyDeleteAll = document.querySelector('.daily-delete');
const dailyDeleteAllPopup = document.querySelector('.daily-delete-popup');
const deleteYesbtn = document.querySelector('.yes');
const deleteNobtn = document.querySelector('.no');
const dailyImage = document.getElementById('img-daily');


function showPopupDaily(message) {
    const popupContainer = document.querySelector('.daily-pop');
    if (!popupContainer){ 
        return;
    }
    popupContainer.innerHTML = '';
    const popup = document.createElement('div');
    popup.textContent = message;
    popup.className = 'popup-message';
    popupContainer.appendChild(popup);
    setTimeout(() => popup.remove(), 3000);
}

function modifyStarValueColor(totalStar, completedStar) {
    completedStar.style.color = (Number(totalStar.textContent) > 0 && Number(completedStar.textContent) === Number(totalStar.textContent)) ? 'green' : 'red';
}

function dpopUp(dtotalStar, dcompletedStar) {
    if (Number(dtotalStar.textContent) > 0 && Number(dcompletedStar.textContent) === Number(dtotalStar.textContent) && dailyInput.value.trim() === '') {
        showPopupDaily("Wow!! You Completed Today's Tasks 🙌");
    }
}

function toggleInput(input, button, plusIcon) {
    if (input.style.display === 'none' || input.style.display === '') {
        input.style.display = 'inline';
        button.style.display = 'inline';
        plusIcon.classList.replace('fa-plus', 'fa-xmark');
    } else {
        input.style.display = 'none';
        button.style.display = 'none';
        plusIcon.classList.replace('fa-xmark', 'fa-plus');
    }
}

function saveDailyTasksToLocalStorage() {
    const dailyTasks = [];
    dailyUnCompleted.querySelectorAll('.result-element').forEach(task => {
        const name = task.querySelector('span').textContent.replace("❗", "").trim();
        dailyTasks.push({ name, completed: false });
    });
    dailyCompleted.querySelectorAll('.result-element').forEach(task => {
        const name = task.querySelector('span').textContent.replace("✅", "").trim();
        dailyTasks.push({ name, completed: true });
    });
    localStorage.setItem("dailyTasks", JSON.stringify(dailyTasks));
}

function loadDailyTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem("dailyTasks")) || [];
    savedTasks.forEach(task => {
        dailyInput.value = task.name;
        dailyAddBtn.click();
        if (task.completed) {
            const lastTask = dailyUnCompleted.lastElementChild;
            if (lastTask) lastTask.querySelector('i').click();
        }
    });
}

dailyAddBtn.addEventListener('click', () => {
    if (dailyInput.value.trim() === '') {
        alertPopupDaily('!⚠️Please enter Daily Task⚠️!');
        return;
    }

    const newDiv = document.createElement('div');
    newDiv.classList.add("result-element");

    const textContainer = document.createElement('div');
    textContainer.style.display = "flex";
    textContainer.style.alignItems = "center";

    const taskText = document.createElement('span');
    taskText.textContent = dailyInput.value ;
    taskText.classList.add('daily-checkbox');

    const checkboxIcon = document.createElement('i');
    checkboxIcon.classList.add('fa-regular', 'fa-circle');
    checkboxIcon.style.marginRight = '10px';
    checkboxIcon.style.cursor = 'pointer';

    const iconDeleteEdit = document.createElement('span');
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa-solid', 'fa-trash');
    trashIcon.style.marginLeft = '10px';
    trashIcon.style.cursor = 'pointer';

    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-regular', 'fa-pen-to-square');
    editIcon.style.marginLeft = '10px';
    editIcon.style.cursor = 'pointer';

    textContainer.append(checkboxIcon, taskText);
    iconDeleteEdit.append(trashIcon, editIcon);
    newDiv.append(textContainer, iconDeleteEdit);

    dailyUnCompleted.style.display = 'inline';
    dailyUnCompleted.append(newDiv);
    dailyTotalStar.textContent = Number(dailyTotalStar.textContent) + 1;
    dailyInput.value = "";

    dailyImage.style.display = 'none';

    modifyStarValueColor(dailyTotalStar, dailyCompletedStar);
    saveDailyTasksToLocalStorage();

    trashIcon.addEventListener('click', () => {
        newDiv.remove();
        if (taskText.style.textDecoration === 'line-through') {
            dailyCompletedStar.textContent = Number(dailyCompletedStar.textContent) - 1;
        }
        dailyTotalStar.textContent = Number(dailyTotalStar.textContent) - 1;
        if(dailyTotalStar.textContent == 0){
            dailyImage.style.display = 'inline-block';
        }
        else{
            dailyImage.style.display = 'none';
        }
        checkAndHideSection(dailyUnCompleted);
        checkAndHideSection(dailyCompleted);
        modifyStarValueColor(dailyTotalStar, dailyCompletedStar);
        saveDailyTasksToLocalStorage();
    });

    editIcon.addEventListener('click', () => {
        if (dailyInput.value.trim() !== '') {
            alertPopupDaily('⚠️Input Area is not Empty⚠️');
        } else {
            dailyInput.value = taskText.textContent.trim()
            newDiv.remove();
            dailyTotalStar.textContent = Number(dailyTotalStar.textContent) - 1;
        if(dailyTotalStar.textContent == 0){
            dailyImage.style.display = 'inline-block';
        }
        else{
            dailyImage.style.display = 'none';
        }
            if (taskText.style.textDecoration === 'line-through') {
                dailyCompletedStar.textContent = Number(dailyCompletedStar.textContent) - 1;

        if(dailyTotalStar.textContent == 0){
            dailyImage.style.display = 'inline-block';
        }
        else{
            dailyImage.style.display = 'none';
        }
            }
            checkAndHideSection(dailyUnCompleted);
            checkAndHideSection(dailyCompleted);
            saveDailyTasksToLocalStorage();
        }
    });

    checkboxIcon.addEventListener('click', () => {
        const isCompleted = taskText.style.textDecoration !== 'line-through';
        if (isCompleted) {
            taskText.textContent = taskText.textContent.replace("❗", "✅");
            taskText.style.textDecoration = 'line-through';
            checkboxIcon.classList.replace("fa-circle", "fa-circle-check");
            dailyCompletedStar.textContent = Number(dailyCompletedStar.textContent) + 1;
            dailyUnCompleted.removeChild(newDiv);
            dailyCompleted.appendChild(newDiv);
            dpopUp(dailyTotalStar, dailyCompletedStar);
        } else {
            taskText.textContent = taskText.textContent.replace("✅", "❗");
            taskText.style.textDecoration = 'none';
            checkboxIcon.classList.replace("fa-circle-check", "fa-circle");
            dailyCompletedStar.textContent = Number(dailyCompletedStar.textContent) - 1;
            dailyCompleted.removeChild(newDiv);
            dailyUnCompleted.appendChild(newDiv);
        }
        checkAndHideSection(dailyUnCompleted);
        checkAndHideSection(dailyCompleted);
        modifyStarValueColor(dailyTotalStar, dailyCompletedStar);
        saveDailyTasksToLocalStorage();
    });
});

dailyInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') dailyAddBtn.click();
});

if (dailyDeleteAll) {
    dailyDeleteAll.addEventListener('click', () => {
        if (dailyDeleteAllPopup.style.display !== 'block' &&
            (dailyUnCompleted.children.length > 0 || dailyCompleted.children.length > 0)) {
            dailyDeleteAllPopup.style.display = 'block';
        } else {
            dailyDeleteAllPopup.style.display = 'none';
        }
    });
}

deleteYesbtn.addEventListener('click', () => {
   const taskDivsUnCompleted = dailyUnCompleted.querySelectorAll(".result-element");
   const taskDivsCompleted = dailyCompleted.querySelectorAll(".result-element");

   taskDivsUnCompleted.forEach(task => task.remove());
   taskDivsCompleted.forEach(task => task.remove());

    dailyInput.value = '';
    dailyTotalStar.textContent = '0';
    dailyCompletedStar.textContent = '0';
    checkAndHideSection(dailyUnCompleted);
    checkAndHideSection(dailyCompleted);
    modifyStarValueColor(dailyTotalStar,dailyCompletedStar);
    dailyDeleteAllPopup.style.display ='none';
    dailyImage.style.display = 'inline-block'

    localStorage.removeItem("dailyTasks");
});

deleteNobtn.addEventListener('click', () => {
    dailyDeleteAllPopup.style.display = 'none';
});

dailyPlusBtn.addEventListener('click', () => toggleInput(dailyInput, dailyAddBtn, dailyPlusBtn));
loadDailyTasksFromLocalStorage();

// ========== FUTURE TASKS ==========

const futureInput = document.getElementById('future');
const futureAddBtn = document.getElementById('future-add-btn');
const secondUnCompleted = document.getElementById('future-un-completed');
const secondCompleted = document.getElementById('future-completed');
const secondTotalStar = document.getElementById('future-total-value');
const secondCompletedStar = document.getElementById('future-completed-value');
const secondDeleteAll = document.querySelector('.future-delete');
const secondDeleteAllPopup = document.querySelector('.future-delete-popup');
const secondYesbtn = document.querySelector('.secondYes');
const secondNobtn = document.querySelector('.secondNo');
const secondPlusBtn = document.getElementById('future-plus-btn');
const secondImage = document.getElementById('img-future');

function secondShowPopup(message) {
  const popupParent = document.querySelector('.future-popup'); // select existing div

  popupParent.innerHTML = '';
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageDiv.className = 'popup-message'; 
  popupParent.appendChild(messageDiv); 

  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}

function secondModifyStarValueColor(totalStar, completedStar) {
    completedStar.style.color = (Number(totalStar.textContent) > 0 && Number(completedStar.textContent) === Number(totalStar.textContent)) ? 'green' : 'red';
}

function spopUp(stotalStar, scompletedStar) {
    if (Number(stotalStar.textContent) > 0 && Number(scompletedStar.textContent) === Number(stotalStar.textContent) && futureInput.value.trim() === '') {
        secondShowPopup("Hyy!! You Completed Occasional Tasks 🙌");
    }
}

function secondToggleInput(input, button, plusIcon) {
    if (input.style.display === 'none' || input.style.display === '') {
        input.style.display = 'inline';
        button.style.display = 'inline';
        plusIcon.classList.replace('fa-plus', 'fa-xmark');
    } else {
        input.style.display = 'none';
        button.style.display = 'none';
        plusIcon.classList.replace('fa-xmark', 'fa-plus');
    }
}

function saveSecondTasksToLocalStorage() {
    const secondTasks = [];
    secondUnCompleted.querySelectorAll('.result-element').forEach(task => {
        const name = task.querySelector('span').textContent.replace("❗", "").trim();
        secondTasks.push({ name, completed: false });
    });
    secondCompleted.querySelectorAll('.result-element').forEach(task => {
        const name = task.querySelector('span').textContent.replace("✅", "").trim();
        secondTasks.push({ name, completed: true });
    });
    localStorage.setItem("secondTasks", JSON.stringify(secondTasks));
}

function loadSecondTasksFromLocalStorage() {
    const secondSavedTasks = JSON.parse(localStorage.getItem("secondTasks")) || [];
    secondSavedTasks.forEach(task => {
        futureInput.value = task.name;
        futureAddBtn.click();
        if (task.completed) {
            const secondLastTask = secondUnCompleted.lastElementChild;
            if (secondLastTask) secondLastTask.querySelector('i').click();
        }
    });
}

futureAddBtn.addEventListener('click', () => {
    if (futureInput.value.trim() === '') {
        alertPopupDaily('❗⚠️Please enter Daily Task⚠️❗');
        return;
    }
    const secondNewDiv = document.createElement('div');
    secondNewDiv.classList.add('result-element');
     
    const secondTextContainer = document.createElement('div');
    secondTextContainer.style.display = "flex";
    secondTextContainer.style.alignItems = "center";

    const secondTaskValue = document.createElement('span');
    secondTaskValue.textContent = futureInput.value.trim();
    secondTaskValue.classList.add('future-checkbox');
    
    const secondCheckboxIcon = document.createElement('i');
    secondCheckboxIcon.classList.add('fa-regular', 'fa-circle');
    secondCheckboxIcon.style.marginRight = '10px';
    secondCheckboxIcon.style.cursor = 'pointer';

    const secondIconDeleteEdit = document.createElement('span');
    const secondTrashIcon = document.createElement('i');
    secondTrashIcon.classList.add('fa-solid', 'fa-trash');
    secondTrashIcon.style.marginLeft = '10px';
    secondTrashIcon.style.cursor = 'pointer';

    const secondEditIcon = document.createElement('i');
    secondEditIcon.classList.add('fa-regular', 'fa-pen-to-square');
    secondEditIcon.style.marginLeft = '10px';
    secondEditIcon.style.cursor = 'pointer';

    secondTextContainer.append(secondCheckboxIcon,secondTaskValue);
    secondIconDeleteEdit.append(secondTrashIcon,secondEditIcon);
    secondNewDiv.append(secondTextContainer,secondIconDeleteEdit);
     
    secondUnCompleted.style.display ='block';
    secondUnCompleted.appendChild(secondNewDiv);  
    secondTotalStar.textContent = Number(secondTotalStar.textContent)+1;
    futureInput.value = '';

    if(secondTotalStar.textContent == 0){
            secondImage.style.display = 'inline-block';
        }
        else{
            secondImage.style.display = 'none';
        }

    secondModifyStarValueColor(secondTotalStar,secondCompletedStar);
    saveSecondTasksToLocalStorage();

    secondTrashIcon.addEventListener('click', () => {
        secondNewDiv.remove();
        if (secondTaskValue.style.textDecoration === 'line-through') {
            secondCompletedStar.textContent = Number(secondCompletedStar.textContent) - 1;
        
        if(secondTotalStar.textContent == 0){
            secondImage.style.display = 'inline-block';
        }
        else{
            secondImage.style.display = 'none';
        }

        }
        secondTotalStar.textContent = Number(secondTotalStar.textContent) - 1;

        if(secondTotalStar.textContent == 0){
            secondImage.style.display = 'inline-block';
        }
        else{
            secondImage.style.display = 'none';
        }

        checkAndHideSection(secondUnCompleted);
        checkAndHideSection(secondCompleted);
        secondModifyStarValueColor(secondTotalStar, secondCompletedStar);
        saveSecondTasksToLocalStorage();
    });


     secondEditIcon.addEventListener('click', () => {
        if (futureInput.value.trim() !== '') {
            alertPopupDaily('⚠️Input Area is not Empty⚠️');
        } else {
            futureInput.value = secondTaskValue.textContent.trim();
            secondNewDiv.remove();
            secondTotalStar.textContent = Number(secondTotalStar.textContent) - 1;

        if(secondTotalStar.textContent == 0){
            secondImage.style.display = 'inline-block';
        }
        else{
            secondImage.style.display = 'none';
        }

        if (secondTaskValue.style.textDecoration === 'line-through') {
            secondCompletedStar.textContent = Number(secondCompletedStar.textContent) - 1;

        if(secondTotalStar.textContent == 0){
            secondImage.style.display = 'inline-block';
        }
        else{
            secondImage.style.display = 'none';
        }

            }
            checkAndHideSection(secondUnCompleted);
            checkAndHideSection(secondCompleted);
            saveSecondTasksToLocalStorage();
        }
    });

     
      secondCheckboxIcon.addEventListener('click', () => {
        const isSecondCompleted = secondTaskValue.style.textDecoration !== 'line-through';
        if (isSecondCompleted) {
            secondTaskValue.textContent = secondTaskValue.textContent.replace("❗", "✅");
            secondTaskValue.style.textDecoration = 'line-through';
            secondCheckboxIcon.classList.replace("fa-circle", "fa-circle-check");
            secondCompletedStar.textContent = Number(secondCompletedStar.textContent) + 1;
            secondUnCompleted.removeChild(secondNewDiv);
            secondCompleted.appendChild(secondNewDiv);
            spopUp(secondTotalStar, secondCompletedStar);
            
        } else {
            secondTaskValue.textContent = secondTaskValue.textContent.replace("✅", "❗");
            secondTaskValue.style.textDecoration = 'none';
            secondCheckboxIcon.classList.replace("fa-circle-check", "fa-circle");
            secondCompletedStar.textContent = Number(secondCompletedStar.textContent) - 1;
            secondCompleted.removeChild(secondNewDiv);
            secondUnCompleted.appendChild(secondNewDiv);
            
        }
        checkAndHideSection(secondUnCompleted);
        checkAndHideSection(secondCompleted);
        secondModifyStarValueColor(secondTotalStar, secondCompletedStar);
        saveSecondTasksToLocalStorage();
    });
});

    futureInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') futureAddBtn.click();
});

if (secondDeleteAll) {
    secondDeleteAll.addEventListener('click', () => {
        if (secondDeleteAllPopup.style.display !== 'block' &&
            (secondUnCompleted.children.length > 0 || secondCompleted.children.length > 0)) {
            secondDeleteAllPopup.style.display = 'block';
        } else {
            secondDeleteAllPopup.style.display = 'none';
        }
    });
}

secondYesbtn.addEventListener('click', () => {
    const taskDivsUnCompleted = secondUnCompleted.querySelectorAll(".result-element");
    const taskDivsCompleted = secondCompleted.querySelectorAll(".result-element");

    taskDivsUnCompleted.forEach(task => task.remove());
    taskDivsCompleted.forEach(task => task.remove());

    futureInput.value = '';
    secondTotalStar.textContent = '0';
    secondCompletedStar.textContent = '0';
    secondDeleteAllPopup.style.display = 'none';
    secondModifyStarValueColor(secondTotalStar, secondCompletedStar);
    checkAndHideSection(secondUnCompleted);
    checkAndHideSection(secondCompleted);

    if(secondTotalStar.textContent == 0){
            secondImage.style.display = 'inline-block';
        }
        else{
            secondImage.style.display = 'none';
        }
    localStorage.removeItem("secondTasks");
}); 

secondNobtn.addEventListener('click', () => {
    secondDeleteAllPopup.style.display = 'none';
});

secondPlusBtn.addEventListener('click', () => secondToggleInput(futureInput, futureAddBtn, secondPlusBtn));
loadSecondTasksFromLocalStorage();
