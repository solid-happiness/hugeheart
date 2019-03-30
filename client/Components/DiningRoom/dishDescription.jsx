const getDishDescription = ({
  calorific,
  proteins,
  fats,
  carbohydrates,
  price,
  portion,
}) => [
  `Цена: ${price}р`,
  `К/Б/Ж/У: ${calorific.toFixed(2)}/${proteins.toFixed(2)}/${fats.toFixed(2)}/${carbohydrates.toFixed(2)}`,
  `Порция: ${portion}`,
];

export default getDishDescription;
