// middlewares/auth.js
function isAuthenticated(req, res, next) {
    if (!req.session || !req.session.user) {  // Vérifie d'abord que la session existe
      return res.redirect('/login.html');
    }
    next();
  }  
  
  function isAdmin(req, res, next) {
    if (req.session.user?.role !== 'admin') {
      return res.status(403).send('Accès refusé, vous devez être un administrateur pour accéder à cette page.');
    }
    next();
  }
  
  function isClub(req, res, next) {
    if (req.session.user?.role !== 'club') {
      return res.status(403).send('Accès club requis.');
    }
    next();
  }

  function isAdminOrClub(req, res, next) {
    if (!req.user) {
      return res.status(401).send('Utilisateur non authentifié');
    }
  
    // Autorise à la fois les utilisateurs admins et clubs
    if (req.user.role !== 'admin' && req.user.role !== 'club') {
      return res.status(403).send('Accès interdit, vous devez être un admin ou un club');
    }
  
    next();
  }
  
  
  module.exports = { isAuthenticated, isAdmin, isClub, isAdminOrClub};
  