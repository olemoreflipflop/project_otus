import { faker } from '@faker-js/faker';

export function createOrderInfo() {
    const randomFutureDate = faker.date.future(5);
    const personalInfo = {
        data: {
            name: faker.name(),
            country: faker.address.country(),
            city: faker.address.cityName(),
            creditCard: faker.finance.creditCardNumber(),
            month: 1 + randomFutureDate.getMonth(),
            year: randomFutureDate.getFullYear(),
        },
        getData() {
            return this.data
        },
    }
    return personalInfo;
}

export function createUserData() {
    const user = {
        data: {
            userName: faker.internet.userName(),
            password: faker.internet.password(32, false, /[a-zA-Z0-9!@#$%^&*]/),
        },
        getData() {
            return this.data
        },
    }
    return user;
}