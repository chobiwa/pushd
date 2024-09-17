const admin = require('firebase-admin');

class PushServiceGCM {
  validateToken(token) {
    return token
  }

  constructor(conf, logger, tokenResolver) {
    this.logger = logger
    if (conf.concurrency == null) {
      conf.concurrency = 10
    }

    var serviceAccount = require("../../service-account-pkey.json");

    this.firebaseDriver = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  push(subscriber, subOptions, payload) {
    return subscriber.get((info) => {
      const note = {
        notification: {
          title: payload.localizedTitle(info.lang),
          body: payload.localizedMessage(info.lang)
        },
        data: {},
        token:subscriber.info.token
      };
      for (let key in payload.data) {
        note.data[key] = payload.data[key]
      }

      this.firebaseDriver.messaging().send(note, false).then((response) => {
        this.logger.warn(`Successfully sent message: ${response}`)
      }).catch((error) => {
        this.logger.error(`GCM Error: ${error}`)
      })
    })
  }
}

exports.PushServiceGCM = PushServiceGCM
