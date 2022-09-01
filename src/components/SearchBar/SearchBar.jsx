import { useState } from 'react';

import styles from './SearchBar.module.css';
import PropTypes from 'prop-types';

export const SearchBar = ({ newSearch }) => {
  const [searchPicture, setSearchPicture] = useState('');

  const inputChange = e => {
    setSearchPicture(e.target.value);
  };

  const valueSubmit = e => {
    e.preventDefault();
    newSearch({searchPicture});
    setSearchPicture('');
  };

  const {
    SearchBar,
    SearchForm,
    SearchFormButton,
    SearchFormButtonLabel,
    SearchFormInput,
  } = styles;

  return (
    <header className={SearchBar}>
      <form className={SearchForm} onSubmit={valueSubmit}>
        <button className={SearchFormButton} type="submit">
          <span className={SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchPicture"
          onChange={inputChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  newSearch: PropTypes.func.isRequired,
};
