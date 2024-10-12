import { Request, Response } from 'express';
import { StudentServiceImpl } from '../services/studentService';
const studentService = new StudentServiceImpl();

class StudentController {
    // Home route
    getHome = async (req: Request, res: Response): Promise<void> => {
        try {
            res.render('home', {
                title: 'Student List',
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }

    // Get all students
    getAllStudents = async (req: Request, res: Response): Promise<void> => {
        try {
            const students = await studentService.getAllStudents();
            res.render('main', {
                title: 'Student List',
                students,
                message: 'Good Morning',
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }

    // Get a single student by ID
    getStudent = async (req: Request, res: Response): Promise<void> => {
        try {
            const studentId = req.params.id;
            const student = await studentService.getStudentById(studentId);

            if (!student) {
                res.status(404).send('Student not found');
                return;
            }

            res.render('studentDetail', {
                title: 'Student Detail',
                student,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }

    // Go to create student form
    gotoForm = async (req: Request, res: Response): Promise<void> => {
        try {
            res.render('createStudent', {
                title: 'Student Creation Form',
            });
        } catch (error) {
            res.status(500).send('An error occurred');
        }
    }

    // Create a new student
    createStudent = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, age, email, gender, grade } = req.body;

            if (!name || !age || !email || !gender || !grade) {
                res.status(400).send('All fields are required');
                return;
            }

            await studentService.createStudent({ name, age, email, gender, grade });
            res.redirect('/students');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }

    // Go to update student form
    gotoUpdateForm = async (req: Request, res: Response): Promise<void> => {
        try {
            const studentId = req.params.id;
            const student = await studentService.getStudentById(studentId);

            if (!student) {
                res.status(404).send('Student not found');
                return;
            }

            res.render('updateStudent', {
                title: 'Edit Student',
                student,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }

    // Update an existing student
    updateStudent = async (req: Request, res: Response): Promise<void> => {
        try {
            const studentId = req.params.id;
            const { name, age, email, gender, grade } = req.body;

            const updatedStudent = await studentService.updateStudent(studentId, { name, age, email, gender, grade });

            if (!updatedStudent) {
                res.status(404).send('Student not found');
            } else {
                res.redirect('/students');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }

    // Delete a student by ID
    deleteStudent = async (req: Request, res: Response): Promise<void> => {
        try {
            const studentId = req.params.id;
            const deletedStudent = await studentService.deleteStudent(studentId);

            if (!deletedStudent) {
                res.status(404).send('Student not found');
                return;
            }

            res.redirect('/students');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }
}

export default new StudentController();
