import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import { Tarefa } from './model/tarefa';
import {Subject} from 'rxjs';
import { Total } from './model/total';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private baseUrl: string = 'http://localhost:3000/tarefas';
  private baseUrlTotal: string = 'http://localhost:3000/tarefas/total';

  private colecaoAtualizada = new Subject<Tarefa[]>();
  private listaTotal = new Subject<Total[]>();


  //injecao de dependencia
  constructor(private httpClient: HttpClient) { }

    public getColecaoAtualizada(){
      return this.colecaoAtualizada.asObservable();
    };

    public getTotalAtualizado(){
      return this.listaTotal.asObservable();
    };

    public total(){
      this.httpClient.get<{listaTotal: Total[]}>(this.baseUrlTotal).subscribe(resultado =>{
        this.listaTotal.next(resultado.listaTotal);
      });
    };

    public list (){
      this.httpClient.get<{tarefas: Tarefa[]}>(this.baseUrl).subscribe(resultado =>{
        this.colecaoAtualizada.next(resultado.tarefas);
      });
    };

    public add( tarefa: Tarefa){
      this.httpClient.post<{tarefas: Tarefa[]}>(this.baseUrl, tarefa).subscribe (resultado =>{
        this.colecaoAtualizada.next(resultado.tarefas);
      });
    }

    public update(tarefa: Tarefa){
      this.httpClient.put<{tarefas: Tarefa[]}>(this.baseUrl, tarefa).subscribe (resultado =>{
        this.colecaoAtualizada.next(resultado.tarefas);
      });
    }


    public delete(tarefa: Tarefa){
      let req = new HttpRequest('DELETE', this.baseUrl);
      let newReq = req.clone({body: tarefa});
      this.httpClient.request(newReq).subscribe (resultado =>{
        this.list();
      });
    }


}
