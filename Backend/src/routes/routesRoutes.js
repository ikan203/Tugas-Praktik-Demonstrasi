const express = require('express');
const router = express.Router();
const siswaController = require('../controller/SiswaController');
const cors = require('cors');
const { validationAdd } = require('../middleware/validation');

router.use(cors());

router.get('/', siswaController.getAllSiswa);
router.get('/:id', siswaController.getSiswaById); 
router.post('/', validationAdd,siswaController.addSiswa);
router.put('/:id', validationAdd,siswaController.updateSiswa);
router.delete('/:id', siswaController.deleteSiswa);

module.exports = router;