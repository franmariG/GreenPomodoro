const express = require('express');
const router = express.Router();
const sessionCtrl = require('../controllers/sessionController');

router.get('/', sessionCtrl.getSessions);
router.post('/', sessionCtrl.createSession);
router.put('/:id', sessionCtrl.updateSession);
router.patch('/:id/complete', sessionCtrl.completeSession);
router.delete('/:id', sessionCtrl.deleteSession);
router.get('/completed', sessionCtrl.getSessionsCompleted);

module.exports = router;