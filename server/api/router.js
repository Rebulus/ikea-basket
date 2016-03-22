import express from 'express';
import product from './product';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' })
});

router.route('/:locale/:lang/products/:productNumber')
    .get((req, res) => {
        const { locale, lang, productNumber } = req.params;
        product.get({ locale, lang, productNumber })
            .then(
                (data) => res.json(data),
                (data) => res.json(data)
            );
    });

export default router;
