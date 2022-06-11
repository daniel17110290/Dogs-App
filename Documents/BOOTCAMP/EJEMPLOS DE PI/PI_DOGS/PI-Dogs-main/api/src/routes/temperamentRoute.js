const {Router}=require ("express");

const {getTemperament}=require ("../controllers/tempreamentcontroller");

const router=Router();

router.get("/temperament", getTemperament);

module.exports=router;