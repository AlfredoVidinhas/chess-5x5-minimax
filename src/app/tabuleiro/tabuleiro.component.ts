import { Component, OnInit } from '@angular/core';
import { Peca } from '../model/peca.model';

@Component({
  selector: 'app-tabuleiro',
  templateUrl: './tabuleiro.component.html',
  styleUrls: ['./tabuleiro.component.scss']
})
export class TabuleiroComponent implements OnInit {

  Torre_w = { Nome: 'T', Cor: 'White', Posicao: { X: 0, Y: 4 }, Peca: '&#9814;', Vazio: false } as Peca;
  Cavalo_w = { Nome: 'C', Cor: 'White', Posicao: { X: 1, Y: 4 }, Peca: '&#9816;', Vazio: false } as Peca;
  Bispo_w = { Nome: 'B', Cor: 'White', Posicao: { X: 2, Y: 4 }, Peca: '&#9815;', Vazio: false } as Peca;
  Rainha_w = { Nome: 'Ra', Cor: 'White', Posicao: { X: 3, Y: 4 }, Peca: '&#9813;', Vazio: false } as Peca;
  Rei_w = { Nome: 'Re', Cor: 'White', Posicao: { X: 4, Y: 4 }, Peca: '&#9812;', Vazio: false } as Peca;
  P1_w = { Nome: 'P', Cor: 'White', Posicao: { X: 0, Y: 3 }, Peca: '&#9817;', Vazio: false } as Peca;
  P2_w = { Nome: 'P', Cor: 'White', Posicao: { X: 1, Y: 3 }, Peca: '&#9817;', Vazio: false } as Peca;
  P3_w = { Nome: 'P', Cor: 'White', Posicao: { X: 2, Y: 3 }, Peca: '&#9817;', Vazio: false } as Peca;
  P4_w = { Nome: 'P', Cor: 'White', Posicao: { X: 3, Y: 3 }, Peca: '&#9817;', Vazio: false } as Peca;
  P5_w = { Nome: 'P', Cor: 'White', Posicao: { X: 4, Y: 3 }, Peca: '&#9817;', Vazio: false } as Peca;

  Torre_b = { Nome: 'T', Cor: 'Black', Posicao: { X: 0, Y: 0 }, Peca: '&#9820;', Vazio: false } as Peca;
  Cavalo_b = { Nome: 'C', Cor: 'Black', Posicao: { X: 1, Y: 0 }, Peca: '&#9822;', Vazio: false } as Peca;
  Bispo_b = { Nome: 'B', Cor: 'Black', Posicao: { X: 2, Y: 0 }, Peca: '&#9821;', Vazio: false } as Peca;
  Rainha_b = { Nome: 'Ra', Cor: 'Black', Posicao: { X: 3, Y: 0 }, Peca: '&#9819;', Vazio: false } as Peca;
  Rei_b = { Nome: 'Re', Cor: 'Black', Posicao: { X: 4, Y: 0 }, Peca: '&#9818;', Vazio: false } as Peca;
  P1_b = { Nome: 'P', Cor: 'Black', Posicao: { X: 0, Y: 1 }, Peca: '&#9823;', Vazio: false } as Peca;
  P2_b = { Nome: 'P', Cor: 'Black', Posicao: { X: 1, Y: 1 }, Peca: '&#9823;', Vazio: false } as Peca;
  P3_b = { Nome: 'P', Cor: 'Black', Posicao: { X: 2, Y: 1 }, Peca: '&#9823;', Vazio: false } as Peca;
  P4_b = { Nome: 'P', Cor: 'Black', Posicao: { X: 3, Y: 1 }, Peca: '&#9823;', Vazio: false } as Peca;
  P5_b = { Nome: 'P', Cor: 'Black', Posicao: { X: 4, Y: 1 }, Peca: '&#9823;', Vazio: false } as Peca;

