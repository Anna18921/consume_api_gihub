import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardRepos, { IRepos } from '../../components/CardRepos';
import { IUser } from '../../components/CardUser';
import Users from '../../services/Users';
import './styles.css';
import Footer from '../../components/Footer';

const User = () => {
  const { goBack, location } = useHistory<{
    user: {
      id: 0;
      name: '';
      login: '';
      avatar_url: '';
      html_url: '';
      followers: 0;
      following: 0;
      location: '';
      bio: '';
      public_repos: 0;
    };
  }>();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState<IUser>();
  const [reposUser, setReposUser] = useState<IRepos[]>();
  const [message, setMessage] = useState('');

  const handleRepos = useCallback(async () => {
    setLoading(true);
    setMessage('');
    const result = await Users.getRepos({
      username: location.state.user.login,
    });
    if (result.ok) {
      setTitle(`Repositories - ${location.state.user.login}`);
      setReposUser(result.data);
    } else {
      setMessage('Repositories not found');
    }

    setLoading(false);
  }, [location.state.user.login]);

  const handleReposStarred = useCallback(async () => {
    setLoading(true);
    setMessage('');
    const result = await Users.getStarred({
      username: location.state.user.login,
    });
    if (result.ok) {
      setTitle(`Repositories Starred `);
      setReposUser(result.data);
    } else {
      setMessage('Starred repositories not found');
    }

    setLoading(false);
  }, [location.state.user.login]);

  useEffect(() => {
    const { user } = location.state;

    if (location.search.includes('repositories')) {
      handleRepos();
    }

    if (location.search.includes('starred')) {
      handleReposStarred();
    }
    setUser(user);
  }, [location, handleReposStarred, handleRepos]);

  return (
    <body>
      <div className="container-fluid vh-100 ">
        <section className="section ">
          <div className="profile container text-light shadow-lg p-3 mb-5  rounded">
            <div className="section-about row align-items-center w-75">
              <div className="imge-profile col-6">
                <img
                  className=" rounded-circle w-75"
                  src={user?.avatar_url}
                  title={user?.name}
                  alt="Avatar user"
                />
              </div>
              <div className="about">
                <h3>{user?.name}</h3>
                <div className="info ">
                  <h6 className="lead">Username: {user?.login} </h6>

                  <h6 className="lead "> Location: {user?.location}</h6>
                </div>
                <div className="buttons row ">
                  <button
                    className="btn  btn-success button"
                    onClick={handleRepos}
                  >
                    Respos
                  </button>
                  <button
                    className="btn btn-success  button"
                    onClick={handleReposStarred}
                  >
                    starred
                  </button>
                  <a
                    href={user?.html_url}
                    target="blank"
                    className="btn btn-success  button"
                  >
                    Open GitHub
                  </a>
                </div>
              </div>
            </div>
            <div className="count mt-3">
              <div className="row">
                <div className="col-md-4  count-item">
                  <div className="text-center ">
                    <h6 className="h2">{user?.followers}</h6>
                    <p className="m-0px font-w-600">Followers</p>
                  </div>
                </div>
                <div className="col-md-4 count-item">
                  <div className="text-center ">
                    <h6 className="h2">{user?.following}</h6>
                    <p className="m-0px font-w-600">Following</p>
                  </div>
                </div>
                <div className="col-md-4 count-item ">
                  <div className="text-center count-item ">
                    <h6 className="h2">{user?.public_repos}</h6>
                    <p className="m-0px font-w-600">Respos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container ">
            <button className="btn btn-link" onClick={() => goBack()}>
              <h4 className="text-white ">Go Back</h4>
            </button>
            {reposUser && !loading && !message ? (
              <h3 className="text-white my-5 ">{title}</h3>
            ) : (
              <div className="d-flex justify-content-center">
                <h5 className="text-white my-5 ">{message}</h5>
              </div>
            )}
            <div className="px-5 ">
              {reposUser && !loading && !message ? (
                reposUser.map((item: IRepos) => {
                  return <CardRepos key={item.id} card={item} />;
                })
              ) : (
                <div className="loading d-flex justify-content-center">
                  {loading && (
                    <div
                      className=" spinner-border text-success  mb-5"
                      role="status"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </body>
  );
};

export default User;
