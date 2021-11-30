import { Component, OnInit } from '@angular/core';
import { Finance } from 'src/app/models/finance';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //cards
  valorTotal = 0;
  saida = 0;
  entrada = 0;
  investimentos = 0;

  //objeto da model
  financa: Finance = {
    tipo: 'Entrada',
    valor: 888  ,
    data: '12/01/2020'
  }

  //array de objeto da model
  financas: Finance[] = []

  //array tradicional
  finance = [{
    tipo: 'Entrada',
    valor: 2650,
    data: '20/02/2021'
  },
  {
    tipo: 'Saida',
    valor: 980,
    data: '20/02/2021'
  },
  {
    tipo: 'Entrada',
    valor: 20,
    data: '20/02/2021'
  },
  {
    tipo: 'Saida',
    valor: 9870,
    data: '20/02/2021'
  },
  {
    tipo: 'Investimento',
    valor: 20000,
    data: '20/02/2021'
  },
  {
    tipo: 'Entrada',
    valor: 200,
    data: '20/02/2021'
  },
]
  constructor() { }

  ngOnInit(): void {
    this.financas.push(this.financa)
    this.somaSaidas()
    this.somaInvestimento()
    this.somaEntrada()
    this.somaTotal()
  }

  somaTotal(){
    this.valorTotal = (this.entrada - this.saida)
  }

  somaSaidas(){
    var soma = this.finance.map(item => item.valor).reduce((prev, curr) => prev + curr, 0);
    for(let alt = 0; alt < this.finance.length; alt ++){
      if(this.finance[alt].tipo === 'Saida'){
        this.saida += this.finance[alt].valor;
      }
    }
    console.log(soma);
  }
  somaEntrada(){
    for(let alt = 0; alt < this.finance.length; alt ++){
      if(this.finance[alt].tipo === 'Entrada'){
        this.entrada += this.finance[alt].valor;
      }
    }
  }
  somaInvestimento(){
    for(let alt = 0; alt < this.finance.length; alt ++){
      if(this.finance[alt].tipo === 'Investimento'){
        this.investimentos += this.finance[alt].valor;
      }
    }
  }

  excluirItem(id: number | string){
   this.finance.splice(Number(id),1) 
   
   this.valorTotal = 0;
   this.saida = 0;
   this.entrada = 0;
   this.investimentos = 0;
   this.somaSaidas()
   this.somaInvestimento()
   this.somaEntrada()
   this.somaTotal()
  }

}
