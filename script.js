const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const starPauseBt = document.querySelector("#start-pause");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const iconComcarOuPausar = document.querySelector(
  ".app__card-primary-butto-icon"
);
const tempoNaTela = document.querySelector("#timer");

const musicaFocoInput = document.getElementById("alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
musica.loop = true;

//temporizador
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

//adiciona evento para mudar o background para roxo
focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  zerar();
  alterarContexto("foco");
  focoBt.classList.add("active");
});

//adiciona evento para mudar o background para Verde
curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  zerar();
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

//adiciona evento para mudar o background para Azul
longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  zerar();
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempoNaTela();
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,<br />
      <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;

    case "descanso-curto":
      titulo.innerHTML = `Que tal dar uma respirada?<br />
        <strong class="app__title-strong">Faça uma pausa curta!</strong>`;

      break;

    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície.<br />
        <strong class="app__title-strong">Faça uma pausa longa.</strong>`;

      break;

    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    const focoAtivo = html.getAttribute("data-contexto") == "foco";
    if (focoAtivo) {
      const evento = new CustomEvent("FocoFinalizado");
      document.dispatchEvent(evento);
    }
    zerar();
    mostrarTempoNaTela();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempoNaTela();
};

starPauseBt.addEventListener("click", inicarOuPausar);

function inicarOuPausar() {
  if (intervaloId) {
    zerar();
    return;
  }
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBt.textContent = "Pausar";
  iconComcarOuPausar.setAttribute("src", "imagens/pause.png");
}

function zerar() {
  clearInterval(intervaloId);
  iniciarOuPausarBt.textContent = "Começar";
  iconComcarOuPausar.setAttribute("src", "imagens/play_arrow.png");
  intervaloId = null;
}

function mostrarTempoNaTela() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `
    ${tempoFormatado}
  
  
  `;
}

mostrarTempoNaTela();
