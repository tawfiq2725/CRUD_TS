import { Request, Response } from "express";
import { StudentServiceImpl } from "../services/studentService";
const studentService = new StudentServiceImpl();

let credentials = {
  email: "admin@gmail.com",
  password: "admin@123",
};

class StudentController {
  // Login page
  loginInterface = (req: Request, res: Response) => {
    try {
      return res.render("login", {
        title: "Login Page",
      });
    } catch (error) {
      res.status(500).send("Server error");
      console.log(error + "An error Occured");
    }
  };

  // Check credentials
  authCheck = (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (email === credentials.email && password === credentials.password) {
        if (req.session) {
          req.session.admin = email;
        }
        res.render("home", {
          title: "Home Page",
        });
      } else {
        res.redirect("/login");
      }
    } catch (error) {
      res.status(500).send("An error occurred while processing your request");
      console.error("Error during authentication:", error);
    }
  };

  // Logout

  authLogout = (req: Request, res: Response) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error during session destruction:", err);
          return res.status(500).send("Error occurred during logout");
        }
      });
    } else {
      res.redirect("/login");
    }
  };

  // Home route
  getHome = (req: Request, res: Response) => {
    try {
      res.render("home", {
        title: "Student List",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };

  // Get all students
  getAllStudents = async (req: Request, res: Response): Promise<void> => {
    try {
      const students = await studentService.getAllStudents();
      res.render("main", {
        title: "Student List",
        students,
        message: "Good Morning",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };

  // Get a single student by ID
  getStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const studentId = req.params.id;
      const student = await studentService.getStudentById(studentId);

      if (!student) {
        res.status(404).send("Student not found");
        return;
      }

      res.render("studentDetail", {
        title: "Student Detail",
        student,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };

  // Go to create student form
  gotoForm = async (req: Request, res: Response): Promise<void> => {
    try {
      res.render("createStudent", {
        title: "Student Creation Form",
      });
    } catch (error) {
      res.status(500).send("An error occurred");
    }
  };

  // Create a new student
  createStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, age, email, gender, grade } = req.body;

      if (!name || !age || !email || !gender || !grade) {
        res.status(400).send("All fields are required");
        return;
      }

      await studentService.createStudent({ name, age, email, gender, grade });
      res.redirect("/students");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };

  // Go to update student form
  gotoUpdateForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const studentId = req.params.id;
      const student = await studentService.getStudentById(studentId);

      if (!student) {
        res.status(404).send("Student not found");
        return;
      }

      res.render("updateStudent", {
        title: "Edit Student",
        student,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };

  // Update an existing student
  updateStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const studentId = req.params.id;
      const { name, age, email, gender, grade } = req.body;

      const updatedStudent = await studentService.updateStudent(studentId, {
        name,
        age,
        email,
        gender,
        grade,
      });

      if (!updatedStudent) {
        res.status(404).send("Student not found");
      } else {
        res.redirect("/students");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };

  // Delete a student by ID
  deleteStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const studentId = req.params.id;
      const deletedStudent = await studentService.deleteStudent(studentId);

      if (!deletedStudent) {
        res.status(404).send("Student not found");
        return;
      }

      res.redirect("/students");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };
}

export default new StudentController();
