// JS dosyası (script.js)

// JSON dosyasını okuyarak verileri alın

let questions = []

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", e => {
const value = e.target.value;
    const searchValue = e.target.value.trim().toLocaleLowerCase("tr-TR");
    const searchWords = searchValue.split(/\s+/);
    const filteredQuestions = questions.filter((question) => {
      const questionTitle = question.baslik.toLocaleLowerCase("tr-TR");

      // Her kelimeyi kontrol ediyoruz
      return searchWords.every((word) => questionTitle.includes(word));
    });
    const accordionContainer = document.getElementById("accordionExample");
    accordionContainer.innerHTML = "";
    filteredQuestions.forEach((question, index) => {
      const { baslik, icerik } = question;
      const accordionItem = createAccordionItem(baslik, icerik, index);
      accordionContainer.innerHTML += accordionItem;
    });
  });
});

async function fetchData() {
  try {
    const response = await fetch('datas.json');
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('JSON yükleme hatası:', error);
    return [];
  }
}

// Accordion bileşeni oluşturma fonksiyonu
function createAccordionItem(baslik, icerik, index) {
  return `
    <div class="accordion-item">
    <h2 class="accordion-header" id="heading-${index}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}" aria-expanded="false" aria-controls="collapse-${index}">
        ${baslik}
      </button>
    </h2>
    <div id="collapse-${index}" class="accordion-collapse collapse" data-bs-parent="#accordionExample" aria-labelledby="heading-${index}">
      <div class="accordion-body">
        ${icerik}
      </div>
    </div>
  </div>
  `;
}

// Sayfada accordion öğelerini oluştur
async function loadAccordionData() {
  const accordionContainer = document.getElementById("accordionExample");
  const items = await fetchData();
  let index = 0;
  questions = items.map((item) => {
    const { baslik, icerik } = item;
    const accordionItem = createAccordionItem(baslik, icerik, index);
    accordionContainer.innerHTML += accordionItem;
    index++;
    return {baslik, icerik}
  });
}

// Sayfa yüklendiğinde accordion verilerini yükle
document.addEventListener("DOMContentLoaded", loadAccordionData);
