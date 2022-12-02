import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sensor } from 'src/app/Sensor';
import { Sensorendata } from 'src/app/Sensorendata';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-add-sensors-data',
  templateUrl: './add-sensors-data.component.html',
  styleUrls: ['./add-sensors-data.component.scss']
})
export class AddSensorsDataComponent implements OnInit {

  sensoren!: Sensor[];
  public addForm!: FormGroup;

  constructor(public storeService: StoreService, private backendService: BackendService) { }

  async ngOnInit() {
    await this.backendService.getSensoren();
    this.sensoren = this.storeService.sensoren;

    this.setUpForm();
  }

  private setUpForm(){
    this.addForm = new FormGroup({
      date: new FormControl(new Date(), [Validators.required]),
      temperature:new FormControl(0, [Validators.required]),
      humidity: new FormControl(0, [Validators.required]),
      sensorId: new FormControl(undefined, [Validators.required]),
    });
  }

  public onAddDataClick(event: any){
    let data: any = {...this.addForm.value};

    data.date = `${data.date.getFullYear()}-${data.date.getMonth() + 1}-${data.date.getDate()}`

    this.backendService.addSensorsData(this.addForm.value).then(data=>{
      this.backendService.sensorsChanged.next(true);
    })
  }

}
