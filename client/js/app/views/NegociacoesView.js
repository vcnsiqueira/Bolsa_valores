class NegociacoesView  extends View {

    constructor(elemento) {
        
        super(elemento);

    }


    template(modelo) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${modelo.negociacoes.map( n => {  //para o array de negociações está sendo criada uma tr com os dados daquela negociação. Ao final incluímos o método join para criar os vários tr's
                    return `
                        <tr>
                            <td>${DateHelper.dateToText(n.data)}</td>
                            <td>${n.quantidade}</td>
                            <td>${n.valor}</td>
                            <td>${n.volume}</td>
                        </tr>
                    `
                }).join('')}
            </tbody>
                <td colspan="3"></td>
                <td>
                    ${modelo.volumeTotal}
                </td> 
            <tfoot>
            </tfoot>
        </table>
        `;
    }

}