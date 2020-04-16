class DateHelper {

    constructor() {
        throw new Error('DateHelper não pode ser instanciada') // Aviso para o programador de que DateHelper não deve ser instanciado para ser utilizado
    }
    
    static dateToText(data) {  // Método estático (não precisa ter uma instância da classe pra trabalhar com ele) que recebe uma data no formato do JavaScript e transforma para texto nacional do formato "dd/mm/aaaa"

        
        let month = data.getMonth();
        if(month < 9){
            month = `0${month+1}`
        }else{
            month++
        }

        return `${data.getDate()}/${month}/${data.getFullYear()}`

    }

    static textToDate(texto) { // Método estático (não precisa ter uma instância da classe pra trabalhar com ele) que recebe um texto no formato "aaaa-mm-dd" e transforma no formato de data do JavaScript
        
        if(!/^\d{4}-\d{2}-\d{2}$/.test(texto)) {     // Incluindo um failfast para verificar se o formato de texto recebido é válido
            throw new Error('O formato de texo para conversão para data deve estar no formato aaaa-mm-dd')
        }
        return new Date(...texto.split('-').map((item, indice) => item - indice % 2));
    
    }


}