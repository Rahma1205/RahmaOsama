import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import styles from './AllOrders.module.css';
import {jwtDecode} from 'jwt-decode';
import { Helmet } from 'react-helmet';

export default function AllOrders() {
  const [orders, setOrders] = useState(null);
  const encodedToken = localStorage.getItem('userToken');
  const { id } = encodedToken ? jwtDecode(encodedToken) : {};

  async function getUserOrders() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
     setOrders(data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  if (!orders) {
    return (
      <p className="py-5 d-flex justify-content-center">
        <i className="fas fa-spinner fa-spin"></i>
      </p>
    );
  }

  return (
    <>
    <Helmet>
      <title>Orders</title>
    </Helmet>
      <div className="row">
        {orders.map((order) => (
          <div key={order.id} className={`order border border-gray-300 rounded-md p-4 ${styles.order}`}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-gray-400">Order ID</h2>
                <h3 className="font-bold">{order.id}</h3>
              </div>
              <div>
                {order.isDelivered ? (
                  <span className="btn-primary font-cairo bg-success inline-block me-2">
                    Delivered
                  </span>
                ) : (
                  <span className="btn-primary font-cairo bg-danger inline-block">
                    In the Way
                  </span>
                )}
                {order.isPaid ? (
                  <span className="btn-primary font-cairo bg-success inline-block">
                    Paid
                  </span>
                ) : (
                  <span className="btn-primary font-cairo bg-danger inline-block">
                    Payment in cash
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {order.caryItems.map((product) => (
                <div key={product.product.id} className="product border border-gray-300 rounded p-3">
                  <img
                    src={product.product.imageCover}
                    alt={product.product.title}
                    className="w-full h-32 object-cover container"
                  />
                  <h3 className="font-semibold my-2">{product.product.title}</h3>
                  <span>{product.price} EGP</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
