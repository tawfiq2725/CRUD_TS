export interface StudentService {
    getAllStudents(): Promise<any>;
    getStudentById(id: string): Promise<any>;
    createStudent(data: any): Promise<any>;
    updateStudent(id: string, data: any): Promise<any>;
    deleteStudent(id: string): Promise<any>;
}
