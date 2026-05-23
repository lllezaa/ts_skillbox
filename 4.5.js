class User {
    static userName;
    #surname;
    #age;

    constructor(userName, surname, age) {
        User.userName = userName;
        this.#age = age;
        this.#surname = surname;
    }

    setAge(age) {
        this.#age = age;
    }

    getAge() {
        return this.#age;
    }
}
