/* Cyber Detective - áudio ambiente sem arquivos externos */
(() => {
  'use strict';

  let audioContext = null;
  let master = null;
  let oscillators = [];
  let enabled = false;

  function startSound() {
    if (enabled) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      alert('Seu navegador não oferece suporte ao áudio ambiente.');
      return;
    }

    audioContext = audioContext || new AudioCtx();
    master = audioContext.createGain();
    master.gain.value = 0.90;
    master.connect(audioContext.destination);

    const tones = [55, 82.41, 110];
    tones.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = index === 0 ? 'sine' : 'triangle';
      oscillator.frequency.value = frequency;
      gain.gain.value = index === 0 ? 0.45 : 0.16;
      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start();
      oscillators.push(oscillator);
    });

    enabled = true;
    updateButton();
  }

  function stopSound() {
    oscillators.forEach(oscillator => {
      try { oscillator.stop(); } catch (_) {}
    });
    oscillators = [];
    if (master) master.disconnect();
    enabled = false;
    updateButton();
  }

  function updateButton() {
    const button = document.getElementById('soundBtn');
    if (!button) return;
    button.textContent = enabled ? '🔊 Som ambiente' : '🔇 Som ambiente';
    button.setAttribute('aria-pressed', String(enabled));
  }

  function toggleSound() {
    if (enabled) stopSound();
    else startSound();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('soundBtn');
    if (button) button.addEventListener('click', toggleSound);

    // Sons de clique discretos nos controles, somente depois que o áudio for ativado.
    document.addEventListener('click', event => {
      if (!enabled || !audioContext || !master) return;
      const target = event.target.closest('button');
      if (!target || target.id === 'soundBtn') return;
      const clickOsc = audioContext.createOscillator();
      const clickGain = audioContext.createGain();
      clickOsc.type = 'square';
      clickOsc.frequency.value = 520;
      clickGain.gain.setValueAtTime(0.025, audioContext.currentTime);
      clickGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.06);
      clickOsc.connect(clickGain);
      clickGain.connect(master);
      clickOsc.start();
      clickOsc.stop(audioContext.currentTime + 0.06);
    });
  });
})();
