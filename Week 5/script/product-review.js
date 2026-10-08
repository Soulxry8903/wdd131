const modified = new Date(document.lastModified);
    document.getElementById('modified').textContent = new Intl.DateTimeFormat('en-US', {
      month: '2-digit', day: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }).format(modified).replace(',', '');

    document.getElementById('review-form').addEventListener('submit', (event) => {
      event.preventDefault();
      if (!event.currentTarget.reportValidity()) return;
      const button = event.currentTarget.querySelector('button');
      button.textContent = 'Review Posted!';
      button.disabled = true;
    });