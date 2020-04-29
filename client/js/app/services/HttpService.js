'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpService = function () {
    function HttpService() {
        _classCallCheck(this, HttpService);
    }

    _createClass(HttpService, [{
        key: '_handleErrors',
        value: function _handleErrors(res) {
            // Função para verificar se houve erro na requisição pela fetch API
            if (!res.ok) throw new Error(res.statusText);
            return res;
        }
    }, {
        key: 'get',
        value: function get(url) {
            var _this = this;

            return fetch(url).then(function (res) {
                return _this._handleErrors(res);
            }).then(function (res) {
                return res.json();
            });
        }

        /*get(url) {
            return new Promise((resolve, reject) => {
                  let xhr = new XMLHttpRequest(); // criando uma instância de XMLHttpRequest
                  xhr.open('GET', url); // abrindo com o método GET o endereço do localhost:3000/negociacoes/semana
                  
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
        }*/

    }, {
        key: 'post',
        value: function post(url, dado) {
            var _this2 = this;

            return fetch(url, {
                headers: { 'Content-type': 'application/json' },
                method: 'post',
                body: JSON.stringify(dado)
            }).then(function (res) {
                return _this2._handleErrors(res);
            });
        }

        /*post(url, dado) {
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
          }*/

    }]);

    return HttpService;
}();
//# sourceMappingURL=HttpService.js.map