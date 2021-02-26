import React, { useCallback, useState } from 'react';
import Helmet from 'react-helmet';
import Search from '../../components/Search';
import CardUser, { IUser } from '../../components/CardUser';
import Users from '../../services/Users';
import './styles.css';
import Footer from '../../components/Footer';

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
      <Helmet>
        <title>Search User Github</title>
        <meta name="author" content="Anna Rafaela" />
        <meta name="description" content="search users github use API REST" />
        <meta http-equiv="content-language" content="pt-br, en-US" />
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
        <meta name="copyright" content="© 2021 Anna18921" />
        <meta
          name="keywords"
          content="site, web, javascript, github, api, v3, rest, development, test, mocha"
        />
      </Helmet>
      <div className="container-fluid h-100 bg-dark">
        <header>
          <div className="d-flex flex-column align-items-center w-100 h-100 text-center text-white ">
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
        <Footer position="fixed-bottom" />
      </div>
    </body>
  );
};

export default Home;
