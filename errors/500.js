class custom500 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.name = "Bad request!";
  }
}

module.exports = custom500;
