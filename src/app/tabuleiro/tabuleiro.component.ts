import { Component, OnInit } from '@angular/core';
import { Peca } from '../model/peca.model';

@Component({
  selector: 'app-tabuleiro',
  templateUrl: './tabuleiro.component.html',
  styleUrls: ['./tabuleiro.component.scss']
})
export class TabuleiroComponent implements OnInit {

  Torre_w = {Nome: 'T', Cor: 'White', Posicao: {X: 0, Y: 4}, Peca: '&#9814;', Vazio: false} as Peca;
  Cavalo_w = {Nome: 'C', Cor: 'White', Posicao: {X: 1, Y: 4}, Peca: '&#9816;', Vazio: false} as Peca;
  Bispo_w = {Nome: 'B', Cor: 'White', Posicao: {X: 2, Y: 4}, Peca: '&#9815;', Vazio: false} as Peca;
  Rainha_w = {Nome: 'Ra', Cor: 'White', Posicao: {X: 3, Y: 4}, Peca: '&#9813;', Vazio: false} as Peca;
  Rei_w = {Nome: 'Re', Cor: 'White', Posicao: {X: 4, Y: 4}, Peca: '&#9812;', Vazio: false} as Peca;
  P1_w = {Nome: 'P', Cor: 'White', Posicao: {X: 0, Y: 3}, Peca: '&#9817;', Vazio: false} as Peca;
  P2_w = {Nome: 'P', Cor: 'White', Posicao: {X: 1, Y: 3}, Peca: '&#9817;', Vazio: false} as Peca;
  P3_w = {Nome: 'P', Cor: 'White', Posicao: {X: 2, Y: 3}, Peca: '&#9817;', Vazio: false} as Peca;
  P4_w = {Nome: 'P', Cor: 'White', Posicao: {X: 3, Y: 3}, Peca: '&#9817;', Vazio: false} as Peca;
  P5_w = {Nome: 'P', Cor: 'White', Posicao: {X: 4, Y: 3}, Peca: '&#9817;', Vazio: false} as Peca;

  Torre_b = {Nome: 'T', Cor: 'Black', Posicao: {X: 0, Y: 0}, Peca: '&#9820;', Vazio: false} as Peca;
  Cavalo_b = {Nome: 'C', Cor: 'Black', Posicao: {X: 1, Y: 0}, Peca: '&#9822;', Vazio: false} as Peca;
  Bispo_b = {Nome: 'B', Cor: 'Black', Posicao: {X: 2, Y: 0}, Peca: '&#9821;', Vazio: false} as Peca;
  Rainha_b = {Nome: 'Ra', Cor: 'Black', Posicao: {X: 3, Y: 0}, Peca: '&#9819;', Vazio: false} as Peca;
  Rei_b = {Nome: 'Re', Cor: 'Black', Posicao: {X: 4, Y: 0}, Peca: '&#9818;', Vazio: false} as Peca;
  P1_b = {Nome: 'P', Cor: 'Black', Posicao: {X: 0, Y: 1}, Peca: '&#9823;', Vazio: false} as Peca;
  P2_b = {Nome: 'P', Cor: 'Black', Posicao: {X: 1, Y: 1}, Peca: '&#9823;', Vazio: false} as Peca;
  P3_b = {Nome: 'P', Cor: 'Black', Posicao: {X: 2, Y: 1}, Peca: '&#9823;', Vazio: false} as Peca;
  P4_b = {Nome: 'P', Cor: 'Black', Posicao: {X: 3, Y: 1}, Peca: '&#9823;', Vazio: false} as Peca;
  P5_b = {Nome: 'P', Cor: 'Black', Posicao: {X: 4, Y: 1}, Peca: '&#9823;', Vazio: false} as Peca;

