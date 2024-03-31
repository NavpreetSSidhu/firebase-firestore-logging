/* eslint-disable */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { event } = require("firebase-functions/v1/analytics");
const {
  onDocumentUpdated,
  onDocumentCreated,
} = require("firebase-functions/v2/firestore");

const { initializeApp } = require("firebase-admin/app");

initializeApp();

exports.updateUser = onDocumentUpdated("users/{userId}", (event) => {
  const newValue = event.data.after.data();
  const name = newValue.name;
  const userId = context.params.userId;
  console.log(
    `Profile update for user ${name} and id ${userId}: ${JSON.stringify(
      newValue
    )}`
  );
  logger.log(
    `Profile update for user ${name} and id ${userId}: ${JSON.stringify(
      newValue
    )}`
  );
});

exports.makeuppercase = onDocumentCreated("/messages/{documentId}", (event) => {
  const original = event.data.data().original;

  logger.log("Uppercasing", event.params.documentId, original);

  const uppercase = original.toUpperCase();
  return event.data.ref.set({ uppercase }, { merge: true });
});
