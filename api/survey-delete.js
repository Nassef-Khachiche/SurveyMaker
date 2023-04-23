const { prisma } = require("../prisma/connection");

exports.deletedata = async (req, res) => {

    const survey = await prisma.surveys.deleteMany({});

    res.redirect('/survey');
}