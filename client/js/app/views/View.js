class View {

    constructor(elemento) {

        this._elemento = elemento;
    
    }

    template() {

        throw new Error('O método template deve ser implementado');  // envia uma mensagem para as classes filhas de que este método deve ser implementado

    }

    update(modelo) {
        
        this._elemento.innerHTML = this.template(modelo);

    }

}