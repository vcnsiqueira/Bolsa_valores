class HttpService {

    get(url) {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest(); // criando uma instância de XMLHttpRequest

            xhr.open('GET', url); // abrindo com o método GET o endereço do localhost:3000/negociacoes/semana

            /* configurações */
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)); //transforma o texto do JSON para o formato objeto
                    } else {
                        reject(xhr.responseText);
                    }      
                }
            };
            
            xhr.send();

        });
    }

    post(url, dado) {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest(); // criando uma instância de XMLHttpRequest

            xhr.open('POST', url, true)

            xhr.setRequestHeader("Content-Type", "application/json"); // adicionando ao cabeçalho da requisição qual tipo de conteúdo estamos enviando (JSON)
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(dado));

        });

    }

}