'use strict'
var params = process.argv.slice(2); //Se coloco 2 para que no muestre el indice es decir
                                   // la ruta de donde esta el archivo: C:\Udemy\cursoJavaScript\backend\calculadora.js

var n1 = parseFloat(params[0]);
var n2 = parseFloat(params[1]);

var plantilla = `
La suma es: ${n1 + n2}
La resta es: ${n1 - n2}
La multiplicación es: ${n1 * n2}
La división es: ${n1 / n2}
`;


console.log(params);
console.log(plantilla);
console.log('Hola nodejs');