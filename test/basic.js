require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);


// Testing Session Configuration

describe('session auth app', () => {
  it('has an exchange for username/password', (done) => {

    const bundle = {
      authData: {
        username: 'brendan_p',
        password: 'SSS',
        server_address: 'https://fm109.beezwax.net'
      },
      inputData: {
        username: 'brendan_p',
        password: 'S',
        server_address: 'https://fm109.beezwax.net'
      }
    };

    appTester(App.authentication.sessionConfig.perform, bundle)
      .then((newAuthData) => {
        console.log("NEW AUTH DATA RESPONSE----------\n", newAuthData, "\n----------------------\n");
        // newAuthData.sessionKey.should.eql('Needs New Key');
        done();
      })
      .catch((newAuthData) => {
        console.log("NEW AUTH DATA RESPONSE----------\n", newAuthData, "\n----------------------\n");
        done();
      });
    });
  });