  Tabuleiro = [
    [this.Torre_b, this.Cavalo_b, this.Bispo_b, this.Rainha_b, this.Rei_b],
    [this.P1_b, this.P2_b, this.P3_b, this.P4_b, this.P5_b,],
    [new Peca({X: 0, Y: 2}), new Peca({X: 1, Y: 2}), new Peca({X: 2, Y: 2}), new Peca({X: 3, Y: 2}), new Peca({X: 4, Y: 2})],
    [this.P1_w, this.P2_w, this.P3_w, this.P4_w, this.P5_w],
    [this.Torre_w, this.Cavalo_w, this.Bispo_w, this.Rainha_w, this.Rei_w]
  ];

  PecaSelecionada = null;
  isBlackTurn = false;
  SugestaoList = [];

  constructor() { }

  ngOnInit(): void {
  }

  Selecionar(peca: Peca){

    const auxSugestao = this.SugestaoList.filter((x)=>x.Posicao.X == peca.Posicao.X && x.Posicao.Y == peca.Posicao.Y);

    if (auxSugestao.length > 0){
      const auxPX = this.PecaSelecionada.Posicao.X;
      const auxPY = this.PecaSelecionada.Posicao.Y;
      this.Tabuleiro[auxPY][auxPX] = new Peca({X: auxPX, Y: auxPY});
      this.PecaSelecionada.Posicao.X = peca.Posicao.X;
      this.PecaSelecionada.Posicao.Y = peca.Posicao.Y;
      this.Tabuleiro[peca.Posicao.Y][peca.Posicao.X] = this.PecaSelecionada;
    }

    this.LimparSelecao();

    if(this.isBlackTurn && peca.Cor == 'White'){
      return;
    }

    if(!this.isBlackTurn && peca.Cor == 'Black'){
      return;
    }

    if(this.PecaSelecionada){
      this.PecaSelecionada.active = false;
    }
    peca.active = true;
    this.PecaSelecionada = peca;

    this.OpcoesDeMovimentacao(peca);
  }

  OpcoesDeMovimentacao(peca: Peca){
    const PX = peca.Posicao.X;
    const PY = peca.Posicao.Y;

    switch(peca.Nome){
      case 'P':
        this.OpcoesP(PX, PY, peca);
      break;

      case 'T':
        this.OpcoesT(PX, PY, peca);
      break;

      case 'C':
        this.OpcoesC(PX, PY, peca);
      break;

      case 'B':
        this.OpcoesB(PX, PY, peca);
      break;

      case 'Re':
        this.OpcoesRe(PX, PY, peca);
      break;
    }
  }

  OpcoesP(PX, PY, peca){
    if(peca.Cor == 'White'){
      //white
      if((PY-1)>-1){
        const aux = this.Tabuleiro[peca.Posicao.Y-1][peca.Posicao.X];
        if(aux.Vazio){
          aux.Sugestao = true;
          this.SugestaoList.push(aux);
        }
        if((PX+1)<5){
          const aux = this.Tabuleiro[PY-1][PX+1];
          if(!aux.Vazio){
            if(aux.Cor != peca.Cor){
              aux.Sugestao = true;
              this.SugestaoList.push(aux);
            }
          }
        }
        if((PX-1)>-1){
          const aux = this.Tabuleiro[PY-1][PX-1];
          if(!aux.Vazio){
            if(aux.Cor != peca.Cor){
              aux.Sugestao = true;
              this.SugestaoList.push(aux);
            }
          }
        }
      }
    }
    else{
      //Black
      if((PY+1)<5){
        const aux = this.Tabuleiro[peca.Posicao.Y+1][peca.Posicao.X];
        if(aux.Vazio){
          aux.Sugestao = true;
          this.SugestaoList.push(aux);
        }
        if((PX+1)<5){
          const aux = this.Tabuleiro[PY+1][PX+1];
          if(!aux.Vazio){
            if(aux.Cor != peca.Cor){
              aux.Sugestao = true;
              this.SugestaoList.push(aux);
            }
          }
        }
        if((PX-1)>-1){
          const aux = this.Tabuleiro[PY+1][PX-1];
          if(!aux.Vazio){
            if(aux.Cor != peca.Cor){
              aux.Sugestao = true;
              this.SugestaoList.push(aux);
            }
          }
        }
      }
    }
  }

