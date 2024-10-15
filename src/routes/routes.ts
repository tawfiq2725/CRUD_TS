import student from "../controller/student";
import express from "express";
import authMiddleware from "../middleware/auth";

const { CheckAuth, RedirectIfAuthenticated } = authMiddleware;
const router = express.Router();

// Define your routes
router.get("/home", CheckAuth, student.getHome);

// Use RedirectIfAuthenticated on the login route to prevent logged-in users from accessing it
router.get(["/login", "/"], RedirectIfAuthenticated, student.loginInterface);

// Change the POST route for login authentication
router.post("/loginAuth", RedirectIfAuthenticated, student.authCheck); // Ensure that authenticated users can't hit this route either

// All student-related routes require authentication
router.get("/students", CheckAuth, student.getAllStudents);
router.get("/student/:id", CheckAuth, student.getStudent);
router.get("/create-student", CheckAuth, student.gotoForm);
router.post("/students", CheckAuth, student.createStudent);
router.get("/students/:id/edit", CheckAuth, student.gotoUpdateForm);
router.put("/students/:id", CheckAuth, student.updateStudent);
router.delete("/students/:id", CheckAuth, student.deleteStudent);

// Logout route to clear session and redirect to login
router.get("/logout", CheckAuth, student.authLogout);

export default router;
