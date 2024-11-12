document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("datas.json");
  const data = await response.json();
  const questions = data.items;

  function createAccordionHeader(baslik, index) {
    return `
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}" aria-expanded="false" aria-controls="collapse-${index}">
            ${baslik}
          </button>
        </h2>
      `;
  }

  function createAccordionBody(icerik, index) {
    return `
        <div id="collapse-${index}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            ${icerik}
          </div>
        </div>
      `;
  }

  function createNestedAccordionBody(nestedItems) {
    let html = '<div class="accordion">';
    nestedItems.forEach((item, index) => {
      const { baslik, icerik } = item;
      const accordionHeaderItem = createAccordionHeader(baslik, `nested-${index}`);
      const accordionBodyItem = createAccordionBody(icerik, `nested-${index}`);
      html += accordionHeaderItem;
      html += accordionBodyItem;
    });
    html += '</div>';
    return html;
  }

  const searchInput = document.getElementById("search");
  const accordionHeader = document.querySelector(".accordion-header-container");
  const accordionContainer = document.querySelector(".accordion-content-container");
  searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.trim().toLocaleLowerCase("tr-TR");
    const searchWords = searchValue.split(/\s+/);
    const filteredQuestions = questions.filter((question) => {
      const questionTitle = question.baslik.toLocaleLowerCase("tr-TR");

      // Her kelimeyi kontrol ediyoruz
      return searchWords.every((word) => questionTitle.includes(word));
    });

    accordionHeader.innerHTML = "";
    accordionContainer.innerHTML = "";

    filteredQuestions.forEach((question, index) => {
      const { baslik, icerik } = question;
      const accordionHeaderItem = createAccordionHeader(baslik, index);
      const accordionBodyItem = createAccordionBody(icerik, index);

      // Eğer iç içe accordion yapısı varsa alt başlıkların içeriği burada oluşturulacak
      if (Array.isArray(icerik)) {
        const nestedAccordionBodyItem = createNestedAccordionBody(icerik);
        accordionBodyItem.querySelector('.accordion-body').innerHTML = nestedAccordionBodyItem;
      }

      accordionHeader.innerHTML += accordionHeaderItem;
      accordionContainer.innerHTML += accordionBodyItem;
    });
  });

  // Sayfa açıldığında tüm verileri yükle
  questions.forEach((question, index) => {
    const { baslik, icerik, altbasliklar } = question;
    const accordionHeaderItem = createAccordionHeader(baslik, index);
    const accordionBodyItem = createAccordionBody(icerik, index);

    // Eğer alt başlık (nested accordion) varsa içeriği oluştur
    if (altbasliklar && Array.isArray(altbasliklar)) {
      const nestedAccordionBodyItem = createNestedAccordionBody(altbasliklar);
      accordionBodyItem.querySelector('.accordion-body').innerHTML = nestedAccordionBodyItem;
    }

    accordionHeader.innerHTML += accordionHeaderItem;
    accordionContainer.innerHTML += accordionBodyItem;
  });
});
