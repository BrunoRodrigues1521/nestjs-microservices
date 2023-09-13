import { nextTick } from "process";

export function convertToStudent(obj) {

    const ints = ['id', 'age'];
    const dates = ['birthDate'];


    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
        const element = obj[key];
          if (typeof element === 'string' && ints.includes(key)) {

                if(parseInt(element)){
                    obj[key] = parseInt(element);
                    
                }else{
                    obj[key]=0;

                }
          }
          
          if (typeof element === 'string' && dates.includes(key)) {
              obj[key] = new Date(element);
          }
        } 
    return obj;
    }
  }