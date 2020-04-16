class Codigo {

    constructor(texto) {

        if(!this._valida(texto)) throw new Error('O texto é inválido')
        this._texto = texto

    }

    _valida(texto) {
        
        return /\D{3}-\D{2}-\d{2}/.test(texto);

    }

    get texto() {

        return this._texto;

    }

}