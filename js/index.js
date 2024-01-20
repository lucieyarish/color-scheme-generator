const selectionForm = document.getElementById('selection-form');
const submitBtn = document.getElementById('submit-btn');
const colorsContainer = document.getElementById('colors-container');
const colorsList = document.getElementById('colors');
const infoDialog = document.getElementById('info-dialog');
const dialogCloseBtn = document.getElementById('dialog-close-btn');

const setParams = (url, color, scheme, colorCount) => {
  url.searchParams.set('hex', color);
  url.searchParams.set('mode', scheme);
  url.searchParams.set('count', colorCount);
};

const getColors = (selectedColor, selectedScheme, selectedColorCount, e) => {
  const url = new URL('https://www.thecolorapi.com/scheme');

  if (e) {
    setParams(url, selectedColor, selectedScheme, selectedColorCount);
  } else {
    setParams(url, 'C3B1E1', 'monochrome', '5');
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      renderColors(data.colors);
    });
};

getColors();

const renderColors = (colors) => {
  colorsList.innerHTML = '';

  const html = colors
    .map((color) => {
      return `
          <li class="color-container">
            <div data-id="${color.hex.value}" class="color" style="background-color: ${color.hex.value};"></div>
            <p data-id="${color.hex.value}" class="color-hex">${color.hex.value}</p>
          </li>
        `;
    })
    .join('');

  colorsList.innerHTML += html;
};

colorsContainer.addEventListener('click', function (e) {
  navigator.clipboard.writeText(e.target.dataset.id);
  document.getElementById(
    'info-msg'
  ).textContent = `${e.target.dataset.id} was copied to clipboard!`;
  infoDialog.inert = true;
  infoDialog.showModal();
  infoDialog.inert = false;
  setTimeout(() => {
    infoDialog.close();
  }, 1500);
});

submitBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const formData = new FormData(selectionForm);
  const selectedColor = formData.get('selectedColor');
  const selectedScheme = formData.get('colorScheme');
  const selectedColorCount = formData.get('colorCount');

  getColors(selectedColor, selectedScheme, selectedColorCount, e);
});
