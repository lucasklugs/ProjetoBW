let slideIndex = 1; 
showSlides(slideIndex); //declaração de variavel 

function plusSlides(n) {
  showSlides((slideIndex += n)); // declaração função de passar slide
}

// Funcionalidade dos slides
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}
setInterval(nextSlide, 7000); //segundos que duram cada slide

function nextSlide() {
  plusSlides(1);// Passar slide
}

//Variável que mantém o carrinho visível.
var carrinhoVisible = false;

//Esperamos que todos os elementos da página carreguem para executar o script.
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

//Funcionalidade ao botão remover do carrinho.
function ready() {
  var botonesEliminarItem = document.getElementsByClassName("btn-eliminar");
  for (var i = 0; i < botonesEliminarItem.length; i++) {
    var button = botonesEliminarItem[i];
    button.addEventListener("click", eliminarItemCarrinho);
  }

//Funcionalidade ao botão adicionar quantidade.
var botaoSomarQuantidade =
  document.getElementsByClassName("somar-quantidade");
for (var i = 0; i < botaoSomarQuantidade.length; i++) {
  var button = botaoSomarQuantidade[i];
  button.addEventListener("click", somarQuantidade);
}

//Funcionalidade ao botão diminuir quantidade.
var botaoRestarQuantidade =
  document.getElementsByClassName("restar-quantidade");
for (var i = 0; i < botaoRestarQuantidade.length; i++) {
  var button = botaoRestarQuantidade[i];
  button.addEventListener("click", restarQuantidade);
}

//Funcionalidade do botão adicionar ao carrinho.
var botonesAdicionarAoCarrinho =
  document.getElementsByClassName("botao-item");
for (var i = 0; i < botonesAdicionarAoCarrinho.length; i++) {
  var button = botonesAdicionarAoCarrinho[i];
  button.addEventListener("click", adicionarAoCarrinhoClicked);
}

//Funcionalidade ao botão comprar.
  document.getElementsByClassName('btn-confirmar')[0].addEventListener('click',confirmarClicked);
}

//Após clicar em pagar, é removido todos os itens do carrinho e o carrinho é ocultado.
function confirmarClicked(){
  alert("Obrigado pela compra!");
  var carrinhoItens = document.getElementsByClassName('carrinho-itens')[0];
  while (carrinhoItens.hasChildNodes()){
    carrinhoItens.removeChild(carrinhoItens.firstChild);
  }
  atualizarTotalCarrinho();
  ocultarCarrinho();
}

//Função que controla o botão para adicionar ao carrinho.
function adicionarAoCarrinhoClicked(event) {
  var button = event.target;
  var item = button.parentElement;
  var titulo = item.getElementsByClassName("titulo-item")[0].innerText;
  var preco = item.getElementsByClassName("preco-item")[0].innerText;
  var imagemSrc = item.getElementsByClassName("img-item")[0].src;
  console.log(imagemSrc);

  adicionarItemAoCarrinho(titulo, preco, imagemSrc);

  hacerVisibleCarrinho();
}

//Função que torna o carrinho visível.
function hacerVisibleCarrinho() {
  carrinhoVisible = true;
  var carrinho = document.getElementsByClassName("carrinho")[0];
  carrinho.style.marginRight = "0";
  carrinho.style.opacity = "1";

  var itens = document.getElementsByClassName("produtos-itens")[0];
  itens.style.width = "60%";
}

