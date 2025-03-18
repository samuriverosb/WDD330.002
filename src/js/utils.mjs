// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export const getParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

export const renderListWithTemplate = (
  templateFunction,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) => {
  if (clear) {
    parentElement.innerHTML = "";
  }
  list.forEach((element) => {
    parentElement.innerHTML += templateFunction(element);
  });
};

export const renderWithTemplate = (
  template,
  parentElement,
  data,
  callback
) => {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
};

export const loadTemplate = async (path) => {
  try {
    const response = await fetch(path);
    return await response.text();
  } catch (error) {
    console.error(error);
    return;
  }
};

export const loadHeaderFooter = async () => {
  const header = await loadTemplate("../partials/header.html");
  const footer = await loadTemplate("../partials/footer.html");
  renderWithTemplate(header, document.querySelector("#main-header"));
  renderWithTemplate(footer, document.querySelector("#main-footer"));
  document.getElementById("totalItemsInCart").innerText = getLocalStorage("totalItemsInCart") == undefined
    ?
    parseInt(getLocalStorage("totalItemsInCart"))
    :
    (Array.isArray(getLocalStorage("so-cart"))
      ? getLocalStorage("so-cart")
      : []).length;
}