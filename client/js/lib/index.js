// array campos recebe os valores preenchidos do formulário

let campos = [         
  document.querySelector('#data'),
  document.querySelector('#quantidade'),
  document.querySelector('#valor')   
];

let tbody = document.querySelector('table tbody');  // tbody é a variável que recebe as informações do tbody da table (inicialmente vazio)

// Criando o listener para o click no formulário
document.querySelector('.form').addEventListener("submit", (event) => {

    event.preventDefault(); // previne a atualização da página no momento da submissão do formulário
    
    let tr = document.createElement('tr'); // variável tr é criada e recebe uma tag tr => <tr></tr>
    
    campos.forEach((campo) => { // cada elemento do array campos recebe uma tg td com as informações contidas na posição correspondente do vetor => <td>campo.value</td> e as informações são inseridas dentro da tag tr
        let td = document.createElement('td');
        td.textContent = campo.value;
        tr.appendChild(td);
    });
    
    let tdVolume = document.createElement('td');  // criamos a variável tdVolume que recebe uma tag td
    tdVolume.textContent = campos[1].value * campos[2].value; // o conteúdo de tdVolume recebe o cálculo da multiplicação da quantidade pelo valor correspondente
    
    tr.appendChild(tdVolume);  // incluimos tdVolume na variável td

    tbody.appendChild(tr); // incluimos tr no tbody
    
    // zeramos as informações do formulário com foco na data
    campos[0].value = '';
    campos[1].value = 1;
    campos[2].value = 0;
    campos[0].focus();

});