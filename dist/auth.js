"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.createJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//create token and cookie
var createJWT = function (user, res, req) {
    // make a cookie signed by JWT_SECRET
    var token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    //make cookie with name - "token" so I can get the value easily and expires in 3 days
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30 * 6 * 1000, // 6 months
        sameSite: 'none',
        secure: true, // Set to false when not using HTTPS (localhost development)
        path: '/',
    });
    return token;
};
exports.createJWT = createJWT;
var protect = function (req, res, next) {
    // find the token
    var token = req.cookies['token'];
    try {
        // verify if there is a token like that or not
        var user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    catch (e) {
        console.log(e + '   this is the error!');
        res.json({ message: 'nvt' });
        return;
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.js.map