"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListaNegociacoes = function () {
    function ListaNegociacoes(armadilha) {
        _classCallCheck(this, ListaNegociacoes);

        this._negociacoes = [];
    }

    _createClass(ListaNegociacoes, [{
        key: "adiciona",
        value: function adiciona(negociacao) {

            this._negociacoes.push(negociacao);
        }
    }, {
        key: "esvazia",
        value: function esvazia() {
            // método para apagar a lista de negociações

            this._negociacoes = [];
        }
    }, {
        key: "ordena",
        value: function ordena(criterio) {
            // método para ordenar os elementos
            this._negociacoes.sort(criterio);
        }
    }, {
        key: "inverteOrdem",
        value: function inverteOrdem() {
            this._negociacoes.reverse();
        }
    }, {
        key: "negociacoes",
        get: function get() {

            return [].concat(this._negociacoes); // retornar o array vazio com o método de concatenação cria uma programção defensiva para que a leitura da negociação não possa ser alterada
        }
    }, {
        key: "volumeTotal",
        get: function get() {
            return this._negociacoes.reduce(function (total, n) {
                return total + n.volume;
            }, 0.0);
        }
    }]);

    return ListaNegociacoes;
}();
//# sourceMappingURL=ListaNegociacoes.js.map