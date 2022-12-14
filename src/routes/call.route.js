const express = require('express');
const router = express.Router();
const callController = require('../controllers/call.controller');

/* GET programming languages. */
router.get('/', callController.get);
  
/* POST programming language */
router.post('/', callController.create);

/* PUT programming language */
router.put('/:id', callController.update);

/* DELETE programming language */
router.delete('/:id', callController.remove);

module.exports = router;
