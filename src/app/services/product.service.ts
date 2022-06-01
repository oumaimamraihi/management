import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from 'selenium-webdriver';
import { environment } from 'src/environments/environment';
import { Apiresponse } from '../models/apiresponse';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = environment.apiUrl + '/api/products';

  getProducts(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(this.baseUrl);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(this.baseUrl, product);
  }

  updateProduct(product: Product): Observable<Apiresponse> {
    return this.http.put<Apiresponse>(this.baseUrl, product);
  }

  deleteProductById(id: number): Observable<Apiresponse> {
    return this.http.delete<Apiresponse>(`${this.baseUrl}/${id}`);
  }
  deleteProducts(listId:any): Observable<Apiresponse> {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:listId
    };

    return this.http.delete<Apiresponse>(this.baseUrl,options);
  }
  ExportToPDF(listId:any){
    return this.http.post(`${this.baseUrl}/export/pdf/`,listId)
  }

  searchProductByName(name: string): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${this.baseUrl}/searchname/${name}`);
  }

  searchProductByPrice(price: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${this.baseUrl}/searchprice/${price}`);
  }

  searchProductByQuantity(qte: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${this.baseUrl}/searchquantity/${qte}`);
  }
}
