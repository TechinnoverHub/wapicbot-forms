export default amount =>
  `${amount}`.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
