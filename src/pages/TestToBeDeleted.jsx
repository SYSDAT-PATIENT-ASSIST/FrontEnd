// SKAL SLETTES!!!
import React, { useEffect, useState } from 'react';
import mockFacade from '../../data/mockApiFacade';

function TestToBeDeleted() {
  const [orders, setOrders] = useState([]);
  const [singleOrder, setSingleOrder] = useState(null);
  const [updatedOrder, setUpdatedOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    mockFacade.getAllOrders()
      .then(setOrders)
      .catch(err => setError(err));

    mockFacade.getOrderById('3')
      .then(setSingleOrder)
      .catch(err => setError(err));

    mockFacade.updateOrderStatus(3, 'afsendt')
      .then(setUpdatedOrder)
      .catch(err => setError(err));
  }, []);
  

  const countsByDishAndStatus = orders.reduce((counts, order) => {
    const dishName = order.dish?.name ?? 'Unknown Dish';
    const status = order.status || 'UNKNOWN';
    const key = `${dishName}-${status}`;
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});


  return (
    <div>
      <h1>Test Orders Page</h1>
      {error && <p style={{ color: 'red' }}>Error: {JSON.stringify(error)}</p>}

      <section>
        <h2>All Orders</h2>
        <ul>
          {Object.entries(countsByDishAndStatus).map(([key, count]) => {
            const [name, status] = key.split('-');
            return (
              <li key={key}>
                {count} orders of <strong>{name}</strong> ({status})
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2>Order by ID ("3")</h2>
        {singleOrder
          ? <pre>{JSON.stringify(singleOrder, null, 2)}</pre>
          : <p>Loading…</p>}
      </section>

      <section>
  <h2>Order Status</h2>
  <div style={{ display: 'flex', gap: '2rem' }}>
    <div>
      <h3>Before Update</h3>
      {singleOrder ? (
        <pre>Status: {singleOrder.status}</pre>
      ) : (
        <p>Loading original status...</p>
      )}
    </div>
    
    <div>
      <h3>After Update</h3>
      {updatedOrder ? (
        <pre>Status: {updatedOrder.status}</pre>
      ) : (
        <p>Loading updated status...</p>
      )}
    </div>
  </div>
</section>
    </div>
  );
}

export default TestToBeDeleted;