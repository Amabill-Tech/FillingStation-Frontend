import APIs from './api';

const ProductService = {

    createProductOrder: (data) => {
        return APIs.post('/product-order/create', data)
        .then(({data}) => {
            return data.product;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },

    getAllProductOrder: (data) => {
        return APIs.post('/product-order/allRecords', data)
        .then(({data}) => {
            return data.product;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },
}

export default ProductService;