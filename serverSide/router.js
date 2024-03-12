const express = require('express');
const router = express.Router();
const {createTask,getAllTasks,getTaskById,deleteTask,updateTask,getTask,createRegisterInfo,showAllRegisterInfo,createLoginInfo,getAllInfo,verifyToken, getSingleUserData} = require('./controllers/taskController');

router.get("/ping",getTask);
router.get('/',getAllTasks);
router.get('/getUserData/:id',getTaskById);
router.get('/getallregisterInfo',showAllRegisterInfo);
router.get('/getAllUserInfo',verifyToken,getAllInfo);
router.post('/create',createTask);
router.post('/loginInfo',createLoginInfo);
router.post('/getIndividualData',getSingleUserData);
router.post('/registerPage',createRegisterInfo);
router.put('/updateData/:id',updateTask);
router.delete('/deleteData/:id',deleteTask);


module.exports = router;