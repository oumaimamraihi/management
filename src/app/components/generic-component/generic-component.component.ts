import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';
import { threadId } from 'worker_threads';
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
  ids = [];
  obj = { select: 'false' };
  parentSelector: boolean = false;
  listData = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private reservationService: ReservationService,
    private router: Router,
    private modalService: NgbModal
  ) {}
  product: any={Name:'all-products'}
  user: any={Name:'all-users'}
  reservation: any={Name:'all-reservations'}
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
      console.log(data);
    });
  }
  getUsersData() {
    this.userService.getUsers().subscribe((data: any) => {
      this.title = data.title;
      this.tableHeader = data.colmuns;
      this.tblDataList = data.data;
      this.tblDataList = data.data;
      console.log(data);
      this.tblDataList.forEach((index) => (index['select'] = 'false'));
      console.log(this.tblDataList);
    });
  }
  getReservtData() {
    this.reservationService.getReservations().subscribe((data: any) => {
      this.title = data.title;
      this.tableHeader = data.colmuns;
      this.tblDataList = data.data;
    });
  }
  onChangeFood($event) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;
    const ids = [];
    console.log(isChecked);
    this.listData = this.tblDataList.map((d) => {
      if (d.id == id) {
        d.select = isChecked;
        this.parentSelector = false;
        console.log('d', d);
        ids.push(d);

        return d;
      }
      if (id == -1) {
        d.select = this.parentSelector;
        console.log(d);
        this.listData = d;
        return d;
      }
      console.log('d', d);
      return d;
    });
    console.log(this.listData);
  }
  search(value, input) {
    if (value == '') {
      this.getProductsData();
    }
    if (value != '') {
      if (this.title == 'List of Products') {
        switch (input) {
          case 'product name':
            this.productService
              .searchProductByName(value)
              .subscribe((data: any) => {
                console.log(data);
                this.tblDataList = data;
              });
          case 'price':
            this.productService
              .searchProductByPrice(value)
              .subscribe((data: any) => {
                console.log(data);
                this.tblDataList = data;
              });

          case 'quantity':
            this.productService
              .searchProductByQuantity(value)
              .subscribe((data: any) => {
                console.log(data);
                this.tblDataList = data;
              });
        }
      }
      if(this.title == 'List of Users'){
        switch (input) {
        case 'email':
          this.userService
            .searchUserByEmail(value)
            .subscribe((data: any) => {
              console.log(data);
              this.tblDataList = data;
            });
        case 'name':
          this.userService
            .searchUserByEmail(value)
            .subscribe((data: any) => {
              console.log(data);
              this.tblDataList = data;
            });
          }
      }
      if(this.title == 'List of reservations'){
        switch (input) {
        case 'name':
          this.reservationService
            .searchReservByName(value)
            .subscribe((data: any) => {
              console.log(data);
              this.tblDataList = data;
            });

          }
      }

    }
  }
  viderchamps() {
    this.getProductsData();
  }
  getcheckedId() {
    for (const obj of this.listData) {
      if (obj.select == true) {
        this.ids.push(obj.id);
      }
    }
  }

  delete() {
    switch (this.title) {
      case 'List of Users':
        return this.deleteUser();
      case 'List of Products':
        return this.deleteProduct();
      case 'List of reservations':
        return this.deleteReservation();
    }
  }

  deleteUser() {
    this.ids = [];
    this.getcheckedId();
    console.log(this.ids);
    this.userService.deleteUsers(this.ids).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log(error)
    );
  }
  deleteProduct() {
    this.ids = [];
    this.getcheckedId();
    this.productService.deleteProducts(this.ids).subscribe(
      (data) => {
        this.router.navigate(['products/all-products']);
        console.log(data);
      },
      (error) => console.log(error)
    );
  }

  deleteReservation() {
    this.ids = [];
    this.getcheckedId();
    this.reservationService.deleteReservations(this.ids).subscribe(
      (data) => {
        this.router.navigate(['products/all-products']);
        console.log(data);
      },
      (error) => console.log(error)
    );
  }
  exportpdf() {
    switch (this.title) {
      case 'List of Users':
        return this.exportUser();
      case 'List of Products':
        return this.exportProduct();
      case 'List of reservations':
        return this.exportReservation();
    }
  }
  exportReservation() {
    this.ids = [];
    this.getcheckedId();
    console.log(this.ids);
    this.reservationService.ExportToPDF(this.ids).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log(error)
    );
  }
  exportProduct() {
    this.ids = [];
    this.getcheckedId();
    console.log(this.ids);
    this.productService.ExportToPDF(this.ids).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log(error)
    );
  }
  exportUser() {
    this.ids = [];
    this.getcheckedId();
    console.log(this.ids);
    this.userService.ExportToPDF(this.ids).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log(error)
    );
  }
  deleteConfirmation(content2){
       this.modalService.open(content2)



      }

}
