import student from "../controller/student";
import express from "express";
const router = express.Router();

// Define your routes
router.get('/home', student.getHome);
router.get(['/login','/'],student.loginInterface);
router.post('/login',student.authCheck);
router.get('/students', student.getAllStudents);
router.get('/student/:id', student.getStudent); 
router.get('/create-student', student.gotoForm);
router.post('/students',student.createStudent)
router.get('/students/:id/edit', student.gotoUpdateForm);
router.put('/students/:id', student.updateStudent);
router.delete('/students/:id', student.deleteStudent); 
export default router;