import { Component } from '@angular/core';
import { HttpService } from '../http-service.service';
import { Student } from '../student';
import { TypeDisplaying } from '../type-displaying';


@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent {
  // 1. Dodanie przycisku do usunięcia danych -> html - DONE!
  // 2. Wysłanie requesta HTTP - DELETE -> httpService - DONE!
  // 3. Obsłużenie metody usuwania -> ts
  isTableVisible: boolean = true;
  buttonText = "Schowaj";
  students: Student[] = [];
  studentIdToRemove: number[] = [];
  displayingTable: TypeDisplaying = TypeDisplaying.TABLE;
  TypeDisplaying = TypeDisplaying;
  copyStudents: Student[] = [];
  searchPhrase = "";

  constructor(private httpService: HttpService) {
    this.getData();
  }

  changeDisplayingForm() {
    if (this.displayingTable == TypeDisplaying.TABLE) {
      this.displayingTable = TypeDisplaying.LIST
    } else {
      this.displayingTable = TypeDisplaying.TABLE;
    }
  }

  showTable() {
    this.isTableVisible = !this.isTableVisible;
    console.log(this.isTableVisible);

    if (this.isTableVisible) {
      this.buttonText = "Schowaj";
    } else {
      this.buttonText = "Pokaż";
    }
  }

  getData() {
    console.log("Przed subscribe");

    this.httpService.getStudents().subscribe(data => {
      console.log("Wewnątrz subscribe");
      this.students = data;
      this.copyStudents = data;
    });

    console.log("Po subscribe");
  }

  isNameGlennaReichert(name: string) {
    return name.toUpperCase() == 'GLENNA REICHERT';
  }

  delete(id: number) {
    this.httpService.deleteStudent(id)
      .subscribe(() => {
        this.students = this.students.filter(x => x.id != id);
      });
  }

  changeStatus(event: any, studentId: number) {
    console.log(event.checked);
    if (event.checked) {
      this.studentIdToRemove.push(studentId);
    } else {
      this.studentIdToRemove = this.studentIdToRemove
        .filter(x => x != studentId);
    }

    console.log(this.studentIdToRemove);
  }

  deleteGlobalStudents() {
    this.studentIdToRemove.forEach(x => {
      this.httpService.deleteStudent(x)
        .subscribe(() => {
          console.log("Usunięto studenta o id " + x);
          this.students = this.students.filter(d => d.id != x);
        })
    })
  }

  search(searchString: string) {
  // wersja z startsWith
    // this.students = this.copyStudents
    //   .filter(x => x.name.toLowerCase()
    //     .startsWith(searchString.toLowerCase())
    //     || x.email.toLowerCase()
    //       .startsWith(searchString.toLowerCase()));

    this.searchPhrase = searchString;

    this.students = this.copyStudents
    .filter(x => x.name.toLowerCase()
      .includes(searchString.toLowerCase())
      || x.email.toLowerCase()
        .includes(searchString.toLowerCase()));
  }
}
