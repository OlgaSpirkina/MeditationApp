// Create modal used for displaying videos and checkboxes in small screen size
const createElement = (elem, attrs) => {
  const theElem = document.createElement(`${elem}`);
  for(var key in attrs) {
    theElem.setAttribute(key, attrs[key]);
  }
}
const createModal = (id, arialabelled, headingModalLabel, footerModalDescription) => {
  const mainDiv = createElement('div', {
    "class": "modal fade",
    "id": id,
    "tabindex": "-1",
    "aria-labelledby": arialabelled,
    "aria-hidden": "true"
  });
  const modalDialog = createElement('div', {"class": "modal-dialog modal-dialog-centered"});
  const modalContent = createElement('div', {"class": "modal-content"});
  const modalHeader = createElement('div', {"class": "modal-header"});
  const heading5 = createElement('h5', {"class": "modal-title", "id": headingModalLabel});
  //heading5.createTextNode("Modal title");
  const buttonClose = createElement('button', {
    "type": "button",
    "class": "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  });
  modalHeader.appendChild(heading5);
  modalHeader.appendChild(buttonClose);
  const modalBody = createElement('div', {"class": "modal-body"});
  const modalFooter = createElement('div', {"class": "modal-footer"});
  const paragraphInFooter = createElement('p', {"id": paragraphInFooter});
  modalFooter.appendChild(paragraphInFooter);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modalDialog.appendChild(modalContent);
  mainDiv.appendChild(modalDialog);
}

createModal("youtubeModal", "youtubeModalLabel", "youtubeModalLabel", "youtubeModalDescription");
