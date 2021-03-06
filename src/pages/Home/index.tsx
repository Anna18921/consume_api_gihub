import React, { useCallback, useState } from 'react';
import Users from '../../services/Users';
import { CardUser, Footer, Search } from '../../components';
import { IUser } from '../../components/CardUser';
import './styles.css';
import Image from '../../assets/images/githublogo.jpg';
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser>();
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback(async (username: string) => {
    setLoading(true);
    setMessage('');

    const result = await Users.getUser({
      username,
    });

    if (result.ok) {
      setUser(result.data);
    } else {
      setMessage('User not found');
    }

    setLoading(false);
  }, []);

  return (
    <body>
      <div className="container-fluid h-100 bg-dark">
        <header>
          <div className="d-flex flex-column align-items-center w-100 h-100 text-center text-white ">
            <img className="mt-5" src={Image} width="150" height="150" alt="" />
            <h1 className="display-5  mt-5">Search user github</h1>
            <br />

            <Search submit={(termSearch: string) => handleSubmit(termSearch)} />

            {loading && (
              <div className="spinner-border text-success mt-5" role="status" />
            )}
          </div>
        </header>
        <section className="d-flex justify-content-center row p-2">
          {user && !message ? (
            <CardUser user={user} />
          ) : (
            <h5 className="text-white my-5 ">{message}</h5>
          )}
        </section>
        <footer>
          <Footer position={user && !message ? '' : 'fixed-bottom'} />
        </footer>
      </div>
    </body>
  );
};

export default Home;
