const recintos = [{
    numero : 1,
    bioma:["savana", "floresta"],
    tamanho_total: 10,
    espaco_livre: 7,
    animais_existentes: [{especie:"MACACO", quantidade: 3}]
},
{
    numero : 2,
    bioma:["floresta"],
    tamanho_total: 5,
    espaco_livre: 5,
    animais_existentes: []
},{
    numero : 3,
    bioma:["savana"],
    tamanho_total: 7,
    espaco_livre: 5,
    animais_existentes: [{especie:"GAZELA", quantidade:1}]
},{
    numero : 4,
    bioma:"rio",
    tamanho_total: 8,
    espaco_livre: 8,
    animais_existentes: []
},{
    numero : 5,
    bioma:["savana"],
    tamanho_total: 9,
    espaco_livre: 6,
    animais_existentes: [{especie:"LEAO", quantidade:1}]
},]

export {recintos as recintos}