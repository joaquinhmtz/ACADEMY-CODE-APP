
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['link', 'image'],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'align': [] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  ['clean']
];

var quill = new Quill('#editor', {
  modules : {
    toolbar : toolbarOptions
  },
  theme : 'snow'
});

var resultEditor = document.getElementById('resultEditor');
const form = document.getElementById('form')
var data = new FormData(form);

quill.on('text-change', function () {
  let patron = "<img ";
  let nuevoValor    = '<img style="width: 100%;" ';
  let patron2 = '<div class="ql-clipboard" contenteditable="true" tabindex="-1"></div><div class="ql-tooltip ql-hidden"><a class="ql-preview" target="_blank" href="about:blank"></a><input type="text" data-formula="e=mc^2" data-link="quilljs.com" data-video="Embed URL"><a class="ql-action"></a><a class="ql-remove"></a></div>';
  let nuevoValor2 = '';

  var delta = quill.getContents();
  var justHtml = quill.root.innerHTML;
  justHtml = justHtml.replace(patron, nuevoValor);
  justHtml = justHtml.replace(patron2, nuevoValor2);
  resultEditor.innerHTML = justHtml;
  data.set('body', resultEditor.innerHTML);
})

var categories = [{id:1, name:'Apple'}, {id:2, name:'Videojuegos'}, {id:3, name:'Móvil'}, {id:4, name:'Android'}, {id:5, name:'Computo'}, {id:6, name:'Desarrollo web'}, {id:7, name:'Desarrollo móvil'}];
var categoriesSelect = document.getElementById('categories');
categories.forEach(function(category){
  let opcion = document.createElement('option')
  opcion.value = category.id
  opcion.text = category.name
  categoriesSelect.add(opcion)
})
