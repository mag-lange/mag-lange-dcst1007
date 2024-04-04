import { pool } from './mysql-pool';

class StudentService {
  getStudents(success) {
    pool.query('SELECT * FROM Students', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getStudent(id, success) {
    pool.query('SELECT * FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateStudent(student, success) {
    pool.query(
      'UPDATE Students SET name=?, email=?, course_id=? WHERE id=?',
      [student.name, student.email, student.studyProgramId, student.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  addStudent(student, success) {
    pool.query(
      'INSERT INTO Students (name, email, course_id) VALUES (?, ?, ?)',
      [student.name, student.email, student.studyProgramId],
      (error, results) => {
        if (error) return console.error(error);

        success(results.insertId);
      }
    );
  }

  deleteStudent(id, success) {
    pool.query('DELETE FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}

class StudyProgramService {
  getStudyPrograms(success) {
    pool.query('SELECT * FROM study_program', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getStudyProgram(id, success) {
    pool.query('SELECT * FROM study_program WHERE course_id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  getStudents(studyProgramId, success) {
    pool.query(
      'SELECT * FROM Students WHERE course_id = ?',
      [studyProgramId],
      (error, results) => {
        if (error) return console.error(error); // If error, show error in console (in red text) and return

        success(results);
      }
    );
  }

  updateStudyProgram(studyProgram, success) {
    pool.query(
      'UPDATE study_program SET course_name=?, course_code=? WHERE course_id=?',
      [studyProgram.name, studyProgram.code, studyProgram.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  addStudyProgram(student, success) {
    pool.query(
      'INSERT INTO study_program (course_name, course_code) VALUES (?, ?)',
      [student.name, student.code],
      (error, results) => {
        if (error) return console.error(error);

        success(results.insertId);
      }
    );
  }

  deleteStudyProgram(id, success) {
    pool.query('DELETE FROM study_program WHERE course_id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}

export let studentService = new StudentService();
export let studyProgramService = new StudyProgramService();