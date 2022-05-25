"use strict";

var _tsyringe = require("tsyringe");

var _DayJsDateProvider = require("./DateProvider/implementations/DayJsDateProvider");

var _EtherealMailProvider = require("./MailProvider/implementations/EtherealMailProvider");

var _SESMailProvider = require("./MailProvider/implementations/SESMailProvider");

var _LocalStorageProvider = require("./StorageProvider/implementations/LocalStorageProvider");

var _S3StorageProvider = require("./StorageProvider/implementations/S3StorageProvider");

_tsyringe.container.registerSingleton("DayJsDateProvider", _DayJsDateProvider.DayJsDateProvider);

const mailProvider = {
  ethereal: _tsyringe.container.resolve(_EtherealMailProvider.EtherealMailProvider),
  ses: _tsyringe.container.resolve(_SESMailProvider.SESMailProvider)
};

_tsyringe.container.registerInstance("MailProvider", mailProvider[process.env.MAIL_PROVIDER]);

const diskStorage = {
  local: _LocalStorageProvider.LocalStorageProvider,
  s3: _S3StorageProvider.S3StorageProvider
};

_tsyringe.container.registerSingleton("StorageProvider", diskStorage[process.env.disk]);