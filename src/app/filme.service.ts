import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Subject} from 'rxjs';
import { Filme } from './model/filme';

@Injectable({
  providedIn: 'root'
})

export class FilmeService {
  private baseUrl: string = 'http://localhost:3000/filmes';
  private colecaofilmes = new Subject<Filme[]>();

  constructor(private httpClient: HttpClient) { }


  public getColecaoAtualizada(){
    return this.colecaofilmes.asObservable();
  };

  public list (){
    this.httpClient.get<{filmes: Filme[]}>(this.baseUrl).subscribe(resultado =>{
      this.colecaofilmes.next(resultado.filmes);
    });
  };

  public add(filme: Filme){
      this.httpClient.post<{filmes: Filme[]}>(this.baseUrl, filme).subscribe (resultado =>{
        this.colecaofilmes.next(resultado.filmes);
      });
    }


}
