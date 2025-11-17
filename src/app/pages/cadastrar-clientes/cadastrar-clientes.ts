import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-clientes',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-clientes.html',
  styleUrl: './cadastrar-clientes.css',
})
export class CadastrarClientes {

    //Atributos signal (exibidos na página HTML)
    mensagem = signal<string>('');

    //Inicializar a bilbioteca HTTP CLIENT
    private http = inject(HttpClient);

    //Criando a estrutura do formulário
    formulario = new FormGroup({
      nome : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required]),
      cpf : new FormControl('', [Validators.required]),
      telefone : new FormControl('', [Validators.required]),
      dataNascimento : new FormControl('', [Validators.required])
    });

    //Função para realizar o cadastro do cliente
    cadastrarCliente() {
      
        //Fazendo uma requisição HTTP POST para a API
        this.http.post('http://localhost:8081/api/v1/clientes', this.formulario.value, { responseType: 'text' })
          .subscribe((resposta) => { //Capturando a resposta da API
            this.mensagem.set(resposta); //Atualizando a mensagem exibida na página
            this.formulario.reset(); //Limpando o formulário após o cadastro
          });
    }
}
