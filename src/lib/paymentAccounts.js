// Cuentas de ingreso de Standarte: las ÚNICAS que se usan en los proyectos de cliente.
//
// POR QUÉ EXISTE ESTA LISTA: el IBAN se escribía a mano en cada proyecto, y un dígito
// mal copiado en la página que el cliente usa para pagar es de los errores más caros
// que puede cometer el sistema. Al elegirse de aquí, el dato no se teclea nunca.
//
// El titular es siempre el mismo, así que no se repite por cuenta: lo pinta la página
// del proyecto ("Francisco Javier García Márquez, titular de Standarte").
//
// NOTA sobre el BIC de Cajalmendralejo: el correcto es CJALESSSXXX (11 caracteres).
// Un BIC tiene 8 u 11; 'CJALLESSSXXX' (12, con doble L) no es una forma válida.
export const paymentAccounts = [
  { id: 'cajalmendralejo', bank: 'Caja de Almendralejo, S.C.C.', iban: 'ES69 3001 0001 5601 2075 1754', bic: 'CJALESSSXXX' },
  { id: 'revolut',         bank: 'Revolut Bank UAB',             iban: 'ES89 1583 0001 1190 5419 6389', bic: 'REVOESM2' },
  { id: 'wise',            bank: 'Wise (TransferWise Europe)',   iban: 'BE70 9050 8377 1025',           bic: 'TRWIBEB1XXX' }
];

/** Cuenta por su id; null si no está en la lista. */
export const paymentAccountById = (id) => paymentAccounts.find((a) => a.id === id) || null;

/** Cuenta a la que corresponde un IBAN ya guardado (para preseleccionarla al editar). */
export const paymentAccountByIban = (iban) => {
  const n = String(iban || '').replace(/\s+/g, '').toUpperCase();
  if (!n) return null;
  return paymentAccounts.find((a) => a.iban.replace(/\s+/g, '').toUpperCase() === n) || null;
};

/** La habitual: la primera de la lista. Es con la que nace un proyecto nuevo. */
export const defaultPaymentAccount = paymentAccounts[0];
