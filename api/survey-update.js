exports.updatedata = async (req, res) => 
{
    let { amount, questions, answer } = req.body;
    let { session } = req;

    session.stepCount++;
    
    if (questions != undefined) 
    {
        session.questions = questions;
    }

    if (session.amount == undefined) 
    {
        session.amount = parseInt(amount);
        session.stepCount = 1;
        session.questionCount = 1;
        session.answers = [];
        session.completedSurvey = false;
        session.hideAnswer = "";
        session.showSave = "";
    }

    if (session.stepCount == 1) 
    {
        session.step = `Step 2: Enter all ${amount.toString()} Questions`;
        session.button_text = "Set Questions";
    }

    if (session.stepCount >= 2 && session.completedSurvey != true) 
    {
        let next_question = session.questionCount;

        session.step = `Step ${session.stepCount}: Question: ${session.questions[session.questionCount - 1]}`;
        session.button_text = `Submit answer for question ${session.questionCount} and go to Question ${session.questionCount} : ${session.questions[session.questionCount - 1]}`;
        
        if (session.stepCount >= 3 && session.completedSurvey != true) 
        {
            let survey = { 
                uuid: session.uuid,
                question: session.questions[session.questionCount - 2], 
                answer: answer,
            };
            
            session.answers.push(survey);
            console.log(session.answers);
        }

        session.hideQuestions = "d-none";

        // session.answers.push(session.questionCount + 1, session.amount);

        // Check if amount is equeal to questionCount
        if (session.questionCount == session.amount + 1)
        {
            session.button_text = `Submit answer for question ${session.questionCount} and finish the survery`;
            session.completedSurvey = true;

            console.log('completed the survey');

            session.step = `Step ${session.stepCount}: Save all answers to the database`
            session.hideAnswer = "d-none";
            session.showSave = "d-block";
        }

        session.questionCount++;
    }

    res.redirect('/survey');
}   