import { useState, useEffect } from 'react';
import _ from 'lodash';
import toast from 'react-hot-toast';
import styles from '@/styles/Form.module.css';

const purchaseSites = [
  { id: 1, text: 'Amazon' },
  { id: 2, text: 'Flipkart' },
  { id: 3, text: 'JioMart' },
  { id: 4, text: 'Oneplus' },
  { id: 5, text: 'Croma' },
  { id: 6, text: 'MI' },
  { id: 7, text: 'Reliance Digital' },
  { id: 8, text: 'Sangeetha' },
  { id: 9, text: 'Iqoo Vivo' },
];

const salesParties = [
  { id: 1, text: 'KNK' },
  { id: 2, text: 'Pradeep Guru' },
  { id: 3, text: 'Aman Mahavir' },
  { id: 4, text: 'Shivangi' },
  { id: 5, text: 'SK Huzefa' },
  { id: 6, text: 'Abhishek' },
  { id: 7, text: 'Aswami' },
];

export default function Form({ fetchRecords, setRecords, currentRecord }) {
  const [form, setForm] = useState({
    date: '',
    phoneModel: '',
    purchaseSite: '',
    purchaseAmount: '',
    purchaseQuantity: '',
    salesParty: '',
    salesAmount: '',
    salesQuantity: '',
  });

  const [profit, setProfit] = useState(null);

  const resetForm = () => {
    setForm({
      date: '',
      phoneModel: '',
      purchaseSite: '',
      purchaseAmount: '',
      purchaseQuantity: '',
      salesParty: '',
      salesAmount: '',
      salesQuantity: '',
    });
  }

  useEffect(() => {
    if (currentRecord) {
      console.log('Current record:', currentRecord);
      
      setForm({
        id: currentRecord.id,
        date: currentRecord.date || '',
        phoneModel: currentRecord.phone_model || '',
        purchaseSite: currentRecord.purchase_site || '',
        purchaseAmount: currentRecord.purchase_amount || '',
        purchaseQuantity: currentRecord.purchase_quantity || '',
        salesParty: currentRecord.sales_party || '',
        salesAmount: currentRecord.sales_amount || '',
        salesQuantity: currentRecord.sales_quantity || '',
        profit: setProfit(currentRecord.profit || ''),
      });
    }
  }, [currentRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Update the form state
    setForm((prevForm) => {
      const updatedForm = {
        ...prevForm,
        [name]: value
      };
  
      // Parse and validate numeric values
      const purchaseAmount = parseFloat(updatedForm.purchaseAmount) || 0;
      const purchaseQuantity = parseInt(updatedForm.purchaseQuantity, 10) || 0;
      const salesAmount = parseFloat(updatedForm.salesAmount) || 0;
      const salesQuantity = parseInt(updatedForm.salesQuantity, 10) || 0;
  
      // Calculate profit
      const calculatedProfit = (salesAmount * salesQuantity) - (purchaseAmount * purchaseQuantity);
      setProfit(calculatedProfit);
  
      return updatedForm;
    });
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', { ...form, profit });
    try {
      // Check if salesParty and purchaseSite are selected
      if (_.isEmpty(form.salesParty) || _.isEmpty(form.purchaseSite)) {
        toast.error('Please select sales party and purchase site');
        return;
      }
    
      const method = form.id ? 'PUT' : 'POST'; // Determine if we're creating or updating
      const url = form.id ? `/api/records/${form.id}` : '/api/records'; // Update endpoint if needed
    
      // Send the request to the server
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, profit }), // Include profit in the form data
      });
    
      // Check for successful submission
      if (!response.ok) {
        toast.error('Failed to submit form');
        return;
      }
    
      // Reset form fields after successful submission
      setForm({
        date: '',
        phoneModel: '',
        purchaseSite: '',
        purchaseAmount: '',
        purchaseQuantity: '',
        salesParty: '',
        salesAmount: '',
        salesQuantity: '',
        id: null, // Ensure the id is cleared so the form can be used for a new entry
      });
      setProfit(null);
    
      // Refresh the records table or notify the user
      await fetchRecords().then((records) => {
        setRecords(records);
      });

      if(form.id) {
        toast.success('Record updated successfully');
      } else {
        toast.success('Form submitted successfully');
      }
    
    } catch (error) {
      // Handle errors during submission
      toast.error('Error submitting form');
      console.error('Error submitting form:', error);
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer} id='transaction-form'>
      <div className={styles.formGroup}>
        <label>Date:</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label>Phone Model:</label>
        <input type="text" name="phoneModel" value={form.phoneModel} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label>Purchase Site:</label>
        <select name="purchaseSite" value={form.purchaseSite} onChange={handleChange} required>
          <option key={0} value={'none'}>Select a site</option>
          {purchaseSites.map((site) => (
            <option key={site.id} value={site.text}>{site.text}</option>
          ))}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label>Purchase Amount:</label>
        <input
          type="text"
          name="purchaseAmount"
          value={form.purchaseAmount}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>Purchase Quantity:</label>
        <input
          type="text"
          name="purchaseQuantity"
          value={form.purchaseQuantity}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>Sales Party:</label>
        <select name="salesParty" value={form.salesParty} onChange={handleChange} required>
          <option key={0} value={'none'}>Select a party</option>
          {salesParties.map((party) => (
            <option key={party.id} value={party.text}>{party.text}</option>
          ))}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label>Sales Amount:</label>
        <input
          type="text"
          name="salesAmount"
          value={form.salesAmount}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>Sales Quantity:</label>
        <input
          type="text"
          name="salesQuantity"
          value={form.salesQuantity}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>Calculated Profit:</label>
        <input
          type="text"
          value={profit !== null ? `₹${parseFloat(profit).toFixed(2)}` : 0}
          readOnly
        />
      </div>
      <button type="submit" className={styles.submitButton}>Submit</button>
    </form>
  );
}
