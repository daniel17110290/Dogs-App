const { Router } = require('express');
const Dogs=require ("./dogRoute")
const Temperaments=require ("./temperamentRoute")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", Dogs);
router.use("/", Temperaments)


module.exports = router;