  Tabuleiro = [
    [this.Torre_b, this.Cavalo_b, this.Bispo_b, this.Rainha_b, this.Rei_b],
    [this.P1_b, this.P2_b, this.P3_b, this.P4_b, this.P5_b,],
    [new Peca({ X: 0, Y: 2 }), new Peca({ X: 1, Y: 2 }), new Peca({ X: 2, Y: 2 }), new Peca({ X: 3, Y: 2 }), new Peca({ X: 4, Y: 2 })],
    [this.P1_w, this.P2_w, this.P3_w, this.P4_w, this.P5_w],
    [this.Torre_w, this.Cavalo_w, this.Bispo_w, this.Rainha_w, this.Rei_w]
  ];

  PecaSelecionada = null;
  isBlackTurn = false;
  SugestaoList = [];

  File1: string; //white
  File2: string; //black

  constructor() { }

  ngOnInit(): void {
    this.Game();
    this.File1 = 'Start game\nWhite\n';
    this.File2 = 'Start game\nBlack\n';
  }

  PosXLetra(X:number){
    switch(X){
      case 0:
        return 'a';
      case 1:
        return 'b';
      case 2:
        return 'c';
      case 3:
        return 'd'
      case 4:
        return 'e';
    }
  }

  PosYNumber(Y:number){
    switch(Y){
      case 0:
        return '5';
      case 1:
        return '4';
      case 2:
        return '3';
      case 3:
        return '2'
      case 4:
        return '1';
    }
  }

  Selecionar(peca: Peca) {

    console.log('sugestao: ', this.SugestaoList)

    const auxSugestao = this.SugestaoList.filter((x) => x.Posicao.X == peca.Posicao.X && x.Posicao.Y == peca.Posicao.Y);

    if (auxSugestao.length > 0) {
      const auxPX = this.PecaSelecionada.Posicao.X;
      const auxPY = this.PecaSelecionada.Posicao.Y;
      this.Tabuleiro[auxPY][auxPX] = new Peca({ X: auxPX, Y: auxPY });
      this.PecaSelecionada.Posicao.X = peca.Posicao.X;
      this.PecaSelecionada.Posicao.Y = peca.Posicao.Y;
      this.Tabuleiro[peca.Posicao.Y][peca.Posicao.X] = this.PecaSelecionada;
      this.isBlackTurn = true;

      // colocar no arquivo
      this.File1 = this.File1 + this.PosXLetra(auxPX) + this.PosYNumber(auxPY) + this.PosXLetra(peca.Posicao.X) + this.PosYNumber(peca.Posicao.Y) + '\n';
      this.File2 = this.File2 + 'White played ' + this.PosXLetra(auxPX) + this.PosYNumber(auxPY) + this.PosXLetra(peca.Posicao.X) + this.PosYNumber(peca.Posicao.Y) + '\n';
      setTimeout( () => { this.Game(); }, 250 );
      
    }

    this.LimparSelecao(this.SugestaoList);

    if (this.isBlackTurn && peca.Cor == 'White') {
      return;
    }

    if (!this.isBlackTurn && peca.Cor == 'Black') {
      return;
    }

    if (this.PecaSelecionada) {
      this.PecaSelecionada.active = false;
    }
    peca.active = true;
    this.PecaSelecionada = peca;

    this.OpcoesDeMovimentacao(peca);
  }

  OpcoesDeMovimentacao(peca: Peca) {
    const PX = peca.Posicao.X;
    const PY = peca.Posicao.Y;

    switch (peca.Nome) {
      case 'P':
        this.SugestaoList = this.OpcoesP(PX, PY, peca);
        break;

      case 'T':
        this.SugestaoList = this.OpcoesT(PX, PY, peca);
        break;

      case 'C':
        this.SugestaoList = this.OpcoesC(PX, PY, peca);
        break;

      case 'B':
        this.SugestaoList = this.OpcoesB(PX, PY, peca);
        break;

      case 'Re':
        this.SugestaoList = this.OpcoesRe(PX, PY, peca);
        break;
      case 'Ra':
        this.SugestaoList = this.OpcoesRa(PX, PY, peca);
        break;
    }
  }

