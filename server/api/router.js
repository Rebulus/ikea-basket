import express from 'express';
import product from './product';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' })
});

router.route('/:locale/:lang/products/:productNumber')
    .get((req, res) => {
        product.get(req.params)
            .then(
                (data) => res.json(data),
                (data) => res.status(404).json(data)
            );
    });

export default router;
