import { Component } from '@angular/core';
import { FunctionMapping } from '../user/user.module';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent {
  
  public functionMapping: FunctionMapping = new FunctionMapping;
  public userMapping = false;
  constructor(
  ) { }

  ngOnInit() {
    this.functionMapping = JSON.parse(localStorage.getItem('functionMapping') || '{}');
    this.userMapping = this.functionMapping.userMapping || false;
  }
}
