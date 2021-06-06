import { Component, OnInit } from '@angular/core';
import { Tarefa } from './model/tarefa';
import { Total } from './model/total';
import { TarefaService } from './tarefa.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tarefas: Tarefa[] = [];

  receita: Tarefa[] = [];
  listaTotal: Total[] = [];
  total: number = 0;
  data: any;

  constructor(private tarefaService: TarefaService){

  }

  ngOnInit(){
    this.tarefaService.getColecaoAtualizada().subscribe(tarefas =>{
      this.tarefas = tarefas;
    });
    this.tarefaService.list();

    this.tarefaService.getTotalAtualizado().subscribe(listaTotal=>{
      this.listaTotal = listaTotal;
    });
    this.tarefaService.total();
  }

  atualizarTotal() {
    this.tarefaService.getTotalAtualizado().subscribe(listaTotal=>{
      this.listaTotal = listaTotal;
    });
    this.tarefaService.total();
    this.total = 0;
    for (let i = 0; i < this.listaTotal.length; i++){
        let aux = this.listaTotal[i];
        this.total = this.total + Number(aux.valor);
    }
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

  adicionar(tarefaForm: any){
    const newId = this.tarefas.length + 1;
    const t: Tarefa = {
      id: newId,
      descricao: tarefaForm.value.tarefa,
      valor: tarefaForm.value.valor,
      finalizada: false
    }

    //this.tarefas.push(t);
    this.tarefaService.add(t);
    //this.total = this.total + tarefaForm.value.valor;
    this.clicar();
    tarefaForm.resetForm();
  }

  atualizar (tarefa: Tarefa){
    this.tarefaService.update(tarefa);
  }

  excluir(tarefa: Tarefa){
    this.tarefaService.delete(tarefa);
    console.log('sim excluindo');
  }

  opcoes = [
    {rotulo: "Concluído", valor: true},
    {rotulo: "Pedente", valor: false}
  ]

}
