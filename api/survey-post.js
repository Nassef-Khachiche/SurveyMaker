const { prisma } = require("../prisma/connection");

exports.postdata = async (req, res) => {

    let { session } = req

    const survey = await prisma.surveys.createMany({
        data: session.answers,
    });

    res.redirect('/survey/reset-data');
}