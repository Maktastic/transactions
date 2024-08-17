import Form from '@/components/Form';
import DataTable from '@/components/DataTable';
import { useState } from 'react';
import '@/styles/Home.module.css';
import { Toaster } from 'react-hot-toast';

export default function Home() {

  const [records, setRecords] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);

  const handleEdit = (record) => {
    setCurrentRecord(record); // Pass the selected record to the Form for editing
    const formElement = document.querySelector('#transaction-form'); // Use the correct selector for your form
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };


  async function fetchRecords() {
    // Fetch records from your data source
    try {
        const res = await fetch('/api/records');
        const data = await res.json();
        return data;
      } catch (error) {
        console.error('Error fetching records:', error);
        return [];
      }
  
  }

  return (
    <div className="container">
      <div><Toaster/></div>
      <h1>Profit Calculator</h1>
      <Form fetchRecords={fetchRecords} setRecords={setRecords} currentRecord={currentRecord} />
      <DataTable fetchRecords={fetchRecords} records={records} setRecords={setRecords} onEdit={handleEdit} />
    </div>
  );
}
