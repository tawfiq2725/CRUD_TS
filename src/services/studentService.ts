import { StudentService } from '../model/studentService';
import studentModel from '../model/student';

export class StudentServiceImpl implements StudentService {
    async getAllStudents() {
        return await studentModel.find().sort({createdAt:-1});
    }

    async getStudentById(id: string) {
        return await studentModel.findById(id);
    }

    async createStudent(data: any) {
        const newStudent = new studentModel(data);
        return await newStudent.save();
    }

    async updateStudent(id: string, data: any) {
        return await studentModel.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteStudent(id: string) {
        return await studentModel.findByIdAndDelete(id);
    }
}
