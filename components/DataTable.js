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
				{records.map((record, index) => (
					<tr key={index}>
						<td>{record.date ? record.date.split('T')[0] : null}</td>
						<td>{record.phoneModel}</td>
						<td>{record.purchaseSite}</td>
						<td>₹ {record.purchaseAmount}</td>
						<td>{record.purchaseQuantity}</td>
						<td>{record.salesParty}</td>
						<td>₹ {record.salesAmount}</td>
						<td>{record.salesQuantity}</td>
						<td>₹ {record.profit}</td>
						<td style={{ display: 'flex', gap: '10px' }}>
							<button onClick={() => onEdit(record)}>Update</button>
							<button onClick={() => handleDelete(record._id)}>Delete</button>
						</td>
					</tr>
				))}
			</tbody>

    </table>
  );
}
