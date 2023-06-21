
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
    .getElementById("btn-pagar")[0]
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

document.getElementById('btn-pagar').addEventListener('click', function () {
  document.getElementById('payment-popup').style.display = 'block';
});

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Aqui você pode adicionar a lógica para processar o pagamento

  // Fechar o popup após o pagamento ser processado
  document.getElementById('payment-popup').style.display = 'none';
});

var popupOlhar = document.querySelector('.popup-olhar')
var popupOlhar2 = document.querySelector('.popup-olhar2')
var popupOlhar3 = document.querySelector('.popup-olhar3')
var popupOlhar4 = document.querySelector('.popup-olhar4')
var popupOlhar5 = document.querySelector('.popup-olhar5')
var popupOlhar6 = document.querySelector('.popup-olhar6')
var popupOlhar7 = document.querySelector('.popup-olhar7')
var popupOlhar8 = document.querySelector('.popup-olhar8')
var popupOlhar9 = document.querySelector('.popup-olhar9')
var popupOlhar10 = document.querySelector('.popup-olhar10')
var popupOlhar11 = document.querySelector('.popup-olhar11')
var popupOlhar12 = document.querySelector('.popup-olhar12')
var popupOlhar13 = document.querySelector('.popup-olhar13')
var popupOlhar14 = document.querySelector('.popup-olhar14')
var popupWrapper = document.querySelector('.popup-wrapper')
var popupWrapper2 = document.querySelector('.popup-wrapper2')
var popupWrapper3 = document.querySelector('.popup-wrapper3')
var popupWrapper4 = document.querySelector('.popup-wrapper4')
var popupWrapper5 = document.querySelector('.popup-wrapper5')
var popupWrapper6 = document.querySelector('.popup-wrapper6')
var popupWrapper7 = document.querySelector('.popup-wrapper7')
var popupWrapper8 = document.querySelector('.popup-wrapper8')
var popupWrapper9 = document.querySelector('.popup-wrapper9')
var popupWrapper10 = document.querySelector('.popup-wrapper10')
var popupWrapper11 = document.querySelector('.popup-wrapper11')
var popupWrapper12 = document.querySelector('.popup-wrapper12')
var popupWrapper13 = document.querySelector('.popup-wrapper13')
var popupWrapper14 = document.querySelector('.popup-wrapper14')

popupOlhar.addEventListener('click', function () {
  popupWrapper.style.display = 'block'
})

popupOlhar2.addEventListener('click', function () {
  popupWrapper2.style.display = 'block'
})

popupOlhar3.addEventListener('click', function () {
  popupWrapper3.style.display = 'block'
})

popupOlhar4.addEventListener('click', function () {
  popupWrapper4.style.display = 'block'
})

popupOlhar5.addEventListener('click', function () {
  popupWrapper5.style.display = 'block'
})

popupOlhar6.addEventListener('click', function () {
  popupWrapper6.style.display = 'block'
})

popupOlhar7.addEventListener('click', function () {
  popupWrapper7.style.display = 'block'
})

popupOlhar8.addEventListener('click', function () {
  popupWrapper8.style.display = 'block'
})

popupOlhar9.addEventListener('click', function () {
  popupWrapper9.style.display = 'block'
})

popupOlhar10.addEventListener('click', function () {
  popupWrapper10.style.display = 'block'
})

popupOlhar11.addEventListener('click', function () {
  popupWrapper11.style.display = 'block'
})

popupOlhar12.addEventListener('click', function () {
  popupWrapper12.style.display = 'block'
})

popupOlhar13.addEventListener('click', function () {
  popupWrapper13.style.display = 'block'
})

popupOlhar14.addEventListener('click', function () {
  popupWrapper14.style.display = 'block'
})

popupWrapper.addEventListener('click', event => {
  var classNameOfClickedElement = event.target.classList[0];
  var classNames = ['popup-close', 'popup-link', 'popup-wrapper']
  var closePopup = classNames.some(className => className === classNameOfClickedElement)

  if (closePopup) {
    popupWrapper.style.display = 'none'
  }
})

popupWrapper2.addEventListener('click', event => {
  var classNameOfClickedElement2 = event.target.classList[0];
  var classNames2 = ['popup-close2', 'popup-link2', 'popup-wrapper2']
  var closePopup2 = classNames2.some(className2 => className2 === classNameOfClickedElement2)

  if (closePopup2) {
    popupWrapper2.style.display = 'none'
  }
})

