import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  studentApiUrl = "https://jsonplaceholder.typicode.com/users";

  constructor(private httpClient : HttpClient) { }

  //Funkcja wysyłająca request - GET pobierająca tablice studentów z API
  getStudents(){
    return this.httpClient.get<Student[]>(this.studentApiUrl);
  }

  //Funkcja wysyłająca requesta - GET o określonym id w celu pobrania jednego rekordu studenta
  getStudent(id : number){
    let getStudentUrl = this.studentApiUrl + "/" + id;
    return this.httpClient.get<Student>(getStudentUrl);
  }

  //Funkcja wysyłająca request - DELETE usuwająca studenta o podanym id
  // https://jsonplaceholder.typicode.com/users/5 - DELETE -> USUŃ REKORD O ID = 5
  // https://jsonplaceholder.typicode.com/users/10
  deleteStudent(id : number){
    let deleteStudentUrl = this.studentApiUrl + "/" + id;
    return this.httpClient.delete<Student>(deleteStudentUrl);
  }

  //Funkcja wysyłająca request - POST do endpointu
  addStudent(student: Student){
    return this.httpClient.post<Student>(this.studentApiUrl, student);
  }

  //Funkcja wyśle request - PUT do endpointu - aktualizując dany obiekt
  updateStudent(student : Student){
    let updateStudentUrl = this.studentApiUrl + "/" + student.id;
    return this.httpClient.put<Student>(updateStudentUrl, student);
  }
}
