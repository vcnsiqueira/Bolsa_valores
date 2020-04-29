'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectionFactory = function () {
    // criando um escopo privado a partir de uma função anônima

    var stores = ['negociacoes']; // lista de stores criadas para o banco
    var version = 3;
    var dbName = 'bolsa';

    var connection = null;
    var close = null;

    return function () {
        function ConnectionFactory() {
            _classCallCheck(this, ConnectionFactory);

            throw new Error('Não é possível criar instâncias de ConnectionFactory');
        }

        _createClass(ConnectionFactory, [{
            key: 'static_createStores',
            value: function static_createStores(connection) {

                stores.forEach(function (store) {
                    if (connection.objectStoresNames.contains(store)) {
                        // verifica se a object store já existe e, em caso afirmativo, a destroi
                        connection.deleteObjectStore(store);
                    }
                    connection.createObjectStore(store, { autoIncrement: true }); // cria a object store
                });
            }
        }], [{
            key: 'getConnection',
            value: function getConnection() {

                return new Promise(function (resolve, reject) {
                    var openRequest = window.indexedDB.open(dbName, version);
                    openRequest.onupgradeneeded = function (e) {
                        ConnectionFactory._createStores(e.target.result);
                    };
                    openRequest.onsuccess = function (e) {
                        if (!connection) {
                            // se a conexão ainda não foi estabelecida, ela é criada e passada para o e.target.result
                            connection = e.target.result;
                            close = connection.close.bind(connection);
                            connection.close = function () {
                                throw new Error('Você não pode fechar diretamente a conexão!');
                            };
                        }
                        resolve(connection);
                    };
                    openRequest.onerror = function (e) {

                        console.log(e.target.error);
                        reject(e.target.error.name);
                    };
                });
            }
        }, {
            key: 'closeConnection',
            value: function closeConnection() {
                if (connection) {
                    // Se existir uma conexão aberta, ela é fechada e a variável connection recebe null
                    close();
                    connection = null;
                }
            }
        }]);

        return ConnectionFactory;
    }();

    ConnectionFactory.getConnection();
}();
//# sourceMappingURL=ConnectionFactory.js.map