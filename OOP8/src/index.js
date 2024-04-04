import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { studentService, studyProgramService } from './services';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <div>
        <NavLink exact to="/" activeStyle={{ color: 'darkblue' }}>
          StudAdm
        </NavLink>
        {' ' /* Add extra space between menu items */}
        <NavLink to="/students" activeStyle={{ color: 'darkblue' }}>
          Students
        </NavLink>
        {' ' /* Add extra space between menu items */}
        <NavLink activeStyle={{ color: 'darkblue' }} to="/study_programs">
          Study Programs
        </NavLink>
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return <div>Welcome to StudAdm</div>;
  }
}

class StudentList extends Component {
  students = [];

  render() {
    return (
      <div>
        <ul>
          {this.students.map((student) => (
            <li key={student.id}>
              <NavLink to={'/students/' + student.id}>{student.name}</NavLink>
            </li>
          ))}
        </ul>
        <button type="button" onClick={this.new}>
          New
        </button>
      </div>
    );
  }

  mounted() {
    studentService.getStudents((students) => {
      this.students = students;
    });
  }

  new() {
    history.push('/new_student');
  }
}

class StudentDetails extends Component {
  student = null;
  course_id = '';

  render() {
    if (!this.student) return null;

    return (
      <div>
        <ul>
          <li>Name: {this.student.name}</li>
          <li>Email: {this.student.email}</li>
          <li>Study program: {this.course_id}</li>
        </ul>
        <button type="button" onClick={this.edit}>
          Edit
        </button>
        <button type="button" onClick={this.delete}>
          Delete
        </button>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, (student) => {
      this.student = student;
      studyProgramService.getStudyProgram(
        this.student.studyProgramId,
        (studyProgram) => (this.course_id = studyProgram.course_id)
      );
    });
  }

  edit() {
    history.push('/students/' + this.student.id + '/edit');
  }

  delete() {
    studentService.deleteStudent(this.props.match.params.id, () => history.push('/students'));
  }
}

class StudentEdit extends Component {
  student = null;
  studyPrograms = [];

  render() {
    if (!this.student) return null;

    return (
      <div>
        <ul>
          <li>
            Name:{' '}
            <input
              type="text"
              value={this.student.name}
              onChange={(event) => (this.student.name = event.currentTarget.value)}
            />
          </li>
          <li>
            Email:{' '}
            <input
              type="text"
              value={this.student.email}
              onChange={(event) => (this.student.email = event.currentTarget.value)}
            />
          </li>
          <li>
            Study program:{' '}
            <select
              value={this.student.studyProgramId}
              onChange={(event) => (this.student.studyProgramId = event.currentTarget.value)}
            >
              {this.studyPrograms.map((studyProgram) => (
                <option key={studyProgram.id} value={studyProgram.id}>
                  {studyProgram.name}
                </option>
              ))}
            </select>
          </li>
        </ul>
        <button type="button" onClick={this.save}>
          Save
        </button>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, (student) => {
      this.student = student;
    });
    studyProgramService.getStudyPrograms((studyPrograms) => (this.studyPrograms = studyPrograms));
  }

  save() {
    studentService.updateStudent(this.student, () => {
      history.push('/students/' + this.student.id);
    });
  }
}

class StudentNew extends Component {
  student = { name: '', email: '', studyProgramId: 1 };
  studyPrograms = [];

  render() {
    return (
      <div>
        <ul>
          <li>
            Name:{' '}
            <input
              type="text"
              value={this.student.name}
              onChange={(event) => (this.student.name = event.currentTarget.value)}
            />
          </li>
          <li>
            Email:{' '}
            <input
              type="text"
              value={this.student.email}
              onChange={(event) => (this.student.email = event.currentTarget.value)}
            />
          </li>
          <li>
            Study program:{' '}
            <select
              value={this.student.studyProgramId}
              onChange={(event) => (this.student.studyProgramId = event.currentTarget.value)}
            >
              {this.studyPrograms.map((studyProgram) => (
                <option key={studyProgram.id} value={studyProgram.id}>
                  {studyProgram.name}
                </option>
              ))}
            </select>
          </li>
        </ul>
        <button type="Add" onClick={this.add}>
          Add
        </button>
      </div>
    );
  }

  mounted() {
    studyProgramService.getStudyPrograms((studyPrograms) => (this.studyPrograms = studyPrograms));
  }

