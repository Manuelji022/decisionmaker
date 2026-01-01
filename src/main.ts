import './style.css'
import { i18n } from './i18n/i18n'

let optionCount = 2
const maxOptions = 4

function applyTranslations() {
  const titleEl = document.getElementById('title')
  const subtitleEl = document.getElementById('subtitle')
  const option1El = document.getElementById('option1') as HTMLInputElement
  const option2El = document.getElementById('option2') as HTMLInputElement
  const option3El = document.getElementById('option3') as HTMLInputElement
  const option4El = document.getElementById('option4') as HTMLInputElement
  const submitEl = document.getElementById('submit') as HTMLButtonElement
  const repeatEl = document.getElementById('repeat') as HTMLButtonElement
  const addOptionEl = document.getElementById('add-option') as HTMLButtonElement

  if (titleEl) titleEl.textContent = i18n.t('title')
  if (subtitleEl) subtitleEl.textContent = i18n.t('subtitle')
  if (option1El) option1El.placeholder = i18n.t('option1Placeholder')
  if (option2El) option2El.placeholder = i18n.t('option2Placeholder')
  if (option3El) option3El.placeholder = i18n.t('option3Placeholder')
  if (option4El) option4El.placeholder = i18n.t('option4Placeholder')
  if (submitEl) submitEl.textContent = i18n.t('submit')
  if (repeatEl) repeatEl.textContent = i18n.t('repeat')
  if (addOptionEl) {
    addOptionEl.textContent = optionCount > 2 ? i18n.t('removeOption') : i18n.t('addOption')
  }

  document.documentElement.lang = i18n.getLanguage()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyTranslations)
} else {
  applyTranslations()
}

function hideSelection() {
  const selectionBoxEl = document.getElementById('selection-box')
  if (selectionBoxEl) selectionBoxEl.style.display = 'none'
}

function showSelection() {
  const selectionBoxEl = document.getElementById('selection-box')
  if (selectionBoxEl) selectionBoxEl.style.display = 'flex'
}

function getOptionValue(index: number): string | null {
  const optionEl = document.getElementById(`option${index}`) as HTMLInputElement
  if (optionEl) {
    const value = optionEl.value.trim()
    return value !== '' ? value : null
  }
  return null
}

function randomSelection() {
  const options: string[] = []
  for (let i = 1; i <= optionCount; i++) {
    const value = getOptionValue(i)
    if (value) {
      options.push(value)
    }
  }

  if (options.length < 2) return

  const randomIndex = Math.floor(Math.random() * options.length)
  const selectedOption = options[randomIndex]

  const selectionEl = document.getElementById('selection')
  if (selectionEl) {
    selectionEl.textContent = `${i18n.t('selection')} ${selectedOption}`
    showSelection()
  }

  return selectedOption
}

function repeatSelection() {
  return randomSelection()
}

function updateAddOptionButton() {
  const addOptionEl = document.getElementById('add-option')
  if (addOptionEl) {
    addOptionEl.classList.remove('hidden')
    addOptionEl.textContent = optionCount >= maxOptions ? i18n.t('removeOption') : i18n.t('addOption')
  }
}

function addOption() {
  if (optionCount >= maxOptions) return

  optionCount++
  const nextOptionEl = document.getElementById(`option${optionCount}`)
  const additionalOptionsContainer = document.querySelector('.additional-options-container')

  if (nextOptionEl) {
    nextOptionEl.classList.remove('hidden')
  }
  if (additionalOptionsContainer) {
    additionalOptionsContainer.classList.remove('hidden')
  }

  updateAddOptionButton()
}

function removeOption() {
  if (optionCount <= 2) return

  const currentOptionEl = document.getElementById(`option${optionCount}`) as HTMLInputElement
  if (currentOptionEl) {
    currentOptionEl.value = ''
    currentOptionEl.classList.add('hidden')
  }

  optionCount--
  updateAddOptionButton()

  if (optionCount === 2) {
    const additionalOptionsContainer = document.querySelector('.additional-options-container')
    if (additionalOptionsContainer) {
      additionalOptionsContainer.classList.add('hidden')
    }
  }
}

function hideAdditionalOptionsOnLoad() {
  // Ensure options 3 and 4 are hidden on page load
  const option3El = document.getElementById('option3')
  const option4El = document.getElementById('option4')
  const additionalOptionsContainer = document.querySelector('.additional-options-container')
  
  if (option3El) option3El.classList.add('hidden')
  if (option4El) option4El.classList.add('hidden')
  if (additionalOptionsContainer) additionalOptionsContainer.classList.add('hidden')
  
  optionCount = 2
}

function hideSelectionOnLoad() {
  hideSelection()
  hideAdditionalOptionsOnLoad()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hideSelectionOnLoad)
} else {
  hideSelectionOnLoad()
}

const formEl = document.getElementById('form')
if (formEl) {
  formEl.addEventListener('submit', (e) => {
    e.preventDefault()
    randomSelection()
  })
}

const repeatEl = document.getElementById('repeat')
if (repeatEl) {
  repeatEl.addEventListener('click', repeatSelection)
}

const clearEl = document.getElementById('clear')
if (clearEl) {
  clearEl.textContent = i18n.t('clear')
  clearEl.addEventListener('click', clearSelection)
}

function clearSelection() {
  for (let i = 1; i <= maxOptions; i++) {
    const optionEl = document.getElementById(`option${i}`) as HTMLInputElement
    if (optionEl) {
      optionEl.value = ''
      if (i > 2) {
        optionEl.classList.add('hidden')
      }
    }
  }

  const additionalOptionsContainer = document.querySelector('.additional-options-container')
  if (additionalOptionsContainer) {
    additionalOptionsContainer.classList.add('hidden')
  }

  optionCount = 2
  updateAddOptionButton()
  hideSelection()
}

const subtitle2El = document.getElementById('subtitle2')
if (subtitle2El) {
  subtitle2El.textContent = i18n.t('subtitle2')
}

const addOptionBtnEl = document.getElementById('add-option')
if (addOptionBtnEl) {
  addOptionBtnEl.addEventListener('click', () => {
    if (optionCount >= maxOptions) {
      removeOption()
    } else {
      addOption()
    }
  })
}
