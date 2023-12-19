let recognition;

document.getElementById("startButton").addEventListener("click", () => {
  const selectedLanguage = document.getElementById("language").value;

  recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.continuous = true;
  recognition.lang = selectedLanguage;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    const p = document.getElementById("transcript");
    p.textContent = transcript;
  };

  recognition.onerror = (event) => {
    console.error("Erreur de reconnaissance vocale :", event.error);
  };

  recognition.start();

  document.getElementById("startButton").disabled = true;
  document.getElementById("stopButton").disabled = false;
});

document.getElementById("stopButton").addEventListener("click", () => {
  if (recognition) {
    recognition.stop();
    document.getElementById("startButton").disabled = false;
    document.getElementById("stopButton").disabled = true;
  }
});
