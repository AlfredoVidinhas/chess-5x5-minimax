export class Peca {
  Cor: string;
  Posicao: {X: number, Y: number};
  Peca;
  Vazio: boolean = true;
  active: boolean;
  Nome;
  Sugestao: boolean;
  Valor: number;

  constructor(obj?){
    if(obj){
      this.Posicao = obj;
    }
  }
}
