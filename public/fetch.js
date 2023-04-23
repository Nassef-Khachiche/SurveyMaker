function getData() {
    async function getDataInJson() {
      const response = await fetch('http://localhost:8080/survey/get-data', {}); 
      const json = await response.json();
      return json;
    }
  
    getDataInJson().then( resp=> {
        /* seperate the json data into variables */
        let data = resp.data;
        let uuid = data.uuid;
        let step = data.step;
        let completed = data.completed;
        let savedQuestions = data.saved_surveys;
        let filledQuestions = data.survey;
        let button_text = data.button_text;

        /* html elements */
        let question_box = document.querySelector('.questions');
        let amount_box = document.querySelector('.amount');
        let answer_box = document.querySelector('.answer');
        let table_box = document.querySelector('.table_holder');
        let db_box = document.querySelector('.db_box');

        let next_button = document.querySelector('.button_text');
        let save_button = document.querySelector('.save');


        /* set the html elements with the sesstion data */
        document.querySelector('.uuid').innerHTML = 'Current survey key: ' + uuid;
        document.querySelector('.step').innerHTML = step;
        document.querySelector('.button_text').innerHTML = button_text;


        /* check if element is still displayed */
        if (!question_box.classList.contains("d-none")) 
        {
            for (let i = 0; i < data.amount; i++) 
            {
                /* create element */
                const questionTextBox = document.createElement("input");

                /* edit element */
                questionTextBox.placeholder = `Question: ${i + 1}`;
                questionTextBox.name = `questions[]`;
                questionTextBox.classList.add("mt-1", "mb-1");
                questionTextBox.classList.add("question", "form-control");
                questionTextBox.required = true;

                /* append element */
                question_box.appendChild(questionTextBox);
                amount_box.classList.add("d-none");
            }
        }
        else 
        {
            /* display the necessary elemts */
            amount_box.classList.add("d-none");
            answer_box.classList.remove("d-none");
            answer_box.classList.add("d-block");
        }

        /* check if the survey was filled in, get ready to save into database */
        if (completed == true) 
        {
            answer_box.classList.remove('d-block');
            answer_box.classList.add('d-none');

            save_button.classList.remove('d-none');
            save_button.classList.add('d-block');

            next_button.classList.add('d-none');
        }

        /* the saved surveys */
        let tableDB = createTableRows(savedQuestions);
        db_box.appendChild(tableDB);

        if (savedQuestions == undefined) 
        {
            db_box.classList.remove('d-block');
            db_box.classList.add('d-none');
        }

        /* create a table in javascript with elemts fetched form /survey/get-data */
        let table = createTableRows(filledQuestions);
        table_box.appendChild(table);
    });
}


/* table builder */
function createTableRows(data) {
    var table = document.createElement('table');
    table.classList.add('table', 'table-striped');
  
    var headerRow = document.createElement('tr');
    var uuidHeader = document.createElement('th');
    var questionHeader = document.createElement('th');
    var answerHeader = document.createElement('th');
  
    uuidHeader.textContent = 'UUID';
    questionHeader.textContent = 'Question';
    answerHeader.textContent = 'Answer';
  
    headerRow.appendChild(uuidHeader);
    headerRow.appendChild(questionHeader);
    headerRow.appendChild(answerHeader);
  
    table.appendChild(headerRow);
  
    data.forEach(function(item) {
      var row = document.createElement('tr');
      var uuidCell = document.createElement('td');
      var questionCell = document.createElement('td');
      var answerCell = document.createElement('td');
  
      uuidCell.textContent = item.uuid;
      questionCell.textContent = item.question;
      answerCell.textContent = item.answer;
  
      row.appendChild(uuidCell);
      row.appendChild(questionCell);
      row.appendChild(answerCell);
  
      table.appendChild(row);
    });
  
    return table;
}