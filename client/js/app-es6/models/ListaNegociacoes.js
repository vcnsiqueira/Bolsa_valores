class ListaNegociacoes {

    constructor(armadilha) {

        this._negociacoes = [];

    }

    adiciona(negociacao) {
        
        this._negociacoes.push(negociacao);

    }

    get negociacoes() {
        
        return [].concat(this._negociacoes); // retornar o array vazio com o método de concatenação cria uma programção defensiva para que a leitura da negociação não possa ser alterada
    
    }

    esvazia() { // método para apagar a lista de negociações

        this._negociacoes = [];

    }

    get volumeTotal() {
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }

    ordena(criterio) {  // método para ordenar os elementos
        this._negociacoes.sort(criterio);
    }

    inverteOrdem() {
        this._negociacoes.reverse();
    }
}