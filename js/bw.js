let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

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
setInterval(nextSlide, 7000);

function nextSlide() {
  plusSlides(1);
}

var carrinhoVisible = false;

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var botonesEliminarItem = document.getElementsByClassName("btn-eliminar");
  for (var i = 0; i < botonesEliminarItem.length; i++) {
    var button = botonesEliminarItem[i];
    button.addEventListener("click", eliminarItemCarrinho);
  }

  var botonesSomarQuantidade =
    document.getElementsByClassName("somar-quantidade");
  for (var i = 0; i < botonesSomarQuantidade.length; i++) {
    var button = botonesSomarQuantidade[i];
    button.addEventListener("click", somarQuantidade);
  }

  var botaoRestarQuantidade =
    document.getElementsByClassName("restar-quantidade");
  for (var i = 0; i < botaoRestarQuantidade.length; i++) {
    var button = botaoRestarQuantidade[i];
    button.addEventListener("click", restarQuantidade);
  }

  var botonesAdicionarAoCarrinho =
    document.getElementsByClassName("botao-item");
  for (var i = 0; i < botonesAdicionarAoCarrinho.length; i++) {
    var button = botonesAdicionarAoCarrinho[i];
    button.addEventListener("click", adicionarAoCarrinhoClicked);
  }

  document
    .getElementsByClassName("btn-pagar")[0]
    .addEventListener("click", pagarClicked);
}
function pagarClicked() {
  alert("Obrigado pela compra!");
  var carrinhoItens = document.getElementsByClassName("carrinho-itens")[0];
  while (carrinhoItens.hasChildNodes()) {
    carrinhoItens.removeChild(carrinhoItens.firstChild);
  }
  atualizarTotalCarrinho();
  ocultarCarrinho();
}
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

function hacerVisibleCarrinho() {
  carrinhoVisible = true;
  var carrinho = document.getElementsByClassName("carrinho")[0];
  carrinho.style.marginRight = "0";
  carrinho.style.opacity = "1";

  var itens = document.getElementsByClassName("produtos-itens")[0];
  itens.style.width = "60%";
}

function adicionarItemAoCarrinho(titulo, preco, imagemSrc) {
  var item = document.createElement("div");
  item.classList.add = "item";
  var itensCarrinho = document.getElementsByClassName("carrinho-itens")[0];

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

  item
    .getElementsByClassName("btn-eliminar")[0]
    .addEventListener("click", eliminarItemCarrinho);

  var botaoRestarQuantidade =
    item.getElementsByClassName("restar-quantidade")[0];
  botaoRestarQuantidade.addEventListener("click", restarQuantidade);

  var botaoSomarQuantidade = item.getElementsByClassName("somar-quantidade")[0];
  botaoSomarQuantidade.addEventListener("click", somarQuantidade);

  atualizarTotalCarrinho();
}
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

function eliminarItemCarrinho(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  atualizarTotalCarrinho();

  ocultarCarrinho();
}
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

function atualizarTotalCarrinho() {
  var carrinhoProdutos = document.getElementsByClassName("carrinho")[0];
  var carrinhoItens = carrinhoProdutos.getElementsByClassName("carrinho-item");
  var total = 0;
  for (var i = 0; i < carrinhoItens.length; i++) {
    var item = carrinhoItens[i];
    var precoElemento = item.getElementsByClassName("carrinho-item-preco")[0];
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
