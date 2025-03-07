const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    console.log('---- logged in user detail ---', req.user);
    res.status(200).json([
        {
            name: "mob",
            price: 28000
        },
        {
            name: "tv",
            price: 30000
        },
        {
            name:"Books",
            price:1500
        }
    ])
});

module.exports = router;