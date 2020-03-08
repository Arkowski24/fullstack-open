const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1)
}

const password = process.argv[2];
const url =
    `mongodb+srv://fullstack:${password}@cluster0-yqkka.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length > 4) {
    const name = process.argv[3];
    const number = process.argv[4];

    new Person({name, number})
        .save()
        .then(result => {
            console.log(`added ${name} number ${number} to phonebook`);
            mongoose.connection.close()
        })
} else {
    Person
        .find({})
        .then(persons => {
            console.log('phonebook:');
            persons.forEach(person => console.log(`${person.name} ${person.number}`));
            mongoose.connection.close();
        })
}
