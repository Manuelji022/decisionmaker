import "./style.css";
import { i18n } from "./i18n/i18n";

let optionCount = 2;
const maxOptions = 4;
let focusedOptionIndex: number | null = null;

function applyTranslations() {
  const titleEl = document.getElementById("title");
  const subtitleEl = document.getElementById("subtitle");
  const option1El = document.getElementById("option1") as HTMLInputElement;
  const option2El = document.getElementById("option2") as HTMLInputElement;
  const option3El = document.getElementById("option3") as HTMLInputElement;
  const option4El = document.getElementById("option4") as HTMLInputElement;
  const submitEl = document.getElementById("submit") as HTMLButtonElement;
  const addOptionEl = document.getElementById(
    "add-option"
  ) as HTMLButtonElement;
  const deleteOptionEl = document.getElementById(
    "delete-option"
  ) as HTMLButtonElement;

  if (titleEl) titleEl.textContent = i18n.t("title");
  if (subtitleEl) subtitleEl.textContent = i18n.t("subtitle");
  if (option1El) option1El.placeholder = i18n.t("option1Placeholder");
  if (option2El) option2El.placeholder = i18n.t("option2Placeholder");
  if (option3El) option3El.placeholder = i18n.t("option3Placeholder");
  if (option4El) option4El.placeholder = i18n.t("option4Placeholder");
  if (submitEl) submitEl.textContent = i18n.t("submit");
  if (addOptionEl) addOptionEl.textContent = i18n.t("addOption");
  if (deleteOptionEl) deleteOptionEl.textContent = i18n.t("deleteOption");

  document.documentElement.lang = i18n.getLanguage();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyTranslations);
} else {
  applyTranslations();
}

function hideSelection() {
  const selectionBoxEl = document.getElementById("selection-box");
  if (selectionBoxEl) selectionBoxEl.style.display = "none";
}

function showSelection() {
  const selectionBoxEl = document.getElementById("selection-box");
  if (selectionBoxEl) selectionBoxEl.style.display = "flex";
}

function getOptionValue(index: number): string | null {
  const optionEl = document.getElementById(
    `option${index}`
  ) as HTMLInputElement;
  if (optionEl) {
    const value = optionEl.value.trim();
    return value !== "" ? value : null;
  }
  return null;
}

function randomSelection() {
  const options: string[] = [];
  for (let i = 1; i <= optionCount; i++) {
    const value = getOptionValue(i);
    if (value) {
      options.push(value);
    }
  }

  if (options.length < 2) return;

  const randomIndex = Math.floor(Math.random() * options.length);
  const selectedOption = options[randomIndex];

  const selectionEl = document.getElementById("selection");
  if (selectionEl) {
    selectionEl.textContent = `${i18n.t("selection")} ${selectedOption}`;
    showSelection();
  }

  return selectedOption;
}

function updateAddOptionButton() {
  const addOptionEl = document.getElementById("add-option");
  const deleteOptionEl = document.getElementById(
    "delete-option"
  ) as HTMLButtonElement;
  if (addOptionEl) {
    addOptionEl.classList.toggle("hidden", optionCount >= maxOptions);
    addOptionEl.textContent = i18n.t("addOption");
  }
  if (deleteOptionEl) {
    deleteOptionEl.disabled = optionCount <= 2;
  }
}

function addOption() {
  if (optionCount >= maxOptions) return;

  optionCount++;
  const nextOptionEl = document.getElementById(`option${optionCount}`);
  const additionalOptionsContainer = document.querySelector(
    ".additional-options-container"
  );

  if (nextOptionEl) {
    nextOptionEl.classList.remove("hidden");
  }
  if (additionalOptionsContainer) {
    additionalOptionsContainer.classList.remove("hidden");
  }

  updateAddOptionButton();
}

function removeOption() {
  if (optionCount <= 2) return;

  const currentOptionEl = document.getElementById(
    `option${optionCount}`
  ) as HTMLInputElement;
  if (currentOptionEl) {
    currentOptionEl.value = "";
    currentOptionEl.classList.add("hidden");
  }

  optionCount--;
  updateAddOptionButton();

  if (optionCount === 2) {
    const additionalOptionsContainer = document.querySelector(
      ".additional-options-container"
    );
    if (additionalOptionsContainer) {
      additionalOptionsContainer.classList.add("hidden");
    }
  }
}

