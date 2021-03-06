
const express = require('express');

const db = require('./db.js')
db.sequelize.sync({ force: true }).then(function () {
    inicializacija().then(function () {
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        //process.exit();
    });
});

function inicializacija() {

        var osobljeListaPromisea = [];
        var terminListaPromisea = [];
        var rezervacijaListaPromisea = [];
        var salaListaPromisea = [];

        return new Promise(function (resolve, reject) {

            osobljeListaPromisea.push(db.osoblje.create({ ime: 'Neko', prezime: 'Nekić', uloga: 'profesor' }).then(function(k){
                return new Promise(function(resolve,reject){resolve(k);});
            }));
            osobljeListaPromisea.push(db.osoblje.create({ ime: 'Drugi', prezime: 'Neko', uloga: 'asistent' }).then(function(k){
                return new Promise(function(resolve,reject){resolve(k);});
            }));
            osobljeListaPromisea.push(db.osoblje.create({ ime: 'Test', prezime: 'Test', uloga: 'asistent' }).then(function(k){
                return new Promise(function(resolve,reject){resolve(k);});
            }));

            Promise.all(osobljeListaPromisea).then(function (osoblje) {

                salaListaPromisea.push(db.sala.create({ naziv: '1-11', zaduzenaOsoba:1}).then(function(k){
                    return new Promise(function(resolve,reject){resolve(k);});
                }));
                salaListaPromisea.push(db.sala.create({ naziv: '1-15', zaduzenaOsoba:2}).then(function(k){
                    return new Promise(function(resolve,reject){resolve(k);});
                }));


                Promise.all(salaListaPromisea).then(function (sale) {

                    terminListaPromisea.push(db.termin.create({ redovni: 'false', dan: null, datum: '01.01.2020', semestar: null, pocetak: '12:00', kraj: '13:00' }).then(function(k){
                        return new Promise(function(resolve,reject){resolve(k);});
                    }));
                    terminListaPromisea.push(db.termin.create({ redovni: 'true', dan: 0, datum: null, semestar: 'zimski', pocetak: '13:00', kraj: '14:00' }).then(function(k){
                        return new Promise(function(resolve,reject){resolve(k);});
                    }));

                    Promise.all(terminListaPromisea).then(function (termini) {

                        rezervacijaListaPromisea.push(db.rezervacija.create({ termin: 1, sala: 1, osoba: 1 }).then(function(k){
                            return new Promise(function(resolve,reject){resolve(k);});
                        }));
                        rezervacijaListaPromisea.push(db.rezervacija.create({ termin: 2, sala: 1, osoba: 3 }).then(function(k){
                            return new Promise(function(resolve,reject){resolve(k);});
                        }));
                        
                        Promise.all(rezervacijaListaPromisea).then(function (b) { resolve(b); }).catch(function (err) { console.log("Rezervacija greska " + err); });

                    }).catch(function (err) { console.log("Termini greska " + err); });

                }).catch(function (err) { console.log("Sale greska " + err); });

            }).catch(function (err) { console.log("Osoblje greska " + err); });

        });
}
