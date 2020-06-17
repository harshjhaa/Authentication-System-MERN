(() => {
    let i = 0;
    const followInterval = setInterval(() => {
        if (i >= 30) {
            clearInterval(followInterval);
            return;
        }
        const button = document.getElementsByClassName('sqdOP  L3NKy    _8A5w5    ');
        const nextButton = button[i];
        nextButton.click();
        i++;
    }, 500);
})();