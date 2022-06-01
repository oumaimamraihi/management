import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
public result:any=null
  constructor() { }
  setResult(res){
    this.result=res;
  }
  getResult(){
    return this.result;
  }
}
