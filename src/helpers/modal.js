import { ICONS } from "../constants/constants";

export async function modalConfirmation(t, status) {
  return new Promise((resolve) => {
    const modalBackground = document.createElement("div");
    const modal = document.createElement("div");
    const textContainer = document.createElement("div");
    const text = document.createElement("span");
    const buttonContainer = document.createElement("div");
    const confirmation = document.createElement("button");
    const cancel = document.createElement("button");

    document.body.append(modalBackground, modal);
    modal.innerHTML = ICONS[status].html;
    modal.append(textContainer, buttonContainer);
    textContainer.append(text);
    buttonContainer.append(confirmation, cancel);

    modalBackground.classList.add("modal-background");
    modal.classList.add("modal", `modal-${status}`);
    text.classList.add("my-4", "text-lg", "font-normal", "text-gray-700", "dark:text-gray-400");
    confirmation.classList.add("bg-red-600", "hover:bg-red-500");
    cancel.classList.add("bg-gray-500", "hover:bg-gray-400");

    modal.setAttribute("role", "alert");

    text.textContent = t;
    confirmation.textContent = "Confirmar";
    cancel.textContent = "Cancelar";

    confirmation.addEventListener('click', () => {
      modalBackground?.remove();
      modal?.remove();
      return resolve(true);
    });

    cancel.addEventListener('click', () => {
      modalBackground?.remove();
      modal?.remove();
      return resolve(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" || event.key === "Esc") {
        modalBackground?.remove();
        modal?.remove();
        return resolve(false);
      }
    });
  });
}