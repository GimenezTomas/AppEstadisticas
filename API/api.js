"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var admin = require("firebase-admin");
var firebaseConfig = {
    apiKey: "AIzaSyBQbpoFlzGOq17W6VtslOy9XE6dLY-nStQ",
    authDomain: "appestadisticas-888ea.firebaseapp.com",
    projectId: "appestadisticas-888ea",
    storageBucket: "appestadisticas-888ea.appspot.com",
    messagingSenderId: "48821201636",
    appId: "1:48821201636:web:68bc816fea48dc25015af1",
    measurementId: "G-5CZNCPVWCQ"
};
var serviceAccount = require("./appestadisticas-888ea-firebase-adminsdk-pwap4-86dc2558cd.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://appestadisticas-888ea-default-rtdb.firebaseio.com"
});
var express = require('express');
var app = express();
var port = 3000;
function getNombresEquipos(idClub) {
    var nombres = [];
    admin.firestore().collection("clubes").doc(idClub).collection('equipos')
        .get()
        .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            nombres.push(doc.id);
        });
    })["catch"](function (error) {
        console.log("Error getting documents: ", error);
    });
    return nombres;
}
app.get('/', function (req, res) {
    res.send('Bienvenido a nuestra Api de Estadisticas!');
});
app.listen(port, function () {
    console.log("App listening at http://localhost:" + port);
});
app.get('/clubes', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var snapshot, clubes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, admin.firestore().collection("clubes").get()];
            case 1:
                snapshot = _a.sent();
                clubes = [];
                if (snapshot.empty) {
                    res.json("No hay Clubes ingresados");
                }
                return [4 /*yield*/, snapshot.forEach(function (doc) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            clubes.push(doc.data().nombre);
                            return [2 /*return*/];
                        });
                    }); })];
            case 2:
                _a.sent();
                res.json(clubes);
                return [2 /*return*/];
        }
    });
}); });
app.get("/:id_club/equipos", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idClub, snapshot, teams, clubes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idClub = req.params.id_club;
                return [4 /*yield*/, admin.firestore().collection("clubes").doc(idClub).collection("equipos").get()];
            case 1:
                snapshot = _a.sent();
                teams = [];
                clubes = [];
                return [4 /*yield*/, snapshot.forEach(function (doc) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            teams.push(doc.id);
                            return [2 /*return*/];
                        });
                    }); })];
            case 2:
                _a.sent();
                res.json(teams);
                return [2 /*return*/];
        }
    });
}); });
app.get('/estadisticas/:id_club/jugadores', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idClub, snapshot, clubes, stats;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idClub = req.params.id_club;
                return [4 /*yield*/, admin.firestore().collection("clubes").get()];
            case 1:
                snapshot = _a.sent();
                clubes = [];
                stats = new Map();
                return [4 /*yield*/, snapshot.forEach(function (doc) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (doc.id == idClub) {
                                clubes.push(doc.data().jugadores);
                                clubes.forEach(function (x) {
                                    x.forEach(function (y) {
                                        stats.set(y.apellido, y.estadisticas);
                                    });
                                });
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            case 2:
                _a.sent();
                console.log(stats);
                return [2 /*return*/];
        }
    });
}); });
app.get('/estadisticas/:id_club/:id_equipo', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idClub, idEquipo, snapshot, stats;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idClub = req.params.id_club;
                idEquipo = req.params.id_equipo;
                return [4 /*yield*/, admin.firestore().collection("clubes").doc(idClub).collection("equipos").get()];
            case 1:
                snapshot = _a.sent();
                stats = [];
                return [4 /*yield*/, snapshot.forEach(function (doc) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (doc.id == idEquipo) {
                                stats.push(doc.data().estadisticasGenerales);
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            case 2:
                _a.sent();
                res.json(stats);
                return [2 /*return*/];
        }
    });
}); });
app.get('/:id_club/entrenadores', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idClub, snapshot, entrenadores;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idClub = req.params.id_club;
                return [4 /*yield*/, admin.firestore().collection("clubes").get()];
            case 1:
                snapshot = _a.sent();
                entrenadores = [];
                return [4 /*yield*/, snapshot.forEach(function (doc) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (doc.id == idClub) {
                                entrenadores.push(doc.data().entrenadores);
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            case 2:
                _a.sent();
                res.json(entrenadores);
                return [2 /*return*/];
        }
    });
}); });
