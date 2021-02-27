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
      company: '';
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

    if (result.ok && !!result.data[0]) {
      setTitle(`Repositories - ${location.state.user.login}`);
      setReposUser(result.data);
    } else {
      if (!result.data[0]) {
        setMessage('Repositories list  empty');
      } else {
        setMessage('Repositories not found');
      }
    }

    setLoading(false);
  }, [location.state.user.login]);

  const handleReposStarred = useCallback(async () => {
    setLoading(true);
    setMessage('');
    const result = await Users.getStarred({
      username: location.state.user.login,
    });
    if (result.ok && !!result.data[0]) {
      setTitle(`Repositories Starred `);
      setReposUser(result.data);
    } else {
      if (!result.data[0]) {
        setMessage('Repositories list starred empty');
      } else {
        setMessage('Starred repositories not found');
      }
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
            <div className="section row align-items-center w-75">
              <div className="imge-profile">
                <img
                  className=" rounded-circle"
                  src={user?.avatar_url}
                  title={user?.name}
                  alt="Avatar user"
                />
              </div>
              <div className="about">
                <h3 className="text-left mt-5">{user?.name}</h3>
                <div className="info ">
                  <h6>
                    <strong>Username:</strong> {user?.login}{' '}
                  </h6>

                  {user?.location && (
                    <h6>
                      <strong>Location:</strong> {user?.location}
                    </h6>
                  )}

                  {user?.company && (
                    <h6>
                      <strong>Company:</strong> {user?.company}
                    </h6>
                  )}

                  <div className="bio">
                    {user?.bio && (
                      <p className="bio-p">
                        <strong>Biografia: </strong> {user?.bio}
                      </p>
                    )}
                  </div>
                </div>
                <div className="buttons row ">
                  <button
                    className="btn  btn-success button"
                    onClick={handleRepos}
                  >
                    Respositories
                  </button>
                  <button
                    className="btn btn-success  button"
                    onClick={handleReposStarred}
                  >
                    Starred
                  </button>
                  <a
                    href={user?.html_url}
                    target="blank"
                    className="btn btn-success  button"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
            <div className="count mt-3">
              <div className="row">
                <div className=" count-item ">
                  <div className="text-center count-item ">
                    <h6 className="h2">{user?.public_repos}</h6>
                    <p className="m-0px font-w-600">Respositories</p>
                  </div>
                </div>

                <div className="  count-item">
                  <div className="text-center ">
                    <h6 className="h2">{user?.followers}</h6>
                    <p className="m-0px font-w-600">Followers</p>
                  </div>
                </div>
                <div className=" count-item">
                  <div className="text-center ">
                    <h6 className="h2">{user?.following}</h6>
                    <p className="m-0px font-w-600">Following</p>
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
            {reposUser?.length && !loading && !message ? (
              <h3 className="text-white my-5 ">{title}</h3>
            ) : (
              <div className="d-flex justify-content-center">
                <h5 className="text-white my-5 ">{message}</h5>
              </div>
            )}
            <div>
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
        <footer>
          <Footer position={reposUser && !message ? '' : 'fixed-bottom'} />
        </footer>
      </div>
    </body>
  );
};

export default User;
