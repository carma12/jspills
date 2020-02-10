/*const template = document.querySelector('template');
console.log(template);
const node = document.importNode(template.content, true);
document.body.appendChild(node);*/


/*let getImport = document.querySelector('#footer-template');
let getContent = getImport.querySelector('#footer');
document.body.appendChild(document.importNode(getContent, true));*/

let template = document.getElementById('footer-template');
let templateContent = template.content;
document.body.appendChild(templateContent);
