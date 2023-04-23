exports.resetdata = async (req, res) => {

    req.session.destroy();

    res.redirect('/survey');
}