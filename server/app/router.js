import express from 'express';

const router = express.Router();
const indexTemplate = require("./templates/index.jade");

router.get('/', (req, res) => {
    res.send(indexTemplate({
        title: 'ikea-basket'
    }));
});

export default router;
