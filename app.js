const buttons = document.querySelectorAll('button');
textField.document.designMode = 'On';
let show = false;

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    let cmd = buttons[i].getAttribute('data-cmd');

    if (buttons[i].name === 'active') {
      buttons[i].classList.toggle('active'); // Toggle 'active' class
    }

    if (cmd === 'insertImage' || cmd === 'createLink') {
      let url = prompt('Enter link here: ', '');
      textField.document.execCommand(cmd, false, url);

      if (cmd === 'insertImage') {
        const imgs = textField.document.querySelectorAll('img');
        imgs.forEach((item) => {
          item.style.maxWidth = '500px'; // Resize inserted images
        });
      } else {
        const links = textField.document.querySelectorAll('a');
        links.forEach((item) => {
          item.target = '_blank'; // Open links in new tab
          // Disable editing when mouse is over a link
          item.addEventListener('mouseover', () => {
            textField.document.designMode = 'Off';
          });
          // Enable editing when mouse moves out of a link
          item.addEventListener('mouseout', () => {
            textField.document.designMode = 'On';
          });
        });
      }
    } else {
      textField.document.execCommand(cmd, false, null);
    }

    if (cmd === 'showCode') {
      const textBody = textField.document.querySelector('body');

      if (show) {
        textBody.innerHTML = textBody.getAttribute('data-original-content'); // Restore original content
        show = false;
      } else {
        textBody.setAttribute('data-original-content', textBody.innerHTML); // Save current content
        textBody.textContent = textBody.innerHTML; // Display content as text
        show = true;
      }
    }
  });
}
