import express from 'express';

const router = express.Router();
const indexTemplate = require("./templates/index.pug");

router.get('/', (req, res) => {
    res.send(indexTemplate({
        title: 'ikea-basket'
    }));
});

export default router;
