class NegociacaoService {

    obterNegociacoesDaSemana(cb) {
        let xhr = new XMLHttpRequest(); // criando uma instância de XMLHttpRequest

        xhr.open('GET', 'negociacoes/semana'); // abrindo com o método GET o endereço do localhost:3000/negociacoes/semana

        /* configurações */
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    cb(null, JSON.parse(xhr.responseText) //transforma o texto do JSON para o formato objeto
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))); // instancia uma negociação para cada elemento da lista de objetos
                } else {
                    console.log(xhr.responseText);
                    cb('Não foi possível obter as negociações', null);
                }      
            }
        };
        
        xhr.send(); // enviando as informações
    }

    obterNegociacoesDaSemanaAnterior(cb) {
        let xhr = new XMLHttpRequest(); // criando uma instância de XMLHttpRequest

        xhr.open('GET', 'negociacoes/anterior'); // abrindo com o método GET o endereço do localhost:3000/negociacoes/semana

        /* configurações */
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    cb(null, JSON.parse(xhr.responseText) //transforma o texto do JSON para o formato objeto
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))); // instancia uma negociação para cada elemento da lista de objetos
                } else {
                    console.log(xhr.responseText);
                    cb('Não foi possível obter as negociações', null);
                }      
            }
        };
        
        xhr.send(); // enviando as informações
    }

    obterNegociacoesDaSemanaRetrasada(cb) {
        let xhr = new XMLHttpRequest(); // criando uma instância de XMLHttpRequest

        xhr.open('GET', 'negociacoes/retrasada'); // abrindo com o método GET o endereço do localhost:3000/negociacoes/semana

        /* configurações */
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    cb(null, JSON.parse(xhr.responseText) //transforma o texto do JSON para o formato objeto
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))); // instancia uma negociação para cada elemento da lista de objetos
                } else {
                    console.log(xhr.responseText);
                    cb('Não foi possível obter as negociações', null);
                }      
            }
        };
        
        xhr.send(); // enviando as informações
    }


}