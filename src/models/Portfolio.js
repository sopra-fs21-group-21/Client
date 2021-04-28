/**
 * Portfolio model
 */
class Portfolio {
    constructor(data = {}) {
        this.cash = null;
        this.traders = null;
        this.owner = null;
        this.portfolioName = null;
        this.id = null;
        Object.assign(this, data);
    }
}
export default Portfolio;
