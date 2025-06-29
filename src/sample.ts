// Sample utility function with complexity ~8
export function processPayment(order: any, user: any, config: any) {
  if (!order) return null;
  if (user.blocked) throw new Error('User blocked');

  let total = 0;
  for (const item of order.items) {
    if (item.discount) {
      total += item.price * (1 - item.discount);
    } else {
      total += item.price;
    }
  }

  if (config.tax) total *= 1.1;
  return total > user.limit ? null : total;
}

// Complexity breakdown:
// if (!order) = 1
// if (user.blocked) = 1
// for loop = 1
// if (item.discount) = 1
// if (config.tax) = 1
// ternary return = 1
// Total: 6 branches + base = 7 complexity
