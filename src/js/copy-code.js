(() => {
    const copyButtons = document.querySelectorAll('[id^="copy-"][id$="-code-btn"]');
    if (!copyButtons.length) return;

    copyButtons.forEach((copyButton) => {
        copyButton.addEventListener('click', async () => {
            const codeBlock = copyButton.closest('details')?.querySelector('code');
            const codeToCopy = codeBlock?.innerText?.trim();

            if (!codeToCopy) return;

            const originalLabel = copyButton.textContent;

            try {
                await navigator.clipboard.writeText(codeToCopy);
                copyButton.textContent = 'Copied!';
            } catch {
                copyButton.textContent = 'Copy failed';
            }

            setTimeout(() => {
                copyButton.textContent = originalLabel;
            }, 1500);
        });
    });
})();