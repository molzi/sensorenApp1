import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Sensorendata } from 'src/app/Sensorendata';
import { SensorPosition } from 'src/app/Sensor';


@Component({
  selector: 'app-sensors-data',
  templateUrl: './sensors-data.component.html',
  styleUrls: ['./sensors-data.component.scss']
})
export class SensorsDataComponent implements OnInit {

  constructor(public storeService: StoreService, private backendService: BackendService) { }

  displayedColumns: string[] = ['name', 'date', 'temperature', 'humidity', 'location', 'position'];
  dataSource!: MatTableDataSource<Sensorendata>;

  SensorPosition = SensorPosition;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  async ngOnInit() {
    this.backendService.sensorsChanged.subscribe(()=>{
      this.refreshData();
    });
    await this.backendService.getSensoren();
    this.refreshData();
  }

  private async refreshData(){
    await this.backendService.getSensorenDaten();

    this.dataSource = new MatTableDataSource(this.storeService.sensorenDaten);
    this.dataSource.paginator = this.paginator;

  }
}
