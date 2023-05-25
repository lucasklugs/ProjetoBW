//Variable que mantiene el estado visible del carrito
var carrinhoVisible = false;


//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}


function ready(){
   
    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrinho);
    }


    //Agrego funcionalidad al boton sumar cantidad
    var botonesSomarQuantidade = document.getElementsByClassName('somar-quantidade');
    for(var i=0;i<botonesSomarQuantidade.length; i++){
        var button = botonesSomarQuantidade[i];
        button.addEventListener('click',somarQuantidade);
    }


     //Agrego funcionalidad al buton restar cantidad
    var botaoRestarQuantidade = document.getElementsByClassName('restar-quantidade');
    for(var i=0;i<botaoRestarQuantidade.length; i++){
        var button = botaoRestarQuantidade[i];
        button.addEventListener('click',restarQuantidade);
    }


    //Agregamos funcionalidad al boton Agregar al carrito
    var botonesAdicionarAoCarrinho = document.getElementsByClassName('botao-item');
    for(var i=0; i<botonesAdicionarAoCarrinho.length;i++){
        var button = botonesAdicionarAoCarrinho[i];
        button.addEventListener('click', adicionarAoCarrinhoClicked);
    }


    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked(){
    alert("Obrigado pela compra!");
    //Elimino todos los elmentos del carrito
    var carrinhoItens = document.getElementsByClassName('carrinho-itens')[0];
    while (carrinhoItens.hasChildNodes()){
        carrinhoItens.removeChild(carrinhoItens.firstChild)
    }
    atualizarTotalCarrinho();
    ocultarCarrinho();
}
//Funciòn que controla el boton clickeado de agregar al carrito
function adicionarAoCarrinhoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var preco = item.getElementsByClassName('preco-item')[0].innerText;
    var imagemSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagemSrc);


    adicionarItemAoCarrinho(titulo, preco, imagemSrc);


    hacerVisibleCarrinho();
}


//Funcion que hace visible el carrito
function hacerVisibleCarrinho(){
    carrinhoVisible = true;
    var carrinho = document.getElementsByClassName('carrinho')[0];
    carrinho.style.marginRight = '0';
    carrinho.style.opacity = '1';


    var itens =document.getElementsByClassName('produtos-itens')[0];
    itens.style.width = '60%';
}


//Funciòn que agrega un item al carrito
function adicionarItemAoCarrinho(titulo, preco, imagemSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itensCarrinho = document.getElementsByClassName('carrinho-itens')[0];


    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nomesItensCarrinho = itensCarrinho.getElementsByClassName('carrinho-item-titulo');
    for(var i=0;i < nomesItensCarrinho.length;i++){
        if(nomesItensCarrinho[i].innerText==titulo){
            alert("O item já está no carrinho");
            return;
        }
    }


    var itemCarrinhoConteudo = `
        <div class="carrinho-item">
            <img src="${imagemSrc}" width="80px" alt="">
            <div class="carrinho-item-detalhes">
                <span class="carrinho-item-titulo">${titulo}</span>
                <div class="selector-quantidade">
                    <i class="fa-solid fa-minus restar-quantidade"></i>
                    <input type="text" value="1" class="carrinho-item-quantidade" disabled>
                    <i class="fa-solid fa-plus somar-quantidade"></i>
                </div>
                <span class="carrinho-item-preco">${preco}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarrinhoConteudo;
    itensCarrinho.append(item);


    //Agregamos la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrinho);


    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botaoRestarQuantidade = item.getElementsByClassName('restar-quantidade')[0];
    botaoRestarQuantidade.addEventListener('click',restarQuantidade);


    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botaoSomarQuantidade = item.getElementsByClassName('somar-quantidade')[0];
    botaoSomarQuantidade.addEventListener('click',somarQuantidade);


    //Actualizamos total
    atualizarTotalCarrinho();
}
//Aumento en uno la cantidad del elemento seleccionado
function somarQuantidade(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrinho-item-quantidade')[0].value);
    var quantidadeAtual = selector.getElementsByClassName('carrinho-item-quantidade')[0].value;
    quantidadeAtual++;
    selector.getElementsByClassName('carrinho-item-quantidade')[0].value = quantidadeAtual;
    atualizarTotalCarrinho();
}
//Resto en uno la cantidad del elemento seleccionado
function restarQuantidade(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrinho-item-quantidade')[0].value);
    var quantidadeAtual = selector.getElementsByClassName('carrinho-item-quantidade')[0].value;
    quantidadeAtual--;
    if(quantidadeAtual>=1){
        selector.getElementsByClassName('carrinho-item-quantidade')[0].value = quantidadeAtual;
        atualizarTotalCarrinho();
    }
}


//Elimino el item seleccionado del carrito
function eliminarItemCarrinho(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    atualizarTotalCarrinho();


    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrinho();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrinho(){
    var carrinhoItens = document.getElementsByClassName('carrinho-itens')[0];
    if(carrinhoItens.childElementCount==0){
        var carrinho = document.getElementsByClassName('carrinho')[0];
        carrinho.style.marginRight = '-100%';
        carrinho.style.opacity = '0';
        carrinhoVisible = false;
   
        var itens =document.getElementsByClassName('produtos-itens')[0];
        itens.style.width = '100%';
    }
}
//Actualizamos el total de Carrito
function atualizarTotalCarrinho(){
    //seleccionamos el contenedor carrito
    var carrinhoProdutos = document.getElementsByClassName('carrinho')[0];
    var carrinhoItens = carrinhoProdutos.getElementsByClassName('carrinho-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i< carrinhoItens.length;i++){
        var item = carrinhoItens[i];
        var precoElemento = item.getElementsByClassName('carrinho-item-preco')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        var preco = parseFloat(precoElemento.innerText.replace('$','').replace('.',''));
        var quantidadeItem = item.getElementsByClassName('carrinho-item-quantidade')[0];
        console.log(preco);
        var quantidade = quantidadeItem.value;
        total = total + (preco * quantidade);
    }
    total = Math.round(total * 100)/100;


    document.getElementsByClassName('carrinho-preco-total')[0].innerText = 'R$'+total.toLocaleString("pt-BR") + ",00";


}



