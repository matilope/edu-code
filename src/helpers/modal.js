const icons = {
  success: {
    html: `<svg class="mx-auto text-green-400 w-12 h-12 dark:text-green-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </svg>`
  },
  warning: {
    html: `<svg class="mx-auto text-yellow-400 w-12 h-12 dark:text-yellow-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </svg>`
  },
  error: {
    html: `<svg class="mx-auto text-red-400 w-12 h-12 dark:red-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
  </svg>`
  }
};

export async function modalConfirmation(t, status, alert) {
  return new Promise((resolve) => {
    const modalBackground = document.createElement("div");
    const modal = document.createElement("div");
    const textContainer = document.createElement("div");
    const text = document.createElement("span");
    const buttonContainer = document.createElement("div");
    const confirmation = document.createElement("button");
    const cancel = document.createElement("button");

    document.body.append(modalBackground, modal);
    modal.innerHTML = icons[status].html;
    modal.append(textContainer, buttonContainer);
    textContainer.append(text);
    buttonContainer.append(confirmation, cancel);

    modalBackground.classList.add("modal-background");
    modal.classList.add("modal");
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

export function modalAlert(t, status) {
    const modalBackground = document.createElement("div");
    const modal = document.createElement("div");
    const textContainer = document.createElement("div");
    const text = document.createElement("span");

    document.body.append(modalBackground, modal);
    modal.innerHTML = icons[status].html;
    modal.append(textContainer);
    textContainer.append(text);

    modalBackground.classList.add("modal-background");
    modal.classList.add("modal");
    text.classList.add("my-4", "text-lg", "font-normal", "text-gray-700", "dark:text-gray-400");

    modal.setAttribute("role", "alert");

    text.textContent = t;

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" || event.key === "Esc") {
        modalBackground?.remove();
        modal?.remove();
        return;
      }
    });

    setTimeout(()=>{
      modalBackground?.remove();
      modal?.remove();
    }, 2000);
}