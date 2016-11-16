/**
 * Created by rande on 11/13/2016.
 */
// global variables for the application
module.exports = {
    db: 'mongodb://localhost/randeep',
    secret: 'UseThis to create Salt 123',
    ids: {
        facebook: {
            clientID: '333643726992452',
            clientSecret: '137f46a95e31fe96f3f4a0c9417bb79f',
            callbackURL: 'http://localhost:3000/facebook/callback'
        },
        github: {
            clientID: 'c8c42e4c1fa00c878b76',
            clientSecret: '858e20f820e083a4e7a124c654f9871e733fcdea',
            callbackURL: 'http://localhost:3000/github/callback'
        }
    }
    //db: 'mongodb://uname:pass@ds048319.mlab.com:48319/comp2068-thu'
};
