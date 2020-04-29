'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document); // simulação de microframework

        this._inputData = $('#data'); // incluindo o seletor dentro do constructor para que o DOM seja percorrido uma única vez
        this._inputQuantidade = $('#quantidade'); // incluindo o seletor dentro do constructor para que o DOM seja percorrido uma única vez
        this._inputValor = $('#valor'); // incluindo o seletor dentro do constructor para que o DOM seja percorrido uma única vez
        this._ordemAtual = ''; // quando a página for carregada, não tem nada, quando o usuário clicar em alguma coluna para ordenar, deve receber o nome da coluna

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), //incluindo a tabela de negociações como propriedade do controller
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
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        /*ProxyFactory.create(
            new Mensagem(), ['texto'], model =>
            this._mensagemView.update(model));
            */
        this._service = new NegociacaoService();

        this._init();
    }

    _createClass(NegociacaoController, [{
        key: '_init',
        value: function _init() {
            var _this = this;

            this._service.lista().then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    return _this._listaNegociacoes.adiciona(negociacao);
                });
            }).catch(function (erro) {
                return _this._mensagem.texto = erro;
            });

            setInterval(function () {
                // aplicando a função que importa as negociaçõea a cada 3 segundos
                _this.importaNegociacoes();
            }, 3000);
        }
    }, {
        key: 'adiciona',
        value: function adiciona(event) {
            var _this2 = this;

            // adicionar a negociação em uma lista

            event.preventDefault();

            var negociacao = this._criaNegociacao();

            this._service.cadastra(negociacao).then(function (mensagem) {
                _this2._listaNegociacoes.adiciona(negociacao);
                _this2._mensagem.texto = mensagem;
                _this2._limpaFormulario();
            }).catch(function (erro) {
                return _this2._mensagem.texto = erro;
            });
        }
    }, {
        key: 'importaNegociacoes',
        value: function importaNegociacoes() {
            var _this3 = this;

            this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                negociacoes.forEach(function (negociacao) {
                    return _this3._listaNegociacoes.adiciona(negociacao);
                });
                _this3._mensagem.texto = 'Negociações importadas com sucesso!';
            }).catch(function (erro) {
                return _this3._mensagem.texto = erro;
            });

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
    }, {
        key: 'apaga',
        value: function apaga() {
            var _this4 = this;

            this._service.apaga().then(function (mensagem) {
                _this4._mensagem.texto = mensagem;
                _this4._listaNegociacoes.esvazia();
            }).catch(function (erro) {
                return _this4._mensagem.texto = erro;
            });
        }
    }, {
        key: '_criaNegociacao',
        value: function _criaNegociacao() {
            // método utilizado para criar uma nova negociação

            var data = DateHelper.textToDate(this._inputData.value);
            return new Negociacao(data, parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: '_limpaFormulario',
        value: function _limpaFormulario() {
            // método iniciado com _ siginifica que o método só pode ser chamado pela própria classe - este método será utilizado para limpar os inputs da negociação

            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;

            this._inputData.focus();
        }
    }, {
        key: 'ordena',
        value: function ordena(coluna) {
            if (this._ordemAtual == coluna) {
                this._listaNegociacoes.inverteOrdem();
            } else {
                this._listaNegociacoes.ordena(function (a, b) {
                    return a[coluna] - b[coluna];
                });
            }
            this._ordemAtual = coluna;
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map