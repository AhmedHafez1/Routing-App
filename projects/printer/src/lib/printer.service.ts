import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  welcome(name: string) {
    console.log(`Welcome ${name}`);
  }
}
