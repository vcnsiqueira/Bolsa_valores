class NegociacaoDao {

    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite') // abrindo uma transação no object store negociações de leitura e escrita
                .objectStore(this._store) // obtendo a object store
                .add(negociacao); // fazendo uma requisição para adicionar a negociação no object store (pode funcionar ou não)

            request.onsuccess = e => {
                resolve();
            };

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação!')
            };
        });
    }

}