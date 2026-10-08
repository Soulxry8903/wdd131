const preparationItems = [
  { id: 'safe-space', label: 'Prepare a quiet, safe space' },
  { id: 'essentials', label: 'List the basic supplies I need' },
  { id: 'clinic', label: 'Find a veterinary clinic' },
  { id: 'routine', label: 'Discuss the new routine with my household' }
];

const checklistElement = document.querySelector('#checklist-items');
const progressBar = document.querySelector('#progress-bar');
const progressText = document.querySelector('#progress-text');
const checklistStorageKey = 'my-first-pet-checklist';
const appointmentStorageKey = 'my-first-pet-vet-visit';

function getCompletedItems() {
  const savedItems = localStorage.getItem(checklistStorageKey);
  return savedItems ? JSON.parse(savedItems) : [];
}

function renderChecklist() {
  const completedItems = getCompletedItems();
  checklistElement.innerHTML = preparationItems.map((item) => `
    <li>
      <label for="task-${item.id}">
        <input id="task-${item.id}" type="checkbox" data-task="${item.id}" ${completedItems.includes(item.id) ? 'checked' : ''}>
        <span>${item.label}</span>
      </label>
    </li>
  `).join('');
  updateProgress(completedItems);
}

function updateProgress(completedItems) {
  const doneCount = completedItems.length;
  progressBar.value = doneCount;
  progressText.textContent = `${doneCount} of ${preparationItems.length}`;
}

function saveChecklistChange(event) {
  if (event.target.matches('[data-task]')) {
    const completedItems = [...checklistElement.querySelectorAll('[data-task]:checked')]
      .map((checkbox) => checkbox.dataset.task);
    localStorage.setItem(checklistStorageKey, JSON.stringify(completedItems));
    updateProgress(completedItems);
  }
}

function restoreAppointment() {
  const savedDate = localStorage.getItem(appointmentStorageKey);
  if (savedDate) {
    document.querySelector('#appointment-date').value = savedDate;
    document.querySelector('#appointment-message').textContent = `Saved date: ${savedDate}`;
  }
}

function saveAppointment(event) {
  event.preventDefault();
  const dateInput = document.querySelector('#appointment-date');
  const message = document.querySelector('#appointment-message');
  if (dateInput.value) {
    localStorage.setItem(appointmentStorageKey, dateInput.value);
    message.textContent = `Your reminder is saved for ${dateInput.value}.`;
  } else {
    message.textContent = 'Choose a date to save your reminder.';
  }
}

checklistElement.addEventListener('change', saveChecklistChange);
document.querySelector('#appointment-form').addEventListener('submit', saveAppointment);
renderChecklist();
restoreAppointment();
