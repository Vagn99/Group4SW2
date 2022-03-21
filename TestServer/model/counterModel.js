class CountNumber {
    #count;
    constructor(){
        this.#count = 0;
    }
    getCount(){
        return this.#count;
    }
    incrementCount(){
        this.#count++;
    }
}

module.exports = {
    CountNumber,
};