popupWrapper3.addEventListener('click', event => {
  var classNameOfClickedElement3 = event.target.classList[0];
  var classNames3 = ['popup-close3', 'popup-link3', 'popup-wrapper3']
  var closePopup3 = classNames3.some(className3 => className3 === classNameOfClickedElement3)

  if (closePopup3) {
    popupWrapper3.style.display = 'none'
  }
})

popupWrapper4.addEventListener('click', event => {
  var classNameOfClickedElement4 = event.target.classList[0];
  var classNames4 = ['popup-close4', 'popup-link4', 'popup-wrapper4']
  var closePopup4 = classNames4.some(className4 => className4 === classNameOfClickedElement4)

  if (closePopup4) {
    popupWrapper4.style.display = 'none'
  }
})

popupWrapper5.addEventListener('click', event => {
  var classNameOfClickedElement5 = event.target.classList[0];
  var classNames5 = ['popup-close5', 'popup-link5', 'popup-wrapper5']
  var closePopup5 = classNames5.some(className5 => className5 === classNameOfClickedElement5)

  if (closePopup5) {
    popupWrapper5.style.display = 'none'
  }
})

popupWrapper6.addEventListener('click', event => {
  var classNameOfClickedElement6 = event.target.classList[0];
  var classNames6 = ['popup-close6', 'popup-link6', 'popup-wrapper6']
  var closePopup6 = classNames6.some(className6 => className6 === classNameOfClickedElement6)

  if (closePopup6) {
    popupWrapper6.style.display = 'none'
  }
})

popupWrapper7.addEventListener('click', event => {
  var classNameOfClickedElement7 = event.target.classList[0];
  var classNames7 = ['popup-close7', 'popup-link7', 'popup-wrapper7']
  var closePopup7 = classNames7.some(className7 => className7 === classNameOfClickedElement7)

  if (closePopup7) {
    popupWrapper7.style.display = 'none'
  }
})

popupWrapper8.addEventListener('click', event => {
  var classNameOfClickedElement8 = event.target.classList[0];
  var classNames8 = ['popup-close8', 'popup-link8', 'popup-wrapper8']
  var closePopup8 = classNames8.some(className8 => className8 === classNameOfClickedElement8)

  if (closePopup8) {
    popupWrapper8.style.display = 'none'
  }
})

popupWrapper9.addEventListener('click', event => {
  var classNameOfClickedElement9 = event.target.classList[0];
  var classNames9 = ['popup-close9', 'popup-link9', 'popup-wrapper9']
  var closePopup9 = classNames9.some(className9 => className9 === classNameOfClickedElement9)

  if (closePopup9) {
    popupWrapper9.style.display = 'none'
  }
})

popupWrapper10.addEventListener('click', event => {
  var classNameOfClickedElement10 = event.target.classList[0];
  var classNames10 = ['popup-close10', 'popup-link10', 'popup-wrapper10']
  var closePopup10 = classNames10.some(className10 => className10 === classNameOfClickedElement10)

  if (closePopup10) {
    popupWrapper10.style.display = 'none'
  }
})

popupWrapper11.addEventListener('click', event => {
  var classNameOfClickedElement11= event.target.classList[0];
  var classNames11 = ['popup-close11', 'popup-link11', 'popup-wrapper11']
  var closePopup11 = classNames11.some(className11 => className11 === classNameOfClickedElement11)

  if (closePopup11) {
    popupWrapper11.style.display = 'none'
  }
})

popupWrapper12.addEventListener('click', event => {
  var classNameOfClickedElement12 = event.target.classList[0];
  var classNames12 = ['popup-close12', 'popup-link12', 'popup-wrapper12']
  var closePopup12 = classNames12.some(className12 => className12 === classNameOfClickedElement12)

  if (closePopup12) {
    popupWrapper12.style.display = 'none'
  }
})

popupWrapper13.addEventListener('click', event => {
  var classNameOfClickedElement13 = event.target.classList[0];
  var classNames13 = ['popup-close13', 'popup-link13', 'popup-wrapper13']
  var closePopup13 = classNames13.some(className13 => className13 === classNameOfClickedElement13)

  if (closePopup13) {
    popupWrapper13.style.display = 'none'
  }
})

popupWrapper14.addEventListener('click', event => {
  var classNameOfClickedElement14 = event.target.classList[0];
  var classNames14 = ['popup-close14', 'popup-link14', 'popup-wrapper14']
  var closePopup14 = classNames14.some(className14 => className14 === classNameOfClickedElement14)

  if (closePopup14) {
    popupWrapper14.style.display = 'none'
  }
})

var dateControl = document.querySelector('input[type="date"]');
dateControl.value = '01-06-2017';

