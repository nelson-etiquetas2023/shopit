class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            nameProduct: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        }:{}

        this.query = this.query.find({ ...keyword});
        return this;
    }

    filter() {

        const queryCopy = { ...this.queryStr };
        //Removing fields from the query.
        const removeFields = ['keyword','limit', 'page'];

        removeFields.forEach(el => delete queryCopy[el]);
 
        // filtros avanzados por intervalos de precios y rating.
        let queryStr = JSON.stringify(queryCopy);
        
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;

    
    }



}

export default APIFeatures;