const axios = require('axios');

exports.renderIndex = (req, res) => {
  res.render('index');
};

exports.redirectToGithubAuth = (req, res) => {
  const baseUrl = 'https://github.com/login/oauth/authorize';
  const queryParams = new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.CALLBACK_URL,
    scope: 'user'
  });
  const authUrl = `${baseUrl}?${queryParams}`;
  res.redirect(authUrl);
};

exports.handleGithubAuthCallback = async (req, res) => {
  const { code } = req.query;
  try {
    const { data } = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: code
    }, {
      headers: {
        Accept: 'application/json'
      }
    });
    const accessToken = data.access_token;
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`
      }
    });
    const userData = response.data;
    req.session.userData = userData;
    res.redirect('/success');
  } catch (error) {
    res.status(500).render('error');
  }
};

exports.renderSuccessPage = (req, res) => {
  const userData = req.session.userData;
  if (userData) {
    res.render('success', { userData });
  } else {
    res.redirect('/');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
