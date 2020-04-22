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

    listaTodos() {
        return new Promise((resolve, reject) => {
            let cursor = this._connection
                .transaction([this._store], 'readwrite') // abrindo uma transação no object store negociações de leitura e escrita
                .objectStore(this._store) // obtendo a object store
                .openCursor(); //cursor é o cara que pode passear pela objectStore
            let negociacoes = []; // iniciando a variável negociacoes vazia para, em caso de sucesso, incluir a negociação aqui
            cursor.onsuccess = e => {
                let atual = e.target.result; // ponteiro para a negociação do banco
                if(atual) { // Se há dados para extrair da object store
                    let dado = atual.value // extrair o dado do ponteiro
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor)); // acrescenta a negociação na lista
                    atual.continue(); // repete
                } else {
                    resolve(negociacoes); // quando o ponteiro finaliza o trabalho tenho todas as negociações
                }
            };
            cursor.onerror = e => {
                console.log(e.target.error.name);
                reject('Não foi possível listar as negociações')
            };
        })
    }

    apagaTodos() {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite') // abrindo uma transação no object store negociações de leitura e escrita
                .objectStore(this._store) // obtendo a object store
                .clear(); // requisição para apagar a object store
            
            request.onsuccess = e => resolve('Negociações removidas com sucesso!');
            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível remover as negociações!')
            };
        })
    }

}