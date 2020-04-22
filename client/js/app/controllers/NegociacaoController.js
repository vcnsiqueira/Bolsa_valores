class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);    // simulação de microframework
    
        this._inputData = $('#data');  // incluindo o seletor dentro do constructor para que o DOM seja percorrido uma única vez
        this._inputQuantidade = $('#quantidade');  // incluindo o seletor dentro do constructor para que o DOM seja percorrido uma única vez
        this._inputValor = $('#valor');  // incluindo o seletor dentro do constructor para que o DOM seja percorrido uma única vez
        this._ordemAtual = ''; // quando a página for carregada, não tem nada, quando o usuário clicar em alguma coluna para ordenar, deve receber o nome da coluna
        
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')), //incluindo a tabela de negociações como propriedade do controller
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');
        
        /*ProxyFactory.create( //ProxyFactory criado na pasta services
            new ListaNegociacoes(), 
            ['adiciona', 'esvazia'], model =>
                this._negociacoesView.update(model));        
        */
        
        
        /* código antes da adoção do padrão proxy
        this._listaNegociacoes = new ListaNegociacoes(modelo =>  // this como parâmetro para trocar o contexto para o controller e retirar do contexto da ListaNegociacoes
            this._negociacoesView.update(modelo)); //incluindo a lista de negociações como propriedade do controller
        */ 
        
        
        //this._negociacoesView.update(this._listaNegociacoes);
        //this._mensagemView.update(this._mensagem);
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'); 
        
        /*ProxyFactory.create(
            new Mensagem(), ['texto'], model =>
            this._mensagemView.update(model));
            */

        ConnectionFactory // listando todas as negociações na lista de negociações
            .getConnection()
            .then(connection => {
                new NegociacaoDao(connection)
                    .listaTodos()
                    .then(negociacoes => {
                        negociacoes.forEach(negociacao => {
                            this._listaNegociacoes.adiciona(negociacao)
                        });
                    })
                    .catch(erro => {
                        console.log(erro);
                        this._mensagem.texto = erro;
                    })
            });
        
        

    }

    adiciona(event) { // adicionar a negociação em uma lista
        
        event.preventDefault();  
        
        ConnectionFactory
            .getConnection() // criando a conexão com o banco de dados
            .then(connection =>  {
                
                let negociacao = this._criaNegociacao();
                
                new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(() => {
                        this._listaNegociacoes.adiciona(negociacao);
                        this._mensagem.texto = 'Negociacao adicionada com sucesso!';
                        this._limpaFormulario();
                    })
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    importaNegociacoes() {

        let service = new NegociacaoService();

        Promise.all([
            service.obterNegociacoesDaSemana(), 
            service.obterNegociacoesDaSemanaAnterior(),
            service.obterNegociacoesDaSemanaRetrasada()]
        ).then(negociacoes => {
            negociacoes
                .reduce((arrayAchatado, array) => arrayAchatado.concat(array, []))
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso!'
        })
        .catch(erro => this._mensagem.texto = erro);

        /* funções utilizando promises
        service.obterNegociacoesDaSemana()  //usando o padrão promise
            .then(negociacoes => {  // caso sucesso da promise
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                this._mensagem.texto = 'Negociações da semana obtidas com sucesso!'
            })
            .catch(erro => this._mensagem.texto = erro) // caso erro da promise

        service.obterNegociacoesDaSemanaAnterior()  //usando o padrão promise
            .then(negociacoes => {  // caso sucesso da promise
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                this._mensagem.texto = 'Negociações da semana passada obtidas com sucesso!'
            })
            .catch(erro => this._mensagem.texto = erro) // caso erro da promise 

        service.obterNegociacoesDaSemanaRetrasada()  //usando o padrão promise
            .then(negociacoes => {  // caso sucesso da promise
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                this._mensagem.texto = 'Negociações da semana retrasada obtidas com sucesso!'
            })
            .catch(erro => this._mensagem.texto = erro) // caso erro da promise

        */

        /* funções utilizando o callback
        service.obterNegociacoesDaSemana((erro, negociacoes) => {
            
            if(erro) {
                this._mensagem.texto = erro;
                return;
            }
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)); // para cada negociação criando a lista de negociações
            
            service.obterNegociacoesDaSemanaAnterior((erro, negociacoes) => {
            
                if(erro) {
                    this._mensagem.texto = erro;
                    return;
                }
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)); // para cada negociação criando a lista de negociações
                
                service.obterNegociacoesDaSemanaRetrasada((erro, negociacoes) => {
            
                    if(erro) {
                        this._mensagem.texto = erro;
                        return;
                    }
                    negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)); // para cada negociação criando a lista de negociações
                    this._mensagem.texto = 'Negociações importadas com sucesso!';
                });
            });
        });*/

    }

    apaga() {
        

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia()
            });
    }

    _criaNegociacao() { // método utilizado para criar uma nova negociação
        
        let data = DateHelper.textToDate(this._inputData.value);
        return new Negociacao(
            data,
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );

    }

    _limpaFormulario() { // método iniciado com _ siginifica que o método só pode ser chamado pela própria classe - este método será utilizado para limpar os inputs da negociação
        
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else{
            this._listaNegociacoes.ordena((a,b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }

}