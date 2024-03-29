/* eslint-disable no-undef */
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL,
  userName: process.env.TEST_LOGIN,
  password: process.env.TEST_PASSWORD,
};