function deleteFocusedOption() {
  if (focusedOptionIndex === null || optionCount <= 2) return;

  const index = Math.min(focusedOptionIndex, optionCount);
  if (index < 1 || index > optionCount) return;

  // Shift following values up so there are no gaps after deleting an option.
  for (let i = index; i < optionCount; i++) {
    const current = document.getElementById(`option${i}`) as HTMLInputElement;
    const next = document.getElementById(`option${i + 1}`) as HTMLInputElement;
    if (current && next) current.value = next.value;
  }

  const lastOption = document.getElementById(
    `option${optionCount}`
  ) as HTMLInputElement;
  if (lastOption) {
    lastOption.value = "";
    lastOption.classList.add("hidden");
  }

  optionCount--;
  focusedOptionIndex = Math.min(index, optionCount);
  updateAddOptionButton();

  if (optionCount === 2) {
    document.querySelector(".additional-options-container")?.classList.add("hidden");
  }

  const newFocusedOption = document.getElementById(
    `option${focusedOptionIndex}`
  ) as HTMLInputElement;
  newFocusedOption?.focus();
}

function hideAdditionalOptionsOnLoad() {
  // Ensure options 3 and 4 are hidden on page load
  const option3El = document.getElementById("option3");
  const option4El = document.getElementById("option4");
  const additionalOptionsContainer = document.querySelector(
    ".additional-options-container"
  );

  if (option3El) option3El.classList.add("hidden");
  if (option4El) option4El.classList.add("hidden");
  if (additionalOptionsContainer)
    additionalOptionsContainer.classList.add("hidden");

  optionCount = 2;
}

function hideSelectionOnLoad() {
  hideSelection();
  hideAdditionalOptionsOnLoad();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", hideSelectionOnLoad);
} else {
  hideSelectionOnLoad();
}

const formEl = document.getElementById("form");
if (formEl) {
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    randomSelection();
  });
}

const clearEl = document.getElementById("clear");
if (clearEl) {
  clearEl.textContent = i18n.t("clear");
  clearEl.addEventListener("click", clearSelection);
}

function clearSelection() {
  // The clear button takes focus when clicked, so remember which option was
  // focused before it was clicked and clear only that option.
  if (focusedOptionIndex !== null) {
    const optionEl = document.getElementById(
      `option${focusedOptionIndex}`
    ) as HTMLInputElement;
    if (optionEl) {
      optionEl.value = "";
      hideSelection();
      return;
    }
  }

  for (let i = 1; i <= maxOptions; i++) {
    const optionEl = document.getElementById(`option${i}`) as HTMLInputElement;
    if (optionEl) {
      optionEl.value = "";
      if (i > 2) {
        optionEl.classList.add("hidden");
      }
    }
  }

  const additionalOptionsContainer = document.querySelector(
    ".additional-options-container"
  );
  if (additionalOptionsContainer) {
    additionalOptionsContainer.classList.add("hidden");
  }

  optionCount = 2;
  updateAddOptionButton();
  hideSelection();
}

const subtitle2El = document.getElementById("subtitle2");
if (subtitle2El) {
  subtitle2El.textContent = i18n.t("subtitle2");
}

for (let i = 1; i <= maxOptions; i++) {
  const optionEl = document.getElementById(`option${i}`);
  optionEl?.addEventListener("focus", () => {
    focusedOptionIndex = i;
  });
}

const deleteOptionBtnEl = document.getElementById("delete-option");
if (deleteOptionBtnEl) {
  deleteOptionBtnEl.addEventListener("click", deleteFocusedOption);
}

const addOptionBtnEl = document.getElementById("add-option");
if (addOptionBtnEl) {
  addOptionBtnEl.addEventListener("click", () => {
    if (optionCount >= maxOptions) {
      removeOption();
    } else {
      addOption();
    }
  });
}
