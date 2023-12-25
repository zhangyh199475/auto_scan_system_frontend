import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-s-para',
  templateUrl: './s-para.component.html',
  styleUrls: ['./s-para.component.css']
})
export class SParaComponent implements OnInit {

  public sParaForm!: FormGroup;
  public saveFolder: string = './';
  public saveFile: string = '';
  public savePath: string = this.saveFolder + this.saveFile;
  public sendEmail: string = '';

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.sParaForm = new FormGroup({
      saveFile: new FormControl(this.saveFile),
      sendEmail: new FormControl(this.sendEmail)
    })
  }


  backToOrigin() {

  }

  onStart() {

  }
}
