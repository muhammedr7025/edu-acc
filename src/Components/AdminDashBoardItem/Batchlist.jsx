import React, { useState, useEffect } from 'react';
import supabase from '../../createClent';

const Batchlist = () => {
  const [fetchError, setFetchError] = useState(null);
  const [batchList, setBatchList] = useState([]); // Initialize as empty array
  const [addEditBatch, setAddEditBatch] = useState(null); // State to manage add/edit popup
  const [selectedBatch, setSelectedBatch] = useState({ id: null, name: '' });
  const [rerenderFlag, setRerenderFlag] = useState(false); // New state variable for re-rendering

  useEffect(() => {
    const fetchBatchList = async () => {
      try {
        const { data, error } = await supabase
          .from('batchlist')
          .select();
        if (error) {
          throw error;
        }
        setBatchList(data || []);
        setFetchError(null);
      } catch (error) {
        console.error('Error fetching batch list:', error.message);
        setFetchError('Could not fetch data');
        setBatchList([]);
      }
    };
    fetchBatchList();
  }, [rerenderFlag]); // Include rerenderFlag in the dependency array

  const handleEdit = (batch) => {
    setSelectedBatch(batch);
    setAddEditBatch('edit');
  };

  const handleDelete = async (batch) => {
    try {
      await supabase
        .from('batchlist')
        .delete()
        .eq('id', batch.id);
      setBatchList(batchList.filter((b) => b.id !== batch.id));
    } catch (error) {
      console.error('Error deleting batch:', error.message);
    }
  };

  const handleAddEditClose = () => {
    setAddEditBatch(null);
    setSelectedBatch({ id: null, name: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form with selectedBatch:', selectedBatch);
      if (addEditBatch === 'add') {
        const { id, ...batchWithoutId } = selectedBatch;
        const { data, error } = await supabase
          .from('batchlist')
          .insert([batchWithoutId]);
        if (error) {
          throw error;
        }
        if (data) {
          console.log('Batch added successfully:', data);
          setBatchList([...batchList, data[0]]);
        }
        handleAddEditClose();
      } else if (addEditBatch === 'edit') {
        // Handle edit functionality
      }
      // After adding or editing batch, set rerenderFlag to trigger re-render
      setRerenderFlag(prevFlag => !prevFlag);
    } catch (error) {
      console.error('Error adding/editing batch:', error.message);
    }
  };
  return (
    <div className='p-7 text-2xl text-black bg-blue-100 w-full font-semibold'>
      <h2>Batch List</h2>
      <button
        onClick={() => {
          setAddEditBatch('add');
          setSelectedBatch({ id: null, name: '' }); // Initialize selectedBatch for adding
        }}
        className="bg-text-hover-color w-[60px] h-[40px] rounded-lg mt-1 text-center p-2 text-[20px] text-white font-normal"
      >
        Add
      </button>
      {fetchError && <p>{fetchError}</p>}
      <table className="pl-[10px] text-left table-auto bg-white border w-full rounded-[25px] shadow-lg">
        <thead className="rounded-lg">
          <tr className="rounded-lg">
            <th className="px-8 py-4 font-semibold">Batch ID</th>
            <th className="px-8 py-4 font-semibold">Name</th>
            <th className="px-8 py-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="font-sans">
          {batchList.map((batch, index) => (
            <tr key={batch.id} className={index % 2 === 0 ? 'bg-text-hover-bg' : ''}>
              <td className="px-8 py-4 font-light text-[20px]">{batch.id}</td>
              <td className="px-8 py-4 font-light text-[20px]">{batch.name}</td>
              <td className="px-8 py-4 flex gap-6">
                <button className="mr-2" onClick={() => handleEdit(batch)}>
                  <i className="fa-solid fa-pencil text-blue-500"></i>
                </button>
                <button onClick={() => handleDelete(batch)}>
                  <i className="fa-solid fa-trash text-red-500"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Batch Popup */}
      {addEditBatch && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
              {addEditBatch === 'add' ? 'Add Batch' : 'Edit Batch'}
            </h2>
            {/* Form for adding/editing batch */}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Batch Name"
                className="border rounded-lg px-3 py-2 mb-2 w-full"
                value={selectedBatch.name}
                onChange={(e) => setSelectedBatch({ ...selectedBatch, name: e.target.value })}
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleAddEditClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  {addEditBatch === 'add' ? 'Add' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Batchlist;
