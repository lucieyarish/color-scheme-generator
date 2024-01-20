const selectionForm = document.getElementById('selection-form');
const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const formData = new FormData(selectionForm);
  const selectedColor = formData.get('selectedColor');
  const selectedScheme = formData.get('colorScheme');
  const selectedColorCount = formData.get('colorCount');
});
