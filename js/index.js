const selectionForm = document.getElementById('selection-form');
const submitBtn = document.getElementById('submit-btn');
const colorsContainer = document.getElementById('colors-container');
const colorsList = document.getElementById('colors');

const renderColors = (colors) => {
  const html = colors
    .map((color) => {
      return `
          <li class="color-container">
            <div data-id="${color.hex.value}" class="color" style="background-color: ${color.hex.value};"></div>
            <p class="color-hex">${color.hex.value}</p>
          </li>
        `;
    })
    .join('');

  colorsList.innerHTML += html;
};

const url = new URL('https://www.thecolorapi.com/scheme');
url.searchParams.set('hex', 'C3B1E1');
url.searchParams.set('mode', 'monochrome');
url.searchParams.set('count', '5');

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.colors);
    renderColors(data.colors);
  });

submitBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const formData = new FormData(selectionForm);
  const selectedColor = formData.get('selectedColor');
  const selectedScheme = formData.get('colorScheme');
  const selectedColorCount = formData.get('colorCount');
});
