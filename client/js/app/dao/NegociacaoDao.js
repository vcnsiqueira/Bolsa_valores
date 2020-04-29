'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoDao = function () {
    function NegociacaoDao(connection) {
        _classCallCheck(this, NegociacaoDao);

        this._connection = connection;
        this._store = 'negociacoes';
    }

    _createClass(NegociacaoDao, [{
        key: 'adiciona',
        value: function adiciona(negociacao) {
            var _this = this;

            return new Promise(function (resolve, reject) {

                var request = _this._connection.transaction([_this._store], 'readwrite') // abrindo uma transação no object store negociações de leitura e escrita
                .objectStore(_this._store) // obtendo a object store
                .add(negociacao); // fazendo uma requisição para adicionar a negociação no object store (pode funcionar ou não)

                request.onsuccess = function (e) {
                    resolve();
                };

                request.onerror = function (e) {
                    console.log(e.target.error);
                    reject('Não foi possível adicionar a negociação!');
                };
            });
        }
    }, {
        key: 'listaTodos',
        value: function listaTodos() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var cursor = _this2._connection.transaction([_this2._store], 'readwrite') // abrindo uma transação no object store negociações de leitura e escrita
                .objectStore(_this2._store) // obtendo a object store
                .openCursor(); //cursor é o cara que pode passear pela objectStore
                var negociacoes = []; // iniciando a variável negociacoes vazia para, em caso de sucesso, incluir a negociação aqui
                cursor.onsuccess = function (e) {
                    var atual = e.target.result; // ponteiro para a negociação do banco
                    if (atual) {
                        // Se há dados para extrair da object store
                        var dado = atual.value; // extrair o dado do ponteiro
                        negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor)); // acrescenta a negociação na lista
                        atual.continue(); // repete
                    } else {
                        resolve(negociacoes); // quando o ponteiro finaliza o trabalho tenho todas as negociações
                    }
                };
                cursor.onerror = function (e) {
                    console.log(e.target.error.name);
                    reject('Não foi possível listar as negociações');
                };
            });
        }
    }, {
        key: 'apagaTodos',
        value: function apagaTodos() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var request = _this3._connection.transaction([_this3._store], 'readwrite') // abrindo uma transação no object store negociações de leitura e escrita
                .objectStore(_this3._store) // obtendo a object store
                .clear(); // requisição para apagar a object store

                request.onsuccess = function (e) {
                    return resolve('Negociações removidas com sucesso!');
                };
                request.onerror = function (e) {
                    console.log(e.target.error);
                    reject('Não foi possível remover as negociações!');
                };
            });
        }
    }]);

    return NegociacaoDao;
}();
//# sourceMappingURL=NegociacaoDao.js.map