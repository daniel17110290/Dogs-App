const {Router} = require ("express");

const {getAllDogs, getDogId, postDogs,} = require ("../controllers/dogcontroller");

const {filterDogTemp, filterDogCreated}=require("../controllers/filterController");

const {orderNameAlpha, orderWeight} = require ("../controllers/orderController");
//const getDogId = require ("../controllers/dogcontroller");

const router=Router();

router.get("/dogs", getAllDogs);

router.get("/dogs/:id", getDogId);

router.get("/dogstemp/", filterDogTemp);

router.get("/dogstemp/:filtered", filterDogCreated);

router.get("/dogorder", orderNameAlpha);

router.get("/dogorder/:ordWeight", orderWeight)

router.post("/dogs", postDogs);

module.exports = router;