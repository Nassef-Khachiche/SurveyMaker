const express = require('express');
router = express.Router();

const { updatedata } = require('./api/survey-update.js');
const { getdata } = require('./api/survey-get.js');
const { deletedata } = require('./api/survey-delete.js');
const { postdata } = require('./api/survey-post.js');
const { resetdata } = require('./api/survey-reset.js');


/* Survey */
router.post(['/survey/update-data'], updatedata);
router.post(['/survey/delete-data'], deletedata);
router.post(['/survey/post-data'], postdata);

router.get(['/survey/reset-data'], resetdata);
router.get(['/survey/get-data'], getdata);

module.exports = router;