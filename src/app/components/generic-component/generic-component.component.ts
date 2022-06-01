import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-generic-component',
  templateUrl: './generic-component.component.html',
  styleUrls: ['./generic-component.component.css'],
})
export class GenericComponentComponent implements OnInit {
  parameterName: string;
  title: string = '';
  tableHeader: any[];
  tblDataList: any[];
  despacito: any[];
  ids: any[];
  obj = { select: 'false' };
  parentSelector: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    console.log('welcome');
    this.parameterName = this.route.snapshot.params.Name;
    this.getSelected(this.parameterName);
  }
  getSelected(selectedName) {
    switch (selectedName) {
      case 'all-products':
        return this.getProductsData();
      case 'all-users':
        return this.getUsersData();
      case 'all-reservations':
        return this.getReservtData();
      default:
        return 'all-users';
    }
  }
  getProductsData() {
    this.productService.getProducts().subscribe((data: any) => {
      this.title = data.title;
      this.tableHeader = data.colmuns;

      this.tblDataList = data.data;
      for (const object of this.tblDataList) {
        object.push(this.obj);
      }
      data.push(this.obj);
      console.log(this.tblDataList);
    });
  }
  getUsersData() {
    this.userService.getUsers().subscribe((data: any) => {
      this.title = data.title;
      this.tableHeader = data.colmuns;
      this.tblDataList = data.data;
      this.tblDataList = data.data;

      this.tblDataList.forEach((index) => (index['select'] = 'false'));
      console.log(this.tblDataList);
    });
  }
  getReservtData() {
    this.reservationService.getReservations().subscribe((data: any) => {
      this.title = data.title;
      this.tableHeader = data.colmuns;
      this.tblDataList = data.data;
      for (const object of this.tblDataList) {
        object.push(this.obj);
      }
      console.log(this.tblDataList);
    });
  }
  onChangeFood($event) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;
    console.log(isChecked);
    this.tblDataList = this.tblDataList.map((d) => {
      if (d.id == id) {
        d.select = isChecked;
        this.parentSelector = false;
        console.log(d);
        return d;
      }
      if (id == -1) {
        d.select = this.parentSelector;
        console.log(d);
        return d;
      }
      console.log(d);
      return d;
    });
    console.log(this.tblDataList);
  }
}
