import './style.css'
import { i18n } from './i18n/i18n'

// Apply translations when DOM is ready
function applyTranslations() {
  const titleEl = document.getElementById('title')
  const subtitleEl = document.getElementById('subtitle')
  const option1El = document.getElementById('option1') as HTMLInputElement
  const option2El = document.getElementById('option2') as HTMLInputElement
  const submitEl = document.getElementById('submit') as HTMLButtonElement
  const repeatEl = document.getElementById('repeat') as HTMLButtonElement
  
  if (titleEl) titleEl.textContent = i18n.t('title')
  if (subtitleEl) subtitleEl.textContent = i18n.t('subtitle')
  if (option1El) option1El.placeholder = i18n.t('option1Placeholder')
  if (option2El) option2El.placeholder = i18n.t('option2Placeholder')
  if (submitEl) submitEl.textContent = i18n.t('submit')
  if (repeatEl) repeatEl.textContent = i18n.t('repeat')
  
  // Update HTML lang attribute
  document.documentElement.lang = i18n.getLanguage()
}

// Apply translations when DOM content is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyTranslations)
} else {
  applyTranslations()
}

// Hide selection box initially
function hideSelection() {
  const selectionBoxEl = document.getElementById('selection-box')
  if (selectionBoxEl) selectionBoxEl.style.display = 'none'
}

// Show selection box
function showSelection() {
  const selectionBoxEl = document.getElementById('selection-box')
  if (selectionBoxEl) selectionBoxEl.style.display = 'flex'
}

// Core of the random selection logic
function randomSelection() {
  const option1 = document.getElementById('option1') as HTMLInputElement
  const option2 = document.getElementById('option2') as HTMLInputElement
  
  if (!option1 || !option2) return
  
  const option1Value = option1.value.trim()
  const option2Value = option2.value.trim()
  
  if (option1Value === '' || option2Value === '') return
  
  const randomIndex = Math.floor(Math.random() * 2)
  const selectedOption = randomIndex === 0 ? option1Value : option2Value

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

// Initialize: hide selection initially
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hideSelection)
} else {
  hideSelection()
}

// Form submission handler
const formEl = document.getElementById('form')
if (formEl) {
  formEl.addEventListener('submit', (e) => {
    e.preventDefault()
    randomSelection()
  })
}

// Repeat button handler
const repeatEl = document.getElementById('repeat')
if (repeatEl) {
  repeatEl.addEventListener('click', repeatSelection)
}

// Clear button handler
const clearEl = document.getElementById('clear')
if (clearEl) {
  clearEl.textContent = i18n.t('clear')
  clearEl.addEventListener('click', clearSelection)
}

function clearSelection() {
  const option1El = document.getElementById('option1') as HTMLInputElement
  const option2El = document.getElementById('option2') as HTMLInputElement
  if (option1El) option1El.value = ""
  if (option2El) option2El.value = ""
  hideSelection()
}

// Subtitle 2 handler
const subtitle2El = document.getElementById('subtitle2')
if (subtitle2El) {
  subtitle2El.textContent = i18n.t('subtitle2')
}