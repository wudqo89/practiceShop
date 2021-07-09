(function() {
  const messageBox = document.querySelector('.js-messageBox');
  const messageElements = document.querySelectorAll('.js-message');
  let messageBoxStyle = window.getComputedStyle(messageBox);

  if (messageBoxStyle.display === 'none') {
    messageBox.style.display = 'block';
  }

  messageElements.forEach(messageElement => {
    messageElement.addEventListener('click', () => {
      messageElement.style.display = 'none';
    });
  });
})();