  OpcoesT(PX, PY, peca){

    // Para cima
    for(let i = PY-1; i > -1; i--){
      const auxPeca = this.Tabuleiro[i][PX];
      if(auxPeca.Vazio){
        auxPeca.Sugestao = true;
        this.SugestaoList.push(auxPeca);
      }
      else{
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
          break;
        }
        if(auxPeca.Cor == peca.Cor){
          break;
        }
      }
    }

    // Para baixo
    for(let i = PY+1; i < 5; i++){
      const auxPeca = this.Tabuleiro[i][PX];
      if(auxPeca.Vazio){
        auxPeca.Sugestao = true;
        this.SugestaoList.push(auxPeca);
      }
      else{
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
          break;
        }
        if(auxPeca.Cor == peca.Cor){
          break;
        }
      }
    }

    // Para a direita
    for(let i = PX+1; i < 5; i++){
      const auxPeca = this.Tabuleiro[PY][i];
      if(auxPeca.Vazio){
        auxPeca.Sugestao = true;
        this.SugestaoList.push(auxPeca);
      }
      else{
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
          break;
        }
        if(auxPeca.Cor == peca.Cor){
          break;
        }
      }
    }

    // Para a Esquerda
    for(let i = PX-1; i > -1; i--){
      const auxPeca = this.Tabuleiro[PY][i];
      if(auxPeca.Vazio){
        auxPeca.Sugestao = true;
        this.SugestaoList.push(auxPeca);
      }
      else{
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
          break;
        }
        if(auxPeca.Cor == peca.Cor){
          break;
        }
      }
    }
  }

  OpcoesC(PX, PY, peca){
    // Para cima
    if(PY-2 > -1){
      // Esquerda

      if(PX-1 > -1){
        const auxPeca = this.Tabuleiro[PY-2][PX-1];
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
        }
      }

      // Direita

      if(PX+1 < 5){
        const auxPeca = this.Tabuleiro[PY-2][PX+1];
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
        }
      }
    }

    // Para baixo
    if(PY+2 < 5){
      // Esquerda

      if(PX-1 > -1){
        const auxPeca = this.Tabuleiro[PY+2][PX-1];
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
        }
      }

      // Direita

      if(PX+1 < 5){
        const auxPeca = this.Tabuleiro[PY+2][PX+1];
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
        }
      }
    }

    // Para Direita
    if(PX+2 < 5){
      // Cima

      if(PY-1 > -1){
        const auxPeca = this.Tabuleiro[PY-1][PX+2];
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
        }
      }

      // Baixo

      if(PY+1 < 5){
        const auxPeca = this.Tabuleiro[PY+1][PX+2];
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
        }
      }
    }

    // Para Esquerda
    if(PX-2 < 5){
      // Cima

      if(PY-1 > -1){
        const auxPeca = this.Tabuleiro[PY-1][PX-2];
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
        }
      }

      // Baixo

      if(PY+1 < 5){
        const auxPeca = this.Tabuleiro[PY+1][PX-2];
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
        }
      }
    }

  }

  OpcoesB(PX, PY, peca){

    let auxPY = PY-1;
    //Para cima Esquerda
    for(let i = PX-1; i > -1; i--){
      if(auxPY < 0){
        break;
      }
      const auxPeca = this.Tabuleiro[auxPY][i];
      if(auxPeca.Vazio){
        auxPeca.Sugestao = true;
        this.SugestaoList.push(auxPeca);
      }
      else
      {
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
          break;
        }
        else{
          break;
        }
      }
      auxPY--;
    }

    auxPY = PY-1;
    //Para cima Direita
    for(let i = PX+1; i < 5; i++){
      if(auxPY < 0){
        break;
      }
      const auxPeca = this.Tabuleiro[auxPY][i];
      if(auxPeca.Vazio){
        auxPeca.Sugestao = true;
        this.SugestaoList.push(auxPeca);
      }
      else
      {
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
          break;
        }
        else
        {
          break;
        }
      }
      auxPY--;
    }

    let auxPX = PX+1;
    //Para baixo Esquerda
    for(let i = PY+1; i < 5; i++){
      if(auxPX > 4){
        break;
      }
      const auxPeca = this.Tabuleiro[i][auxPX];
      if(auxPeca.Vazio){
        auxPeca.Sugestao = true;
        this.SugestaoList.push(auxPeca);
      }
      else
      {
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
          break;
        }
        else{
          break;
        }
      }
      auxPX++;
    }

    auxPX = PX-1;
    //Para baixo direita
    for(let i = PY+1; i < 5; i++){
      if(auxPX < 0){
        break;
      }
      const auxPeca = this.Tabuleiro[i][auxPX];
      if(auxPeca.Vazio){
        auxPeca.Sugestao = true;
        this.SugestaoList.push(auxPeca);
      }
      else
      {
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
          break;
        }
        else{
          break;
        }
      }
      auxPX--;
    }

  }

  OpcoesRe(PX, PY, peca){
    let auxPeca;

    // Para cima
    if(PY-1 > -1){
      auxPeca = this.Tabuleiro[PY-1][PX];
      if(auxPeca.Vazio){
        auxPeca.Sugestao = true;
        this.SugestaoList.push(auxPeca);
      }
      else{
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
        }
      }
    }

    // Para Esquerda
    if(PX-1 > -1){
      auxPeca = this.Tabuleiro[PY][PX-1];
      if(auxPeca.Vazio){
        auxPeca.Sugestao = true;
        this.SugestaoList.push(auxPeca);
      }
      else{
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
        }
      }
    }

    // Para cima diagonal esquerda
    if(PX-1 > -1 && PY-1> -1){
      auxPeca = this.Tabuleiro[PY-1][PX-1];
      if(auxPeca.Vazio){
        auxPeca.Sugestao = true;
        this.SugestaoList.push(auxPeca);
      }
      else{
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
        }
      }
    }

    // Para cima diagonal direita
    if(PX+1 < 5 && PY-1> -1){
      auxPeca = this.Tabuleiro[PY-1][PX+1];
      if(auxPeca.Vazio){
        auxPeca.Sugestao = true;
        this.SugestaoList.push(auxPeca);
      }
      else{
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
        }
      }
    }

    // Para baixo diagonal esquerda
    if(PX+1 < 5 && PY+1 < 5){
      auxPeca = this.Tabuleiro[PY+1][PX+1];
      if(auxPeca.Vazio){
        auxPeca.Sugestao = true;
        this.SugestaoList.push(auxPeca);
      }
      else{
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
        }
      }
    }

    // Para cima diagonal direita
    if(PX-1 > -1 && PY+1 < 5){
      auxPeca = this.Tabuleiro[PY+1][PX-1];
      if(auxPeca.Vazio){
        auxPeca.Sugestao = true;
        this.SugestaoList.push(auxPeca);
      }
      else{
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
        }
      }
    }

    // Para Baixo
    if(PY+1 < 5){
      auxPeca = this.Tabuleiro[PY+1][PX];
      if(auxPeca.Vazio){
        auxPeca.Sugestao = true;
        this.SugestaoList.push(auxPeca);
      }
      else{
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
        }
      }
    }

    // Para Direita
    if(PX+1 < 5){
      auxPeca = this.Tabuleiro[PY][PX+1];
      if(auxPeca.Vazio){
        auxPeca.Sugestao = true;
        this.SugestaoList.push(auxPeca);
      }
      else{
        if(auxPeca.Cor != peca.Cor){
          auxPeca.Sugestao = true;
          this.SugestaoList.push(auxPeca);
        }
      }
    }

  }

  LimparSelecao(){
    this.SugestaoList.forEach(element => {
      element.Sugestao = false;
    });
    this.SugestaoList = [];
  }

}