//Função que adiciona um item ao carrinho.
function adicionarItemAoCarrinho(titulo, preco, imagemSrc) {
  var item = document.createElement("div");
  item.classList.add = "item";
  var itensCarrinho = document.getElementsByClassName("carrinho-itens")[0];

//É verificado se o item que está tentando inserir não está no carrinho.
var nomesItensCarrinho = itensCarrinho.getElementsByClassName(
  "carrinho-item-titulo"
);
for (var i = 0; i < nomesItensCarrinho.length; i++) {
  if (nomesItensCarrinho[i].innerText == titulo) {
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
    `;

  item.innerHTML = itemCarrinhoConteudo;
  itensCarrinho.append(item);

//Funcionalidade de excluir um item.
item.getElementsByClassName("btn-eliminar")[0].addEventListener("click", eliminarItemCarrinho);

//Funcionalidade de diminuir quantidade do novo item.
  var botaoRestarQuantidade = item.getElementsByClassName("restar-quantidade")[0];
  botaoRestarQuantidade.addEventListener("click", restarQuantidade);

//Funcionalidade de adicionar quantidade do novo item.
  var botaoSomarQuantidade = item.getElementsByClassName("somar-quantidade")[0];
  botaoSomarQuantidade.addEventListener("click", somarQuantidade);

//Atualizar o total de itens no carrinho.
  atualizarTotalCarrinho();
}

//Aumenta o número do elemento selecionado em 1.
function somarQuantidade(event) {
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  console.log(
    selector.getElementsByClassName("carrinho-item-quantidade")[0].value
  );
  var quantidadeAtual = selector.getElementsByClassName(
    "carrinho-item-quantidade"
  )[0].value;
  quantidadeAtual++;
  selector.getElementsByClassName("carrinho-item-quantidade")[0].value =
    quantidadeAtual;
  atualizarTotalCarrinho();
}

//Diminui o número do elemento selecionado em 1.
function restarQuantidade(event) {
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  console.log(
    selector.getElementsByClassName("carrinho-item-quantidade")[0].value
  );
  var quantidadeAtual = selector.getElementsByClassName(
    "carrinho-item-quantidade"
  )[0].value;
  quantidadeAtual--;
  if (quantidadeAtual >= 1) {
    selector.getElementsByClassName("carrinho-item-quantidade")[0].value =
      quantidadeAtual;
    atualizarTotalCarrinho();
  }
}

//Remove o item selecionado do carrinho.
function eliminarItemCarrinho(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  atualizarTotalCarrinho();

//Verifica se tem itens no carrinho, caso não haja o carrinho é ocultado.
  ocultarCarrinho();
}

//Função que verifica se tem itens no carrinho, caso não houver o carrinho é ocultado.
function ocultarCarrinho() {
  var carrinhoItens = document.getElementsByClassName("carrinho-itens")[0];
  if (carrinhoItens.childElementCount == 0) {
    var carrinho = document.getElementsByClassName("carrinho")[0];
    carrinho.style.marginRight = "-100%";
    carrinho.style.opacity = "0";
    carrinhoVisible = false;

    var itens = document.getElementsByClassName("produtos-itens")[0];
    itens.style.width = "100%";
  }
}

//Função que atualiza o total do carrinho.
function atualizarTotalCarrinho() {
//Seleciona o contêiner do carrinho.
  var carrinhoProdutos = document.getElementsByClassName("carrinho")[0];
  var carrinhoItens = carrinhoProdutos.getElementsByClassName("carrinho-item");
  var total = 0;
//Verifica cada item no carrinho para atualizar o total.
  for (var i = 0; i < carrinhoItens.length; i++) {
    var item = carrinhoItens[i];
    var precoElemento = item.getElementsByClassName("carrinho-item-preco")[0];
//Função que verifica o preço da compra.
    var preco = parseFloat(
      precoElemento.innerText.replace("R$", "")
    );
    var quantidadeItem = item.getElementsByClassName(
      "carrinho-item-quantidade"
    )[0];
    console.log(preco);
    var quantidade = quantidadeItem.value;
    total = total + preco * quantidade;
  }
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("carrinho-preco-total")[0].innerText =
    "R$" + total.toLocaleString("pt-BR");
}

//Ao clicar em pagar, é aberto a tela de pagamento.
document.getElementById('btn-pagar').addEventListener('click', function () {
document.getElementById('payment-popup').style.display = 'block';
});

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();

//Fechar o popup após o pagamento ser processado.
  document.getElementById('payment-popup').style.display = 'none';
});

//Ao clicar em instituições, é aberto a tela de instituições.
document.getElementById('btn-instituicao').addEventListener('click', function () {
  document.getElementById('instituicao-popup').style.display = 'block';
});

//Ao clicar em confirmar, é fechada a tela de instituições e aberta a tela de pagamento.
document.getElementById('btn-confirmar2').addEventListener('click', function () {
  document.getElementById('instituicao-popup').style.display = 'none';
  document.getElementById('payment-popup').style.display = 'block';
});

//Ao clicar no botão do pix, é aberto a tela de pagamento do pix.
document.getElementById('btn-pix').addEventListener('click', function () {
  document.getElementById('pix-popup').style.display = 'block';
});

//Ao clicar no botão continuar, é fechado a tela e aberto a do pagamento.
document.getElementById('btn-continuar').addEventListener('click', function () {
  document.getElementById('pix-popup').style.display = 'none';
});

//Ao clicar no botão do boleto, é aberto a tela de pagamento do boleto.
document.getElementById('btn-boleto').addEventListener('click', function () {
  document.getElementById('boleto-popup').style.display = 'block';
});

//Ao clicar no botão de continuar, é fechado a tela e aberto a do pagamento.
document.getElementById('btn-continuar2').addEventListener('click', function () {
  document.getElementById('boleto-popup').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao').addEventListener('click', function () {
  document.getElementById('descricao-popup').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar').addEventListener('click', function () {
  document.getElementById('descricao-popup').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao2').addEventListener('click', function () {
  document.getElementById('descricao-popup2').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar2').addEventListener('click', function () {
  document.getElementById('descricao-popup2').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao3').addEventListener('click', function () {
  document.getElementById('descricao-popup3').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar3').addEventListener('click', function () {
  document.getElementById('descricao-popup3').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao4').addEventListener('click', function () {
  document.getElementById('descricao-popup4').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar4').addEventListener('click', function () {
  document.getElementById('descricao-popup4').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao5').addEventListener('click', function () {
  document.getElementById('descricao-popup5').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar5').addEventListener('click', function () {
  document.getElementById('descricao-popup5').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao6').addEventListener('click', function () {
  document.getElementById('descricao-popup6').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar6').addEventListener('click', function () {
  document.getElementById('descricao-popup6').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao7').addEventListener('click', function () {
  document.getElementById('descricao-popup7').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar7').addEventListener('click', function () {
  document.getElementById('descricao-popup7').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao8').addEventListener('click', function () {
  document.getElementById('descricao-popup8').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar8').addEventListener('click', function () {
  document.getElementById('descricao-popup8').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao9').addEventListener('click', function () {
  document.getElementById('descricao-popup9').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar9').addEventListener('click', function () {
  document.getElementById('descricao-popup9').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao10').addEventListener('click', function () {
  document.getElementById('descricao-popup10').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar10').addEventListener('click', function () {
  document.getElementById('descricao-popup10').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao11').addEventListener('click', function () {
  document.getElementById('descricao-popup11').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar11').addEventListener('click', function () {
  document.getElementById('descricao-popup11').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao12').addEventListener('click', function () {
  document.getElementById('descricao-popup12').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar12').addEventListener('click', function () {
  document.getElementById('descricao-popup12').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao13').addEventListener('click', function () {
  document.getElementById('descricao-popup13').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar13').addEventListener('click', function () {
  document.getElementById('descricao-popup13').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao14').addEventListener('click', function () {
  document.getElementById('descricao-popup14').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar14').addEventListener('click', function () {
  document.getElementById('descricao-popup14').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao15').addEventListener('click', function () {
  document.getElementById('descricao-popup15').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar15').addEventListener('click', function () {
  document.getElementById('descricao-popup15').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao16').addEventListener('click', function () {
  document.getElementById('descricao-popup16').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar16').addEventListener('click', function () {
  document.getElementById('descricao-popup16').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao17').addEventListener('click', function () {
  document.getElementById('descricao-popup17').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar17').addEventListener('click', function () {
  document.getElementById('descricao-popup17').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao18').addEventListener('click', function () {
  document.getElementById('descricao-popup18').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar18').addEventListener('click', function () {
  document.getElementById('descricao-popup18').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao19').addEventListener('click', function () {
  document.getElementById('descricao-popup19').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar19').addEventListener('click', function () {
  document.getElementById('descricao-popup19').style.display = 'none';
});

//Ao clicar no botão de descrição, é aberto a tela da descrição do produto.
document.getElementById('btn-descricao20').addEventListener('click', function () {
  document.getElementById('descricao-popup20').style.display = 'block';
});

//Ao clicar no X, é fechado a descrição do produto.
document.getElementById('btn-fechar20').addEventListener('click', function () {
  document.getElementById('descricao-popup20').style.display = 'none';
});

var dateControl = document.querySelector('input[type="date"]');
dateControl.value = '01-06-2017';


