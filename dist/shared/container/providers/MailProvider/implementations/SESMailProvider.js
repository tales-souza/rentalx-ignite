"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SESMailProvider = void 0;

var _awsSdk = require("aws-sdk");

var _fs = _interopRequireDefault(require("fs"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _tsyringe = require("tsyringe");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SESMailProvider = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class SESMailProvider {
  constructor() {
    this.client = _nodemailer.default.createTransport({
      SES: new _awsSdk.SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION
      })
    });
  }

  async sendMail(to, subject, variables, path) {
    const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");

    const templateParse = _handlebars.default.compile(templateFileContent);

    const templateHTML = templateParse(variables);
    const message = {
      to,
      from: "Rentx <tales.monteiro@tmrentx.com>",
      subject,
      html: templateHTML
    }; // eslint-disable-next-line consistent-return

    this.client.sendMail(message, (err, info) => {
      if (err) {
        console.log(`Error occurred. ${err.message}`); // eslint-disable-next-line no-useless-return

        return null
        /* process.exit(1) */
        ;
      }
    });
  }

}) || _class);
exports.SESMailProvider = SESMailProvider;