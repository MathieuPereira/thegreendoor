module.exports = {
    filterInputs: function (inputs, i, productsQuery) {
        switch (i) {
            case 0:
                if (inputs[i] === 'true' || inputs[i] === 'online')
                    productsQuery.isOnline = true;
                 else if (inputs[i] === 'false' || inputs[i] === 'offline')
                    productsQuery.isOnline = false;
                break;
            case 1:
                productsQuery.category = inputs[i];
                break;
            case 2:
                if (inputs[3] && inputs[3] !== " ") {
                    let stocks = {$gte: inputs[2], $lte: inputs[3]};
                    productsQuery.stock = stocks;
                }
                break;
        }
        return productsQuery;
    }
};