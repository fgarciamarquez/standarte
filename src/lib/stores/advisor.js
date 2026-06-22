import { writable } from 'svelte/store';

// Estado compartido del panel de Pat (WelcomeAdvisor) y del botón "Expansión"
// que lo reactiva junto a los botones GEO.
//   true  => Pat está cerrado/descartado en esta sesión (oculto) -> muestra la píldora.
//   false => Pat está (o puede estar) visible -> oculta la píldora.
// Persiste en sessionStorage para no volver a molestar tras un cierre.
const KEY = 'standarte_advisor_dismissed';

function readInitial() {
  try {
    return typeof sessionStorage !== 'undefined' && sessionStorage.getItem(KEY) === '1';
  } catch (e) {
    return false;
  }
}

const { subscribe, set } = writable(readInitial());

export const advisorDismissed = {
  subscribe,
  // Cierra Pat: persiste el descarte y muestra el botón de reactivación.
  dismiss() {
    try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
    set(true);
  },
  // Reactiva Pat: limpia el descarte y oculta el botón.
  reactivate() {
    try { sessionStorage.removeItem(KEY); } catch (e) {}
    set(false);
  }
};
