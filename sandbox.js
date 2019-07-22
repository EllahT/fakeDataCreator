const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const UtilService = require('./util.service')
const UserService = require('./user.service')
const ImageService = require('./image.service')
const dbService = require('./db.service')

const cities = _createCities();

const tempArray = [];

let allUsers = _createAllUsers();

//add password (hashed) and username, add location: {lat: lng: }, add profileImg based on gender
//adding users fron tempArray and from DB to file
// tempArray.forEach(user => {
//     allUsers.push(user);
//     console.log(allUsers.length);
//     _saveToFile()
//     .then(() => {
//         console.log('done');
//     })
// })

// UserService.query()
// .then(users => {
//     users.forEach(user => {
//         allUsers.push(user);
//         console.log(allUsers.length);
//         _saveToFile()
//         .then(() => {
//             console.log('done');
//         })
//     })
// })


// adding hashed password and username to each user
// allUsers.forEach((user, index) => {
//     let password = user.name.first.toLocaleLowerCase()+user.name.last.toLowerCase();
//     let username = user.name.first+user.name.last;
//     bcrypt.hash(password, saltRounds)
//     .then(hash => {
//         user.password = hash;
//         user.username = username;
//         if (user._id) delete user._id;
//         _saveToFile()
//             .then(() => {
//                 console.log('done');
//             })
//     })
// })

//adding randomlocation based on cities
// allUsers.forEach((user, index) => {
//     let idx = UtilService.getRandomInt(0, cities.length-1);
//     let randGeo = UtilService.getRandomGeo(cities[idx].coords, 5000);
//     user.location = randGeo;
//     _saveToFile()
//     .then(() => {
//         console.log('done');
//     })
// }) 

//add profileImg based on gender
// allUsers.forEach(user => {
//     ImageService.getRandomImage(user.gender)
//     .then(imgSrc => {
//         user.profileImg = imgSrc;
//         _saveToFile()
//     })
// })


//checking if all users have profileImg
// var counter = 0;
// allUsers.forEach(user => {
//     if (!user.profileImg) counter++;
// })
// console.log(counter);

//fix cities to be address: {city, country}
// cities.forEach(place => {
//     let addressArr = place.address. split(', ');
//     place.address = {city: addressArr[0], country: addressArr[1]};
//     console.log(place);
//     _saveCitiesToFile()
//     .then(() => {
//         console.log('done');
//     })
// })


//change residance for users, based on cities
// allUsers.forEach(user => {
//     let idx = UtilService.getRandomInt(0, cities.length-1);
//     user.residance = cities[idx].address;
//     _saveToFile()
//     .then(() => {
//         console.log('done');
//     })
// })

// adding users to DB
// dbService.connect()
// .then(() => {
//     allUsers.forEach((user, index) => {
//         UserService.add(user)
//         console.log(index)
//     })
// })

function _saveToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile("./newUsers.json", JSON.stringify(allUsers), (err) => {
            if (err) {
                return reject(err)
            }
            resolve()
        });

    })
}

function _saveCitiesToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile("./cities.json", JSON.stringify(cities), (err) => {
            if (err) {
                return reject(err)
            }
            resolve()
        });

    })
}

function _createAllUsers() {
    return require('./newUsers.json');
}

function _createCities() {
    return require('./cities.json');
}

const jsonCreater = [
    {
    'repeat(100)': {
        name: {
            first: '{{firstName()}}',
            last: '{{surname()}}'
        },
        isAdmin: '{{bool()}}',
        email() {
            return `${this.name.first}.${this.name.last}@gmail.com`.toLowerCase();
        },
        gender: '{{random("man", "woman", "other")}}',
        galleryImgs: [{
            'repeat(3)': {
                picture: 'http://placehold.it/32x32'
            }
        }],
        birthDate: '{{integer(1945, 2000)}}',
        description: '{{lorem(1, "paragraphs")}}',
        registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
        lastConnected: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
        residance: {
            city: '{{random("Afula", "Tel Aviv",  "Jerusalem")}}',
            country: '{{random("Jordan", "Germany", "USA")}}'
        },
        travelTypes: ['{{random("trek", "hike", "climb", "light", "sightseeing")}}'],
        bucketList: ['{{random("Thailand", "Spain", "Singapore", "Seoul", "New Zealand")}}'],
    }
}]