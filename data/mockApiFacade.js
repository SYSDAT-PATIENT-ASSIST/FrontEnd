import data from './mockData';

const getAllOrders = () =>
    Promise.resolve(
      data.orders.map(order => {
        const links = data.order_dish.filter(od => od.order_id === order.id);
        const dishes = links
          .map(l => data.dishes.find(d => d.id === l.dish_id))
          .filter(Boolean);
        return { ...order, dishes };
      })
    );
  
  const getOrderById = (orderId) => {
    const order = data.orders.find(o => o.id === orderId);
    if (!order) {
      return Promise.reject({ status: 404, message: 'Order not found' });
    }
    const links = data.order_dish.filter(od => od.order_id === order.id);
    const dishes = links
      .map(l => data.dishes.find(d => d.id === l.dish_id))
      .filter(Boolean);
    return Promise.resolve({ ...order, dishes });
  };

const updateOrderStatus = (orderId, newStatus) => {
  const order = data.orders.find(o => o.id === orderId);
  if (!order) {
    return Promise.reject({ status: 404, message: 'Order not found' });
  }
  order.status = newStatus;
  return Promise.resolve({ ...order });
};

const facade = {
  getAllOrders,
  getOrderById,
  updateOrderStatus
};

export default facade;
