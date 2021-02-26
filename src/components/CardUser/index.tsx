import { useCallback } from 'react';
import { useHistory } from 'react-router';
import './styles.css';

export interface IUser {
  id: number;
  name: string;
  login: string;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  location: string;
  bio: string;
  public_repos: number;
}

interface IPropsUser {
  user: IUser;
}

const CardUser = ({ user }: IPropsUser) => {
  const history = useHistory();

  return (
    <div className=" mx-auto  mt-5">
      <div className="card">
        <div className="card-body">
          <img
            src={user.avatar_url}
            alt="avatar user"
            className="float-left rounded-circle w-25 mr-5"
          />
          <div className="message ">
            <h5 className="card-title ">{user.name}</h5>
            <h6 className="card-subtitle mb-3 text-muted">
              Username: {user.login}
            </h6>
            <h6 className="card-subtitle mb-3 text-muted">
              Location: {user.location}
            </h6>
          </div>
          <div className="actions">
            <button
              className="btn btn-success btn-sm mr-2"
              onClick={() =>
                history.push({
                  pathname: '/user',
                  search: 'repositories',
                  state: { user },
                })
              }
            >
              Repositories
            </button>
            <button
              className="btn btn-success btn-sm mr-2"
              onClick={() =>
                history.push({
                  pathname: '/user',
                  search: 'starred',
                  state: { user },
                })
              }
            >
              Starred
            </button>
            <button
              className="btn btn-success btn-sm card-link"
              onClick={() =>
                history.push({
                  pathname: '/user',
                  state: { user },
                })
              }
            >
              Detalhes
            </button>{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUser;
