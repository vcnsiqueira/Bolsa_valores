'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateHelper = function () {
    function DateHelper() {
        _classCallCheck(this, DateHelper);

        throw new Error('DateHelper não pode ser instanciada'); // Aviso para o programador de que DateHelper não deve ser instanciado para ser utilizado
    }

    _createClass(DateHelper, null, [{
        key: 'dateToText',
        value: function dateToText(data) {
            // Método estático (não precisa ter uma instância da classe pra trabalhar com ele) que recebe uma data no formato do JavaScript e transforma para texto nacional do formato "dd/mm/aaaa"


            var month = data.getMonth();
            if (month < 9) {
                month = '0' + (month + 1);
            } else {
                month++;
            }

            return data.getDate() + '/' + month + '/' + data.getFullYear();
        }
    }, {
        key: 'textToDate',
        value: function textToDate(texto) {
            // Método estático (não precisa ter uma instância da classe pra trabalhar com ele) que recebe um texto no formato "aaaa-mm-dd" e transforma no formato de data do JavaScript

            if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) {
                // Incluindo um failfast para verificar se o formato de texto recebido é válido
                throw new Error('O formato de texo para conversão para data deve estar no formato aaaa-mm-dd');
            }
            return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(texto.split('-').map(function (item, indice) {
                return item - indice % 2;
            })))))();
        }
    }]);

    return DateHelper;
}();
//# sourceMappingURL=DateHelper.js.map