import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-clientes',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-clientes.html',
  styleUrl: './editar-clientes.css',
})
export class EditarClientes {

  //injeções de dependência (serviços)
  private http = inject(HttpClient);
  private activate = inject(ActivatedRoute);

  private id: string = '';

  mensagem = signal<string>('');

  //evento executado ao abrir a página
  ngOnInit() {
    //Capturar o ID da URL
    const id = this.activate.snapshot.paramMap.get('id');
    //fazer a requisição para buscar os dados do cliente
    this.http.get('http://localhost:8081/api/v1/clientes/' + id)
      .subscribe((cliente: any) => { //recebe os dados do cliente
          this.id = cliente.id; //armazenar o ID do cliente
          //preencher o formulário com os dados do cliente
          this.formulario.setValue({
            nome: cliente.nome,
            email: cliente.email,
            cpf: cliente.cpf,
            telefone: cliente.telefone,
            dataNascimento: cliente.dataNascimento.split('T')[0]
          });
      });
  }

  //Criando a estrutura do formulário
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [Validators.required]),
    dataNascimento: new FormControl('', [Validators.required])
  });

  //Função para realizar o atualização do cliente
  atualizarCliente() {

    //Fazendo uma requisição HTTP PUT para a API
    this.http.put('http://localhost:8081/api/v1/clientes/' + this.id, this.formulario.value, { responseType: 'text' })
      .subscribe((resposta) => { //Capturando a resposta da API
        this.mensagem.set(resposta); //Atualizando a mensagem exibida na página
      });
  }

}
