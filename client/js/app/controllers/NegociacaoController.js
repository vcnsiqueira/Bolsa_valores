class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);    // simulação de microframework
    
        this._inputData = $('#data');  // incluindo o seletor dentro do constructor para que o DOM seja percorrido uma única vez
        this._inputQuantidade = $('#quantidade');  // incluindo o seletor dentro do constructor para que o DOM seja percorrido uma única vez
        this._inputValor = $('#valor');  // incluindo o seletor dentro do constructor para que o DOM seja percorrido uma única vez
        
        this._listaNegociacoes = ProxyFactory.create( //ProxyFactory criado na pasta services
            new ListaNegociacoes(), 
            ['adiciona', 'esvazia'], model =>
                this._negociacoesView.update(model));        
        
        
        /* código antes da adoção do padrão proxy
        this._listaNegociacoes = new ListaNegociacoes(modelo =>  // this como parâmetro para trocar o contexto para o controller e retirar do contexto da ListaNegociacoes
            this._negociacoesView.update(modelo)); //incluindo a lista de negociações como propriedade do controller
        */ 
        
        this._negociacoesView = new NegociacoesView($('#negociacoesView')); //incluindo a tabela de negociações como propriedade do controller
        this._negociacoesView.update(this._listaNegociacoes);
        
        this._mensagem = ProxyFactory.create(
            new Mensagem(), ['texto'], model =>
            this._mensagemView.update(model));

        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
        

    }

    adiciona(event) { // adicionar a negociação em uma lista
        
        event.preventDefault();   
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        this._limpaFormulario();

    }

    apaga() {
        
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociações apagadas com sucesso!';
    }

    _criaNegociacao() { // método utilizado para criar uma nova negociação
        
        let data = DateHelper.textToDate(this._inputData.value);
        return new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        );

    }

    _limpaFormulario() { // método iniciado com _ siginifica que o método só pode ser chamado pela própria classe - este método será utilizado para limpar os inputs da negociação
        
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

}