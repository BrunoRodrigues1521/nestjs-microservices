import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';


@Injectable()
export class ValidatorService {
    constructor(private http: HttpService) {}

    async verifyStudentID(studentId: string): Promise<boolean> {
        const getStudent = await this.http
        .get(`http://35.180.128.163:3000/students?id=${studentId}`)
        .toPromise();
  
  
        if(getStudent.data.length !==1){
            return false;
        }
      return true;

    }

}
