import { pool } from './mysql-pool';
//-----------------------------------------------------------------------------------------------
class StudentService {
  getStudents(success) {
    pool.query('SELECT * FROM Students', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  
  updateStudent(student, success) {
    pool.query(
      'UPDATE Students SET name=?, email=? WHERE id=?',
      [student.name, student.email, student.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      },
    );
  }
}
export let studentService = new StudentService();

//---------------------------------------------------------------------------
//Group work (connected to course)
class ShowCourses{
  getCourses(success) {
    console.log("GetCourses Method was called, attempting to get courses")
    pool.query('SELECT * FROM study_program', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}
export let showcourses = new ShowCourses();
