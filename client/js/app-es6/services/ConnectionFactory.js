var ConnectionFactory = (function () { // criando um escopo privado a partir de uma função anônima
    
    const stores = ['negociacoes']; // lista de stores criadas para o banco
    const version = 3;
    const dbName = 'bolsa';
    
    var connection = null;
    var close = null;

    return class ConnectionFactory {

        constructor() {
            throw new Error ('Não é possível criar instâncias de ConnectionFactory');
        }

        static getConnection() {

            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dbName, version);
                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result);
                };
                openRequest.onsuccess = e => {
                    if(!connection) { // se a conexão ainda não foi estabelecida, ela é criada e passada para o e.target.result
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function() {
                            throw new Error('Você não pode fechar diretamente a conexão!')
                        }
                    }
                    resolve(connection);
                }
                openRequest.onerror = e => {
                    
                    console.log(e.target.error);
                    reject(e.target.error.name);
                }
            });

        }

        static_createStores(connection) {

            stores.forEach(store => {
                if(connection.objectStoresNames.contains(store)) { // verifica se a object store já existe e, em caso afirmativo, a destroi
                    connection.deleteObjectStore(store);
                }
                connection.createObjectStore(store, { autoIncrement: true }); // cria a object store
            });

        }

        static closeConnection () {
            if(connection) { // Se existir uma conexão aberta, ela é fechada e a variável connection recebe null
                close();
                connection = null;
            }
        }

    }

    ConnectionFactory.getConnection();

})();