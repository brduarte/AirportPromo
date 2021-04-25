var express = require('express');
var router = express.Router();

/* GET */
router.get('/', function (req, res) {
  res.json({
    version: '1.0',
    name: 'CrudCar',
    description: 'Teste tecnico da Infossistemas'
  })
});


module.exports = router;
