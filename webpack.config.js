import Dotenv from 'dotenv-webpack';

const envPath = process.env.NODE_ENV === 'prod' ? '.env' : '.env.local';

export default {
  // ...
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, envPath)
    })
  ]
};
