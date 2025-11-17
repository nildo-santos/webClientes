import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar-clientes',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './consultar-clientes.html',
  styleUrl: './consultar-clientes.css',
})
export class ConsultarClientes {

  //Declando o HttpCLient
  private http = inject(HttpClient);

  //Atributo para guardar a lista de clientes obtida da API
  //e posteriormente exibir esses dados na página
  clientes = signal<any[]>([]); //array de objetos

  //Atributo para exibir mensagem na página
  mensagemConsulta = signal<string>('');
  mensagemExclusao = signal<string>('');

  //Declarando o formulário
  formulario = new FormGroup({
    nome : new FormControl('', [Validators.required])
  });

  //função executada ao clicar no botão SUBMIT do formulário
  consultarClientes() {    
      //Fazendo uma requisição para consultar os clientes na API
      this.http.get('http://localhost:8081/api/v1/clientes?nome=' + this.formulario.value.nome)
        .subscribe((clientes) => { //capturando o retorno da API
            //guardar os dados dos clientes obtidos
            this.clientes.set(clientes as any[]);
            //verificar se algum cliente foi encontrado
            if(this.clientes().length == 0) {
              this.mensagemConsulta.set('Nenhum cliente encontrado com esse nome.');
            }
            else {
              this.mensagemConsulta.set('');
            }
        });
  }

  //função para realizar a exclusão do cliente
  excluirCliente(id: string) {
    if(confirm('Deseja realmente excluir esse cliente?')) {
      //realizar a exclusão do cliente na API
      this.http.delete('http://localhost:8081/api/v1/clientes/' + id, { responseType: 'text' })
        .subscribe((resposta) => { //capturando o retorno da API
          this.mensagemExclusao.set(resposta); //exibir a mensagem de sucesso na exclusão
          //atualizar a lista de clientes exibida na página
          this.consultarClientes();
        });
    }
  }

}
