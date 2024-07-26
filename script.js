function generateFile() {
    // Récupérer les réponses de l'utilisateur
    // Par exemple, vous pouvez récupérer les valeurs des inputs radio et les stocker dans un objet
    const responses = {
        page1: document.querySelector('input[name="feedback-page1"]:checked').value,
        page2: document.querySelector('input[name="feedback-page2"]:checked').value,
        page3: document.querySelector('input[name="feedback-page3"]:checked').value,
    };

    // Convertir l'objet en JSON
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(responses));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "responses.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
