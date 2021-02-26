import { useCallback, useState } from 'react';

interface ISearch {
  submit: (termSearch: string) => void;
  placeholder?: string;
}

const Search = ({ submit, placeholder }: ISearch) => {
  const [value, setValue] = useState('');
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      submit(value);
    },
    [submit, value]
  );
  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="card-body row no-gutters">
        <div className="col">
          <input
            className="form-control form-control-lg form-control-borderless"
            type="text"
            placeholder="Search username "
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button
            className="btn btn-lg btn-success"
            type="submit"
            onSubmit={handleSubmit}
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