  add() {
    studentService.addStudent(this.student, (id) => {
      history.push('/students/' + id);
    });
  }
}

class StudyProgramList extends Component {
  studyPrograms = [];

  render() {
    return (
      <div>
        <ul>
          {this.studyPrograms.map((studyProgram) => (
            <li key={studyProgram.id}>
              <NavLink
                activeStyle={{ color: 'darkblue' }}
                to={'/study_programs/' + studyProgram.id}
              >
                {studyProgram.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <button type="button" onClick={this.new}>
          New
        </button>
      </div>
    );
  }

  mounted() {
    studyProgramService.getStudyPrograms((studyPrograms) => (this.studyPrograms = studyPrograms));
  }

  new() {
    history.push('/new_study_program');
  }
}

class StudyProgramDetails extends Component {
  studyProgram = null;
  students = [];

  render() {
    if (!this.studyProgram) return null;

    return (
      <div>
        <ul>
          <li>Name: {this.studyProgram.name}</li>
          <li>Code: {this.studyProgram.code}</li>
          <li>
            Students:
            <ul>
              {this.students.map((student) => (
                <li key={student.id}>{student.name}</li>
              ))}
            </ul>
          </li>
        </ul>
        <button type="button" onClick={this.edit}>
          Edit
        </button>
        <button type="button" onClick={this.delete}>
          Delete
        </button>
      </div>
    );
  }

  mounted() {
    studyProgramService.getStudyProgram(
      this.props.match.params.id,
      (studyProgram) => (this.studyProgram = studyProgram)
    );
    studyProgramService.getStudents(
      this.props.match.params.id,
      (students) => (this.students = students)
    );
  }

  edit() {
    history.push('/study_programs/' + this.studyProgram.id + '/edit');
  }

  delete() {
    studyProgramService.deleteStudyProgram(this.props.match.params.id, () =>
      history.push('/study_programs')
    );
  }
}

class StudyProgramEdit extends Component {
  studyProgram = null;

  render() {
    if (!this.studyProgram) return null;

    return (
      <div>
        <ul>
          <li>
            Name:{' '}
            <input
              type="text"
              value={this.studyProgram.name}
              onChange={(event) => (this.studyProgram.name = event.currentTarget.value)}
            />
          </li>
          <li>
            Code:{' '}
            <input
              type="text"
              value={this.studyProgram.code}
              onChange={(event) => (this.studyProgram.code = event.currentTarget.value)}
            />
          </li>
        </ul>
        <button type="button" onClick={this.save}>
          Save
        </button>
      </div>
    );
  }

  mounted() {
    studyProgramService.getStudyProgram(this.props.match.params.id, (studyProgram) => {
      this.studyProgram = studyProgram;
    });
  }

  save() {
    studyProgramService.updateStudyProgram(this.studyProgram, () => {
      history.push('/study_programs/' + this.props.match.params.id);
    });
  }
}

class StudyProgramNew extends Component {
  studyProgram = { name: '', code: '' };

  render() {
    return (
      <div>
        <ul>
          <li>
            Name:{' '}
            <input
              type="text"
              value={this.studyProgram.name}
              onChange={(event) => (this.studyProgram.name = event.currentTarget.value)}
            />
          </li>
          <li>
            Code:{' '}
            <input
              type="text"
              value={this.studyProgram.code}
              onChange={(event) => (this.studyProgram.code = event.currentTarget.value)}
            />
          </li>
        </ul>
        <button type="Add" onClick={this.add}>
          Add
        </button>
      </div>
    );
  }

  add() {
    studyProgramService.addStudyProgram(this.studyProgram, (id) => {
      history.push('/study_programs/' + id);
    });
  }
}

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Menu />
    <Route exact path="/" component={Home} />
    <Route exact path="/students" component={StudentList} />
    <Route exact path="/students/:id" component={StudentDetails} />
    <Route exact path="/students/:id/edit" component={StudentEdit} />
    <Route exact path="/new_student" component={StudentNew} />
    <Route exact path="/study_programs" component={StudyProgramList} />
    <Route exact path="/study_programs/:id" component={StudyProgramDetails} />
    <Route exact path="/study_programs/:id/edit" component={StudyProgramEdit} />
    <Route exact path="/new_study_program" component={StudyProgramNew} />
  </HashRouter>
);