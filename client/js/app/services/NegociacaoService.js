class NegociacaoService {

    obterNegociacoesDaSemana() {
        
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest(); // criando uma instância de XMLHttpRequest

            xhr.open('GET', 'negociacoes/semana'); // abrindo com o método GET o endereço do localhost:3000/negociacoes/semana

            /* configurações */
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText) //transforma o texto do JSON para o formato objeto
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))); // instancia uma negociação para cada elemento da lista de objetos
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as negociações da semana!');
                    }      
                }
            };
            
            xhr.send(); // enviando as informações
        
        });       
    }

    obterNegociacoesDaSemanaAnterior() {
            
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest(); // criando uma instância de XMLHttpRequest

            xhr.open('GET', 'negociacoes/anterior'); // abrindo com o método GET o endereço do localhost:3000/negociacoes/semana

            /* configurações */
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText) //transforma o texto do JSON para o formato objeto
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))); // instancia uma negociação para cada elemento da lista de objetos
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as negociações da semana passada!');
                    }      
                }
            };
            
            xhr.send(); // enviando as informações

        });
    }

    obterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest(); // criando uma instância de XMLHttpRequest

            xhr.open('GET', 'negociacoes/retrasada'); // abrindo com o método GET o endereço do localhost:3000/negociacoes/semana

            /* configurações */
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText) //transforma o texto do JSON para o formato objeto
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))); // instancia uma negociação para cada elemento da lista de objetos
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as negociações da semana retrasada');
                    }      
                }
            };
            
            xhr.send(); // enviando as informações
        });
    }


}