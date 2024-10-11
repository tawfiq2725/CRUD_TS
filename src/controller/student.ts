import { Request, Response } from 'express';
import studentModel from '../model/student';

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
            const students = await studentModel.find();
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
            const student = await studentModel.findById(studentId);

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

    // Go to Form
    gotoForm = async (req:Request , res:Response):Promise<void> =>{
        try {
            res.render('createStudent',{
                title:"Student creation form"
            })
        } catch (error) {
            res.status(500).send('An error Occured')   
        }
    }

    // Create a new student
    createStudent = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, age, email, gender ,grade} = req.body;

            if (!name || !age || !email || !gender || !grade) {
                res.status(400).send('All fields are required');
                return;
            }

            const newStudent = new studentModel({ name, age,email,gender ,grade });
            await newStudent.save();
            res.redirect('/students')
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }
    gotoUpdateForm = async (req: Request, res: Response): Promise<void> => {
        try {
            const studentId = req.params.id;
            const student = await studentModel.findById(studentId);

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

    // Update an existing student (already implemented)
    updateStudent = async (req: Request, res: Response): Promise<void> => {
        try {
            const studentId = req.params.id;
            const { name, age, email, gender, grade } = req.body;

            const updatedStudent = await studentModel.findByIdAndUpdate(
                studentId,
                { name, age, email, gender, grade },
                { new: true }
            );

            if (!updatedStudent) {
                 res.status(404).send('Student not found');
            }

            res.redirect('/students');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }

    // Delete a student by ID
    deleteStudent = async (req: Request, res: Response): Promise<void> => {
        try {
            const studentId = req.params.id;
            const deletedStudent = await studentModel.findByIdAndDelete(studentId);

            if (!deletedStudent) {
                res.status(404).send('Student not found');
                return;
            }

            // Redirect to the students list after successful deletion
            res.redirect('/students');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }
}

export default new StudentController();
