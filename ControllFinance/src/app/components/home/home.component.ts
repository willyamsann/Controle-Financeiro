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
  financeModel: Finance = {
    tipo: 'Entrada',
    valor: 888  ,
    data: '12/01/2020'
  }

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
    this.loadLocalStorange()
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
    for(let alt = 0; alt < this.financas.length; alt ++){
      if(this.financas[alt].tipo === 'Saida'){
        this.saida += this.financas[alt].valor?.valueOf() || 0 
      }
      this.financas[alt].tipo === 'Saida' ? 0 : 10;
    }
    console.log(soma);
  }
  somaEntrada(){
    for(let alt = 0; alt < this.financas.length; alt ++){
      if(this.financas[alt].tipo === 'Entrada'){
        this.entrada += this.financas[alt].valor?.valueOf() || 0 
      }
    }
  }
  somaInvestimento(){
    for(let alt = 0; alt < this.financas.length; alt ++){
      if(this.financas[alt].tipo === 'Investimento'){
        this.investimentos += this.financas[alt].valor?.valueOf() || 0 
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

  createFinance(){
    this.financas.push({
      tipo: this.financeModel.tipo,
      valor: this.financeModel.valor,
      data: this.financeModel.data
    });
    this.valorTotal = 0;
    this.saida = 0;
    this.entrada = 0;
    this.investimentos = 0;
    this.somaSaidas()
    this.somaInvestimento()
    this.somaEntrada()
    this.somaTotal()
    this.saveLocalStorange()
  }

  recalcular(){
    this.valorTotal = 0;
    this.saida = 0;
    this.entrada = 0;
    this.investimentos = 0;
    this.somaSaidas()
    this.somaInvestimento()
    this.somaEntrada()
    this.somaTotal()
  }

  saveLocalStorange(){
    if(localStorage.length != 0){
      if(!localStorage.getItem("local_fuctura")){
        localStorage.setItem("local_fuctura",JSON.stringify(this.financas))
    }else{
      localStorage.removeItem("local_fuctura")
      localStorage.setItem("local_fuctura",JSON.stringify(this.financas))
    }
  }
}

  loadLocalStorange(){
    if(localStorage.length != 0){
      if(localStorage.getItem("local_fuctura")){
        let financas = localStorage.getItem("local_fuctura");
        this.financas = JSON.parse(financas || '');
      }
    }
  }

}
