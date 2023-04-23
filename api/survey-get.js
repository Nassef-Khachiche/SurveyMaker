const { prisma } = require("../prisma/connection");

exports.getdata = async (req, res) => 
{
    let uuid;
    let step;
    let button_text;

    let { session } = req;
    const { v4: uuidv4 } = require('uuid');

    if (session.uuid == undefined) 
    {
        session.uuid = uuidv4();
    }

    uuid = session.uuid;

    if (session.step == undefined && session.button_text == undefined) 
    {
        session.step = "Step 1: Number of Questions";
        session.button_text = "Set number of Questions";
    }

    step = session.step;
    button_text = session.button_text;


    const saved_surveys = await prisma.surveys.findMany({
        select: {
            uuid: true,
            question: true,
            answer: true,
        },
    });

    res.status(200).json({ 
        data: {
            uuid: uuid,
            step: step,
            button_text: button_text,
            amount: session.amount,
            completed: session.completedSurvey,
            survey: req.session.answers,
            saved_surveys: saved_surveys,
        },
    });
}