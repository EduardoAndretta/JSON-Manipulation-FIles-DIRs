import {appendFileSync, readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, rmSync } from "fs";

/*  
    1.Criar uma função que irá criar um arquivo JSON para cada estado representado no
    arquivo Estados.json, e o seu conteúdo será um array das cidades pertencentes a
    aquele estado, de acordo com o arquivo Cidades.json. O nome do arquivo deve ser o
    UF do estado, por exemplo: MG.json. 
*/
 
// Create a file for all UFs

// IF exists
try{
   if (existsSync('./Estados')){
      rmSync('./Estados', {recursive: true, force: true})
   }
}catch (err){
    throw err
}

// IF not 
mkdirSync('./Estados');

const cidades = JSON.parse(readFileSync('./Cidades.json','utf-8', (err) => { 
    if(err) console.log('Houve um erro na leitura do arquivo Cidades.json')}));

const estados = JSON.parse(readFileSync('./Estados.json','utf-8', (err) => {
    if(err)console.log('Houve um erro na leitura do arquivo Estados.json')}));

function criaArquivos(){

    if(estados.length !== 0 && cidades.length !== 0){

        const estadosArray = estados.map((uf) => {

            let cidadesfilter = cidades.filter((cidade) => {return cidade.Estado === uf.ID});  

            writeFileSync(`./Estados/${uf.Sigla}.json`, JSON.stringify(cidadesfilter, null, 2), (err) => {
                if(err) console.log('Houve um erro na criação do arquivo.')
            });
        });
    }
}
criaArquivos();

/*
    2.Criar uma função que recebe como parâmetro o UF do estado, realize a leitura do
    arquivo JSON correspondente e retorne a quantidade de cidades daquele estado. 
*/


function EstadoCidadesQuantidade(ufValue){
    
  const data = readFileSync(`./Estados/${ufValue.toUpperCase()}.json`, 'utf-8', (err) => {
      if(err){console.log(`Houve um erro na leitura do arquivo ${ufValue.toUpperCase() }.json`)}       
  });

  let cidadesResultado = JSON.parse(data); 
  return Object.keys(cidadesResultado).length;
}

let e = EstadoCidadesQuantidade('rn');
console.log(e);

/*
    3.Criar um método que imprima no console um array com o UF dos cinco estados que
    mais possuem cidades, seguidos da quantidade, em ordem decrescente. Você pode
    usar a função criada no tópico 2. Exemplo de impressão: [“UF - 93”, “UF - 82”, “UF - 74”,
    “UF - 72”, “UF - 65”]
*/


function estadosRankingCidadesAlto(){

  let estados = JSON.parse(readFileSync(`./Estados.json`, 'utf-8', (err) => {
      if(err) throw err
  }));
  
  let ufQuantNome = [];

  if(estados.length !== 0){

    const estadosArray = estados.map((uf) => {  
              
      ufQuantNome.push({Sigla: uf.Sigla, QuantidadeCidades: EstadoCidadesQuantidade(uf.Sigla)});
              
      ufQuantNome.sort(function(a, b){
        return b.QuantidadeCidades - a.QuantidadeCidades;
      });    
    });
  }
  console.log(ufQuantNome.splice(0,5));
}


/*
    4.Criar um método que imprima no console um array com o UF dos cinco estados que 
    menos possuem cidades, seguidos da quantidade, em ordem decrescente. Você pode usar 
    a função criada no tópico 2. Exemplo de impressão: [“UF - 30”, “UF - 27”, “UF - 25”, “UF -
    23”, “UF - 21”] 
*/


estadosRankingCidadesAlto();

function estadosRankingCidadesBaixo(){

  let estados = JSON.parse(readFileSync(`./Estados.json`, 'utf-8', (err) => {
      if(err) throw err
  }));
  
  let ufQuantNome = [];

  if(estados.length !== 0){

    const estadosArray = estados.map((uf) => {  
              
      ufQuantNome.push({Sigla: uf.Sigla, QuantidadeCidades: EstadoCidadesQuantidade(uf.Sigla)});
              
      ufQuantNome.sort(function(a, b){
        return a.QuantidadeCidades - b.QuantidadeCidades;
      });   
    });
  }
  console.log(ufQuantNome.splice(0,5));
}
estadosRankingCidadesBaixo();
