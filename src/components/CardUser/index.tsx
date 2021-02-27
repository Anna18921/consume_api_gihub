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
  public_repos: number;
  company: string;
  bio: string;
}

interface IPropsUser {
  user: IUser;
}

const CardUser = ({ user }: IPropsUser) => {
  const history = useHistory();

  return (
    <div className="mt-5">
      <div className="mx-auto card-user card shadow-lg mb-5  rounded bg-dark">
        <div className="card-body">
          <img
            src={user.avatar_url}
            alt="avatar user"
            className="float-top rounded-circle w-25 mr-5"
          />
          <div className="message mt-4 ">
            <h5 className="card-title text-light ">{user.name}</h5>
            <h6 className="card-subtitle text-light mb-3">
              Username: {user.login}
            </h6>
            {user.location && (
              <h6 className="card-subtitle text-light mb-3">
                Location: {user.location}
              </h6>
            )}
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
