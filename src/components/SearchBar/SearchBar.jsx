import PropTypes from 'prop-types';
import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import styles from './SearchBar.module.css';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');
  const handleQueryChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      Notify.failure('Type your search query');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={styles['Searchbar']}>
      <form className={styles['SearchForm']} onSubmit={handleSubmit}>
        <button type="submit" className={styles['SearchForm-button']}>
          <label className={styles['SearchForm-button-label']}>Search</label>
        </button>

        <input
          className={styles['SearchForm-input']}
          type="text"
          name="query"
          value={query}
          onChange={handleQueryChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
