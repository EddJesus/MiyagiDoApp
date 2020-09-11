import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage {

  constructor(private apiService: ApiService) { 

    //declara as funções do CRUD dentro dessa page

    this.createData();
    this.readData();
    this.updateData();
    this.deleteData();

  }

  createData(){

    //criando o objeto que vai ser enviado
    const data: any = { 
      title: 'Eduardo',
      body: 'teste',
      userId: 10
    }

    //ação da função -> chama a api passando a função 'createData()' com a 'data' como parametro
    this.apiService.createData(data).subscribe(data =>{
      console.log(data); //retornando a resposta do servidor no console.log
    });
  }

  readData(){

    //ação da função -> chama a api passando a funçaõ 'readData()'
    this.apiService.readData().subscribe(data =>{
      console.log(data); //retornando a resposta do servidor no console.log
    });
  }

  updateData(){

    //criando o objeto que vai ser atualizado
    const data: any = {
      title: 'Eduardo2',
      body: 'teste2',
      userId: 7
    };

    //ação da função -> chama a api passando a função 'updateData()' com a 'data' como parametro
    this.apiService.updateData(data).subscribe(data =>{
      console.log(data); //retornando a resposta do servidor no console.log
    });

  }

  deleteData(){

    //ação da função -> chama a api passando a funçaõ 'deleteData()' para deletar o objeto escolhido
    this.apiService.deleteData().subscribe(data =>{
      console.log(data); //retornando a resposta do servidor no console.log
    });
  }

}
