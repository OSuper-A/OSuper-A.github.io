let currentSpeech = null;

export function speakElement(element) {

    // Browser doesn't support speech
    if (!("speechSynthesis" in window)) {
        alert("Your browser doesn't support Text-to-Speech.");
        return;
    }

    // Stop previous speech
    window.speechSynthesis.cancel();

    // Create the message
    const text = `
        Hello! I am ${element.name}.

        ${element.personality}

        My atomic number is ${element.number}.

        I belong to the ${formatCategory(element.category)} category.

        My atomic mass is ${element.atomicMass}.

        I exist as a ${element.state} at room temperature.

        Fun fact...

        ${element.funFact}
    `;

    currentSpeech = new SpeechSynthesisUtterance(text);

    currentSpeech.rate = 0.95;
    currentSpeech.pitch = 1;
    currentSpeech.volume = 1;

    // Pick an English voice if available
    const voices = speechSynthesis.getVoices();

    const englishVoice =
        voices.find(v => v.lang.startsWith("en")) || voices[0];

    if (englishVoice) {
        currentSpeech.voice = englishVoice;
    }

    speechSynthesis.speak(currentSpeech);
}

export function stopSpeaking() {
    speechSynthesis.cancel();
}

function formatCategory(category) {

    return category
        .replace("-", " ")
        .replace(/\b\w/g, c => c.toUpperCase());

}