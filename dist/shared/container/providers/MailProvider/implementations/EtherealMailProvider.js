"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EtherealMailProvider = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _tsyringe = require("tsyringe");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let EtherealMailProvider = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class EtherealMailProvider {
  constructor() {
    _nodemailer.default.createTestAccount().then(account => {
      const transporter = _nodemailer.default.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      this.client = transporter;
    }).catch(err => console.log(err));
  }

  async sendMail(to, subject, variables, path) {
    const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");

    const templateParse = _handlebars.default.compile(templateFileContent);

    const templateHTML = templateParse(variables);
    const message = {
      to,
      from: "Rentx <noreplay@rentx.com.br>",
      subject,
      html: templateHTML
    }; // eslint-disable-next-line consistent-return

    this.client.sendMail(message, (err, info) => {
      if (err) {
        console.log(`Error occurred. ${err.message}`);
        return null
        /* process.exit(1) */
        ;
      }

      console.log("Message sent: %s", info.messageId); // Preview only available when sending through an Ethereal account

      console.log("Preview URL: %s", _nodemailer.default.getTestMessageUrl(info));
    });
  }

}) || _class);
exports.EtherealMailProvider = EtherealMailProvider;