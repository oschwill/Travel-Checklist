import React, { useState } from 'react';
/* Form Validation mit react hook Forms */
import { useForm } from 'react-hook-form';
import { createLogEntry } from '../API';

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const created = await createLogEntry(data);
      console.log(created);
      onClose();
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error ? <h3 className="error">{error.message}</h3> : null}
      <label htmlFor="title">Titel:</label>
      <input name="title" type="text" required {...register('title')} />
      <label htmlFor="description">Beschreibung:</label>
      <textarea name="description" type="text" {...register('description')} />
      <label htmlFor="comments">Kommentar:</label>
      <textarea name="comments" type="text" {...register('comments')} />
      <label htmlFor="image">Link zum Bild:</label>
      <input name="image" type="text" {...register('image')} />
      <label htmlFor="visitDate">besucht am:</label>
      <input name="visitDate" type="date" required {...register('visitDate')} />
      <button disabled={loading} className="button">
        {loading ? 'Loading...' : 'Eintragen'}
      </button>
    </form>
  );
};

export default LogEntryForm;
