import { useEffect, useState } from 'react';
import styles from "@/styles/DataTable.module.css";
import toast from 'react-hot-toast';

export default function DataTable({ fetchRecords, records, setRecords, onEdit }) {
  

  useEffect(() => {
    fetchRecords().then((records) => {
      setRecords(records);
    })
  }, []);


  const handleDelete = async (id) => {
    await fetch(`/api/records/${id}`, { method: 'DELETE' });
    const getRecords = await fetchRecords();
    setRecords(getRecords);
    toast.success('Record deleted successfully');
  };

  return (
    <table className={styles['data-table']}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Phone Model</th>
          <th>Purchase Site</th>
          <th>Purchase Amount</th>
          <th>Purchase Quantity</th>
          <th>Sales Party</th>
          <th>Sales Amount</th>
          <th>Sales Quantity</th>
          <th>Profit</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {records.map(record => (
          <tr key={record.id}>
            <td>{record.date}</td>
            <td>{record.phone_model}</td>
            <td>{record.purchase_site}</td>
            <td>₹ {record.purchase_amount}</td>
            <td>{record.purchase_quantity}</td>
            <td>{record.sales_party}</td>
            <td>₹ {record.sales_amount}</td>
            <td>{record.sales_quantity}</td>
            <td>₹ {record.profit}</td>
            <td style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => onEdit(record)}>Update</button>
              <button onClick={() => handleDelete(record.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
