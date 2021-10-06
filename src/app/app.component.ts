import { Component, OnInit } from '@angular/core';
import { Filme } from './model/filme';
import { Tarefa } from './model/tarefa';
import { Total } from './model/total';
import { TarefaService } from './tarefa.service'
import { FilmeService } from './filme.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tarefas: Tarefa[] = [];

  receita: Tarefa[] = [];
  filmes: Filme[] = [];


  listaTotal: Total[] = [];
  total: number = 0;
  data: any;

  //constructor(private tarefaService: TarefaService){}
  constructor(private filmeService: FilmeService){}

  ngOnInit(){
    this.filmeService.getColecaoAtualizada().subscribe(filmes =>{
      this.filmes = filmes;
    });
    this.filmeService.list();

    /*this.tarefaService.getColecaoAtualizada().subscribe(tarefas =>{
      this.tarefas = tarefas;
    });
    this.tarefaService.list();

    this.tarefaService.getTotalAtualizado().subscribe(listaTotal=>{
      this.listaTotal = listaTotal;
    });
    this.tarefaService.total();*/
  }

  atualizarTotal() {
    /*this.tarefaService.getTotalAtualizado().subscribe(listaTotal=>{
      this.listaTotal = listaTotal;
    });
    this.tarefaService.total();
    this.total = 0;
    for (let i = 0; i < this.listaTotal.length; i++){
        let aux = this.listaTotal[i];
        this.total = this.total + Number(aux.valor);
    }*/
  }


  atualizarData(){
    const concluidas = this.tarefas.filter(t => t.finalizada).length;
    const pendentes = this.tarefas.length - concluidas;
    this.receita = this.tarefas;
    this.data = {
      labels: ['Concluídas','Pendentes'],
      datasets: [
        {
            data: [concluidas, pendentes],
            backgroundColor: [
              "#36A2EB",
              "#FF6384"
            ]}]
    }
  }


  clicar(){
    console.log(this.tarefas);
  }

  adicionar(filmeForm: any){
    //const newId = this.tarefas.length + 1;

    const f: Filme = {

      titulo: filmeForm.value.titulo,
      data_lancamento: filmeForm.value.data_lancamento,
      origem_uf: filmeForm.value.origem_uf,
      sinopse: filmeForm.value.sinopse,
      genero: filmeForm.value.genero,
      }

    //this.tarefas.push(t);
    this.filmeService.add(f);
    //this.total = this.total + tarefaForm.value.valor;
    //this.clicar();
    filmeForm.resetForm();
  }

  atualizar (tarefa: Tarefa){
    //AQUI  this.tarefaService.update(tarefa);
  }

  excluir(tarefa: Tarefa){
    //AQUI  this.tarefaService.delete(tarefa);
    console.log('sim excluindo');
  }

  opcoes = [
    {rotulo: "Concluído", valor: true},
    {rotulo: "Pedente", valor: false}
  ]


}
