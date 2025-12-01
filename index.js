const express = require('express');
const app = express();

app.use(express.json());

// ==================================== Daftar Al-Quran ====================================
const alquranData = require('./data/daftar_quran.json');
const { request } = require('http');

app.get('/alquran', (request, response) => {
    response.json(alquranData);
});

// ==================================== Al-Quran ====================================

app.get('/alquran/:id', (request, response) => {
    const id = request.params.id;
    const surah = require(`./data/surah/${ id }.json`);
    response.json(surah);
});

// ==================================== Asmaul Husna ====================================

const asmaulHusna = require('./data/asmaul_husna.json');

app.get('/asmaul_husna', (request, response) => {
    response.json(asmaulHusna);
});

// ==================================== Doa Harian ====================================

const doaHarian = require('./data/doa_harian.json');

app.get('/doa_harian', (request, response) => {
    response.json(doaHarian);
});

// ==================================== Niat Solat ====================================

const niatSolat = require('./data/niat_solat.json');

app.get('/niat_solat', (request, response) => {
    response.json(niatSolat);
});

// ==================================== Bacaan SOlat ====================================

const bacaanSolat = require('./data/bacaan_solat.json');

app.get('/bacaan_solat', (request, response) => {
    response.json(bacaanSolat);
});

// ==================================== Tahlil ====================================

const tahlil = require('./data/tahlil.json');

app.get('/tahlil', (request, response) => {
    response.json(tahlil);
});

// ==================================== PORT Config ===================================

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

