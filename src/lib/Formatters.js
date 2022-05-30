export function formatCurrency(value) {
  let currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return currencyFormatter.format(value);
}

/**
 * @param {string} date
 */
export function formatDate(date) {
  let parts = date.split("-");
  //The -1 on month part is necessary because months start with 0(January)
  return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])).toLocaleDateString();
}
