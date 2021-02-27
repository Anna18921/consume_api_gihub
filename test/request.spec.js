var chai = require('chai');
var chaiHttp = require('chai-http');
const baseUrl = 'https://api.github.com/users/';
const username = 'Anna18921';
chai.use(chaiHttp);

describe('Test Endpoints API Github V3', () => {
  it('should  GET user by username', (done) => {
    chai
      .request(baseUrl)
      .get(username)
      .end(function (err, res) {
        chai.expect(res.statusCode).to.equal(200);
        chai.should(res.body);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body.name).to.be.a('string');
        chai.expect(res.body.login).to.be.a('string');
        chai.expect(res.body.avatar_url).to.be.a('string');
        chai.expect(res.body.followers).to.be.a('number');
        chai.expect(res.body.location).to.be.a('string');
        chai.expect(res.body.bio).to.be.a('string');
        chai.expect(res.body.company).to.be.a('string');
        chai.expect(res.body.public_repos).to.be.a('number');

        done();
      });
  });

  it('must GET repositories GitHub User if there are any repositories', (done) => {
    chai
      .request(baseUrl)
      .get(`${username}/repos`)
      .end(function (err, res) {
        chai.expect(res.statusCode).to.equal(200);
        chai.should(res.body[0]);
        chai.expect(res.body).to.be.a('array');
        chai.expect(res.body[0].id).to.be.a('number');
        chai.expect(res.body[0].name).to.be.a('string');
        chai.expect(res.body[0].private).to.be.a('boolean');
        chai.expect(res.body[0].html_url).to.be.a('string');
        chai.expect(res.body[0].description).to.be.a('string');
        chai.expect(res.body[0].fork).to.be.a('boolean');
        chai.expect(res.body[0].stargazers_count).to.be.a('number');

        done();
      });
  });

  it('GET repositories starred GitHub', (done) => {
    chai
      .request(baseUrl)
      .get(`${username}/starred`)
      .end(function (err, res) {
        chai.expect(res.statusCode).to.equal(200);
        chai.should(res.body[0]);
        chai.expect(res.body).to.be.a('array');
        chai.expect(res.body[0].id).to.be.a('number');
        chai.expect(res.body[0].name).to.be.a('string');
        chai.expect(res.body[0].private).to.be.a('boolean');
        chai.expect(res.body[0].html_url).to.be.a('string');
        chai.expect(res.body[0].description).to.be.a('string');
        chai.expect(res.body[0].fork).to.be.a('boolean');
        chai.expect(res.body[0].stargazers_count).to.be.a('number');
        done();
      });
  });
});
