export default function calculateBookingCost(
  price,
  discount,
  minimum_rental_period,
  duration
) {
  let cost = 0;
  cost = price * duration;
  if (discount && duration > minimum_rental_period) cost -= discount;
  return cost;
}
