module.exports = {
  env: process.env.APP_ENV,
  mongoose: {
    url: process.env.MONGO_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
  },
  port: process.env.PORT || 5000,
};