  OpcoesP(PX, PY, peca) {
    const list = [];

    if (peca.Cor == 'White') {
      //white
      if ((PY - 1) > -1) {
        console.log('pos: ', PY, 'posY: ', PY - 1,);
        const aux = this.Tabuleiro[peca.Posicao.Y - 1][peca.Posicao.X];
        if (aux.Vazio) {
          aux.Sugestao = true;
          list.push(aux);
        }
        if ((PX + 1) < 5) {
          const aux = this.Tabuleiro[PY - 1][PX + 1];
          if (!aux.Vazio) {
            if (aux.Cor != peca.Cor) {
              aux.Sugestao = true;
              list.push(aux);
            }
          }
        }
        if ((PX - 1) > -1) {
          const aux = this.Tabuleiro[PY - 1][PX - 1];
          if (!aux.Vazio) {
            if (aux.Cor != peca.Cor) {
              aux.Sugestao = true;
              list.push(aux);
            }
          }
        }
      }
    }
    else {
      //Black
      if ((PY + 1) < 5) {
        const aux = this.Tabuleiro[peca.Posicao.Y + 1][peca.Posicao.X];
        if (aux.Vazio) {
          aux.Sugestao = true;
          list.push(aux);
        }
        if ((PX + 1) < 5) {
          const aux = this.Tabuleiro[PY + 1][PX + 1];
          if (!aux.Vazio) {
            if (aux.Cor != peca.Cor) {
              aux.Sugestao = true;
              list.push(aux);
            }
          }
        }
        if ((PX - 1) > -1) {
          const aux = this.Tabuleiro[PY + 1][PX - 1];
          if (!aux.Vazio) {
            if (aux.Cor != peca.Cor) {
              aux.Sugestao = true;
              list.push(aux);
            }
          }
        }
      }
    }
    return list;
  }

  OpcoesT(PX, PY, peca) {
    const list = [];
    // Para cima
    for (let i = PY - 1; i > -1; i--) {
      const auxPeca = this.Tabuleiro[i][PX];
      if (auxPeca.Vazio) {
        auxPeca.Sugestao = true;
        list.push(auxPeca);
      }
      else {
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
          break;
        }
        if (auxPeca.Cor == peca.Cor) {
          break;
        }
      }
    }

