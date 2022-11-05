var quill = new Quill("#editor", {
  theme: "snow",
});

const subBtn = document.getElementById("subBtn");
const hideInput = document.getElementById("hide");
const form = document.getElementById("main-form");
subBtn.addEventListener("click", () => {
  hideInput.value = quill.root.innerHTML;
  form.submit();
});