    // Para baixo
    for (let i = PY + 1; i < 5; i++) {
      const auxPeca = this.Tabuleiro[i][PX];
      if (auxPeca.Vazio) {
        auxPeca.Sugestao = true;
        list.push(auxPeca);
      }
      else {
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
          break;
        }
        if (auxPeca.Cor == peca.Cor) {
          break;
        }
      }
    }

    // Para a direita
    for (let i = PX + 1; i < 5; i++) {
      const auxPeca = this.Tabuleiro[PY][i];
      if (auxPeca.Vazio) {
        auxPeca.Sugestao = true;
        list.push(auxPeca);
      }
      else {
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
          break;
        }
        if (auxPeca.Cor == peca.Cor) {
          break;
        }
      }
    }

    // Para a Esquerda
    for (let i = PX - 1; i > -1; i--) {
      const auxPeca = this.Tabuleiro[PY][i];
      if (auxPeca.Vazio) {
        auxPeca.Sugestao = true;
        list.push(auxPeca);
      }
      else {
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
          break;
        }
        if (auxPeca.Cor == peca.Cor) {
          break;
        }
      }
    }

    return list;
  }

  OpcoesC(PX, PY, peca) {
    const list = [];
    // Para cima
    if (PY - 2 > -1) {
      // Esquerda

      if (PX - 1 > -1) {
        const auxPeca = this.Tabuleiro[PY - 2][PX - 1];
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
        }
      }

      // Direita

      if (PX + 1 < 5) {
        const auxPeca = this.Tabuleiro[PY - 2][PX + 1];
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
        }
      }
    }

    // Para baixo
    if (PY + 2 < 5) {
      // Esquerda

      if (PX - 1 > -1) {
        const auxPeca = this.Tabuleiro[PY + 2][PX - 1];
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
        }
      }

      // Direita

      if (PX + 1 < 5) {
        const auxPeca = this.Tabuleiro[PY + 2][PX + 1];
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
        }
      }
    }

    // Para Direita
    if (PX + 2 < 5) {
      // Cima

      if (PY - 1 > -1) {
        const auxPeca = this.Tabuleiro[PY - 1][PX + 2];
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
        }
      }

      // Baixo

      if (PY + 1 < 5) {
        const auxPeca = this.Tabuleiro[PY + 1][PX + 2];
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
        }
      }
    }

    // Para Esquerda
    if (PX - 2 < 5 && PX - 2 > -1) {
      // Cima

      if (PY - 1 > -1) {
        const auxPeca = this.Tabuleiro[PY - 1][PX - 2];
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
        }
      }

      // Baixo

      if (PY + 1 < 5) {
        const auxPeca = this.Tabuleiro[PY + 1][PX - 2];
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
        }
      }
    }

    return list;

  }

  OpcoesB(PX, PY, peca) {
    const list = [];
    let auxPY = PY - 1;
    //Para cima Esquerda
    for (let i = PX - 1; i > -1; i--) {
      if (auxPY < 0) {
        break;
      }
      const auxPeca = this.Tabuleiro[auxPY][i];
      if (auxPeca.Vazio) {
        auxPeca.Sugestao = true;
        list.push(auxPeca);
      }
      else {
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
          break;
        }
        else {
          break;
        }
      }
      auxPY--;
    }

    auxPY = PY - 1;
    //Para cima Direita
    for (let i = PX + 1; i < 5; i++) {
      if (auxPY < 0) {
        break;
      }
      const auxPeca = this.Tabuleiro[auxPY][i];
      if (auxPeca.Vazio) {
        auxPeca.Sugestao = true;
        list.push(auxPeca);
      }
      else {
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
          break;
        }
        else {
          break;
        }
      }
      auxPY--;
    }

    let auxPX = PX + 1;
    //Para baixo Esquerda
    for (let i = PY + 1; i < 5; i++) {
      if (auxPX > 4) {
        break;
      }
      const auxPeca = this.Tabuleiro[i][auxPX];
      if (auxPeca.Vazio) {
        auxPeca.Sugestao = true;
        list.push(auxPeca);
      }
      else {
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
          break;
        }
        else {
          break;
        }
      }
      auxPX++;
    }

    auxPX = PX - 1;
    //Para baixo direita
    for (let i = PY + 1; i < 5; i++) {
      if (auxPX < 0) {
        break;
      }
      const auxPeca = this.Tabuleiro[i][auxPX];
      if (auxPeca.Vazio) {
        auxPeca.Sugestao = true;
        list.push(auxPeca);
      }
      else {
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
          break;
        }
        else {
          break;
        }
      }
      auxPX--;
    }

    return list;
  }

  OpcoesRe(PX, PY, peca) {

    const list = [];

    let auxPeca;

    // Para cima
    if (PY - 1 > -1) {
      auxPeca = this.Tabuleiro[PY - 1][PX];
      if (auxPeca.Vazio) {
        auxPeca.Sugestao = true;
        list.push(auxPeca);
      }
      else {
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
        }
      }
    }

    // Para Esquerda
    if (PX - 1 > -1) {
      auxPeca = this.Tabuleiro[PY][PX - 1];
      if (auxPeca.Vazio) {
        auxPeca.Sugestao = true;
        list.push(auxPeca);
      }
      else {
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
        }
      }
    }

    // Para cima diagonal esquerda
    if (PX - 1 > -1 && PY - 1 > -1) {
      auxPeca = this.Tabuleiro[PY - 1][PX - 1];
      if (auxPeca.Vazio) {
        auxPeca.Sugestao = true;
        list.push(auxPeca);
      }
      else {
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
        }
      }
    }

    // Para cima diagonal direita
    if (PX + 1 < 5 && PY - 1 > -1) {
      auxPeca = this.Tabuleiro[PY - 1][PX + 1];
      if (auxPeca.Vazio) {
        auxPeca.Sugestao = true;
        list.push(auxPeca);
      }
      else {
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
        }
      }
    }

    // Para baixo diagonal esquerda
    if (PX + 1 < 5 && PY + 1 < 5) {
      auxPeca = this.Tabuleiro[PY + 1][PX + 1];
      if (auxPeca.Vazio) {
        auxPeca.Sugestao = true;
        list.push(auxPeca);
      }
      else {
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
        }
      }
    }

    // Para cima diagonal direita
    if (PX - 1 > -1 && PY + 1 < 5) {
      auxPeca = this.Tabuleiro[PY + 1][PX - 1];
      if (auxPeca.Vazio) {
        auxPeca.Sugestao = true;
        list.push(auxPeca);
      }
      else {
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
        }
      }
    }

    // Para Baixo
    if (PY + 1 < 5) {
      auxPeca = this.Tabuleiro[PY + 1][PX];
      if (auxPeca.Vazio) {
        auxPeca.Sugestao = true;
        list.push(auxPeca);
      }
      else {
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
        }
      }
    }

    // Para Direita
    if (PX + 1 < 5) {
      auxPeca = this.Tabuleiro[PY][PX + 1];
      if (auxPeca.Vazio) {
        auxPeca.Sugestao = true;
        list.push(auxPeca);
      }
      else {
        if (auxPeca.Cor != peca.Cor) {
          auxPeca.Sugestao = true;
          list.push(auxPeca);
        }
      }
    }

    return list;

  }

  LimparSelecao(list:Peca[]) {
    this.Tabuleiro.forEach(rows => {
      rows.forEach(element => {
        element.Sugestao = false;
      });
    });
  }

  OpcoesRa(PX, PY, peca) {
    const aux = this.OpcoesT(PX, PY, peca);
    const aux1 = this.OpcoesB(PX, PY, peca);
    return aux.concat(aux1);
  }

  isInCheck(cor: string){
    const pecasWhites = this.GetAllPecaByColor(cor);

    for(let i = 0; i < pecasWhites.length; i++){
      this.OpcoesDeMovimentacao(pecasWhites[i]);
      const opcoes = this.SugestaoList.filter((x) => x.Nome == 'Re');
      if(opcoes.length>0){
        return true;
      }
    }
    return false;
  }

  BonsMovimentos(peca: Peca){

    let list = [];

    console.log('PecaIn: ', peca);
    switch(peca.Nome){
      case 'P':
        list =  this.OpcoesP(peca.Posicao.X, peca.Posicao.Y, peca);
        break;

      case 'T':
        list =  this.OpcoesT(peca.Posicao.X, peca.Posicao.Y, peca);
        break;

      case 'C':
        list =  this.OpcoesC(peca.Posicao.X, peca.Posicao.Y, peca);
        break;

      case 'B':
        list =  this.OpcoesB(peca.Posicao.X, peca.Posicao.Y, peca);
        break;

      case 'Re':
        list =  this.OpcoesRe(peca.Posicao.X, peca.Posicao.Y, peca);
        break;

      case 'Ra':
        list =  this.OpcoesRa(peca.Posicao.X, peca.Posicao.Y, peca);
        break;
    }

    const bonsMov = [];

    console.log('### list: ' + list)

    list.forEach(element => {
      const PX = peca.Posicao.X;
      const PY = peca.Posicao.Y;
      const PX1 = element.Posicao.X;
      const PY1 = element.Posicao.Y;

      peca.Posicao.X = PX1;
      peca.Posicao.Y = PY1;

      element.Posicao.X = PX;
      element.Posicao.Y = PY;

      this.Tabuleiro[PY1][PX1] = peca;
      this.Tabuleiro[PY][PX] = element;

      if(!this.isInCheck(peca.Cor=='White'?'Black':'White')){
        bonsMov.push(element);
      }

      // back
      peca.Posicao.X = PX;
      peca.Posicao.Y = PY;

      element.Posicao.X = PX1;
      element.Posicao.Y = PY1;

      this.Tabuleiro[PY][PX] = peca;
      this.Tabuleiro[PY1][PX1] = element;

    });

    return bonsMov;
  }

  /// minimax

  GetPecaValor(peca: Peca, y, x){
    if (peca.Vazio) {
      return 0;
    }

    let absoluteValue;
    switch(peca.Nome){
      case 'P':
        absoluteValue = 1

      case 'T':
        absoluteValue = 5

      case 'C':
        absoluteValue = 3

      case 'B':
        absoluteValue = 3

      case 'Re':
        absoluteValue = 0

      case 'Ra':
        absoluteValue = 9
    }

    return peca.Cor == 'White' ? absoluteValue : -absoluteValue;
  }

  GetAllPecaByColor(cor: string){

    const pecas = [];

    this.Tabuleiro.forEach(element => {
      element.forEach(peca =>{
        if(peca.Vazio || peca.Cor != cor){
          return;
        }
        
        pecas.push(peca);
      });
    });

    return pecas;
  }

  // Novo

  minimaxRoot(depth, isMaximisingPlayer){
    const cor = isMaximisingPlayer? 'Black' : 'White';
    let newGameMoves = this.GetAllPecaByColor(cor);
    let bestMove = -29;
    let bestMoveFound;
    let MoveFound;

    for(let i = 0; i < newGameMoves.length; i++) {
      let newGameMove = newGameMoves[i];
      const moves = this.BonsMovimentos(newGameMove);

      for(let j = 0; j < moves.length; j++) {
        let move = moves[j];

        const PX = newGameMove.Posicao.X;
        const PY = newGameMove.Posicao.Y;
        const PX1 = move.Posicao.X;
        const PY1 = move.Posicao.Y;

        newGameMove.Posicao.X = PX1;
        newGameMove.Posicao.Y = PY1;

        move.Posicao.X = PX;
        move.Posicao.Y = PY;

        this.Tabuleiro[PY1][PX1] = newGameMove;
        this.Tabuleiro[PY][PX] = move;

        let value = this.minimax(depth - 1, -10000, 10000, !isMaximisingPlayer);

        // go back
        newGameMove.Posicao.X = PX;
        newGameMove.Posicao.Y = PY;

        move.Posicao.X = PX1;
        move.Posicao.Y = PY1;

        this.Tabuleiro[PY][PX] = newGameMove;
        this.Tabuleiro[PY1][PX1] = move;

        if(value >= bestMove) {
          bestMove = value;
          bestMoveFound = newGameMove;
          MoveFound = move;
        }

      }

    }

    return {bestMoveFound, MoveFound};

  }

  evaluateBoard(){
    let totalEvaluation = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        totalEvaluation = totalEvaluation + this.GetPecaValor(this.Tabuleiro[i][j], j, i);
      }
    }
    return totalEvaluation;
  }

  minimax(depth, alpha, beta, isMaximisingPlayer){
    if (depth === 0) {
      return -this.evaluateBoard();
    }

    const cor = isMaximisingPlayer? 'Black' : 'White';

    let newGameMoves = this.GetAllPecaByColor(cor);

    if (isMaximisingPlayer) {
      let bestMove = -29;

      for(let i = 0; i < newGameMoves.length; i++) {
        let newGameMove = newGameMoves[i];
        const moves = this.BonsMovimentos(newGameMove);
  
        for(let j = 0; j < moves.length; j++) {
          let move = moves[j];
  
          const PX = newGameMove.Posicao.X;
          const PY = newGameMove.Posicao.Y;
          const PX1 = move.Posicao.X;
          const PY1 = move.Posicao.Y;
  
          newGameMove.Posicao.X = PX1;
          newGameMove.Posicao.Y = PY1;
  
          move.Posicao.X = PX;
          move.Posicao.Y = PY;
  
          this.Tabuleiro[PY1][PX1] = newGameMove;
          this.Tabuleiro[PY][PX] = move;
  
          bestMove = Math.max(bestMove, this.minimax(depth - 1, alpha, beta, !isMaximisingPlayer));
  
          // go back
          newGameMove.Posicao.X = PX;
          newGameMove.Posicao.Y = PY;
  
          move.Posicao.X = PX1;
          move.Posicao.Y = PY1;
  
          this.Tabuleiro[PY][PX] = newGameMove;
          this.Tabuleiro[PY1][PX1] = move;
  
          alpha = Math.max(alpha, bestMove);
          if (beta <= alpha) {
            return bestMove;
          }
  
        }
  
      }
      return bestMove;
    }
    else{
      let bestMove = 9999;

      for(let i = 0; i < newGameMoves.length; i++) {
        let newGameMove = newGameMoves[i];
        const moves = this.BonsMovimentos(newGameMove);
  
        for(let j = 0; j < moves.length; j++) {
          let move = moves[j];
  
          const PX = newGameMove.Posicao.X;
          const PY = newGameMove.Posicao.Y;
          const PX1 = move.Posicao.X;
          const PY1 = move.Posicao.Y;
  
          newGameMove.Posicao.X = PX1;
          newGameMove.Posicao.Y = PY1;
  
          move.Posicao.X = PX;
          move.Posicao.Y = PY;
  
          this.Tabuleiro[PY1][PX1] = newGameMove;
          this.Tabuleiro[PY][PX] = move;
  
          bestMove = Math.min(bestMove, this.minimax(depth - 1, alpha, beta, !isMaximisingPlayer));
  
          // go back
          newGameMove.Posicao.X = PX;
          newGameMove.Posicao.Y = PY;
  
          move.Posicao.X = PX1;
          move.Posicao.Y = PY1;
  
          this.Tabuleiro[PY][PX] = newGameMove;
          this.Tabuleiro[PY1][PX1] = move;
  
          beta = Math.min(beta, bestMove);
          if (beta <= alpha) {
            return bestMove;
          }
  
        }
  
      }

      return bestMove;
    }
  }

  Game(){
    while(this.isBlackTurn){
      var bestMove = this.minimaxRoot(3, true);
      this.LimparSelecao([]);
      console.log('best: ', bestMove);
      if(bestMove.bestMoveFound && bestMove.MoveFound){
        const auxPX = bestMove.bestMoveFound.Posicao.X;
        const auxPY = bestMove.bestMoveFound.Posicao.Y;
        const auxPX1 = bestMove.MoveFound.Posicao.X;
        const auxPY1 = bestMove.MoveFound.Posicao.Y;

        bestMove.bestMoveFound.Posicao.X = auxPX1;
        bestMove.bestMoveFound.Posicao.Y = auxPY1;

        bestMove.MoveFound.Posicao.X = auxPX;
        bestMove.MoveFound.Posicao.Y = auxPY;

        if(bestMove.MoveFound.Vazio){
          this.Tabuleiro[auxPY][auxPX] = bestMove.MoveFound;
        }
        else{
          this.Tabuleiro[auxPY][auxPX] = new Peca({ X: auxPX, Y: auxPY });
        }

        this.Tabuleiro[auxPY1][auxPX1] = bestMove.bestMoveFound;

        this.File2 = this.File2 + this.PosXLetra(auxPX) + this.PosYNumber(auxPY) + this.PosXLetra(auxPX1) + this.PosYNumber(auxPY1) + '\n';
        this.File1 = this.File1 + 'Black played ' + this.PosXLetra(auxPX) + this.PosYNumber(auxPY) + this.PosXLetra(auxPX1) + this.PosYNumber(auxPY1) + '\n';

        this.isBlackTurn = false;
      }
      else{
        alert('White wins!');
        this.isBlackTurn = false;
      }
    }
    
  }

  writeContents(content, fileName, contentType) {
    var a = document.createElement('a');
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  gerar(){
    this.writeContents(this.File1, 'player1'+'.txt', 'text/plain');
    this.writeContents(this.File2, 'player2'+'.txt', 'text/plain');
  }

}

