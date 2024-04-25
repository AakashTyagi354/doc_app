const documentModel = require("../models/documentModel.js");
const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 512 });
const CryptoJS = require("crypto-js");

exports.getDocuments = async (req, res) => {
  try {
    const { userId } = req.body;
    const documents = await documentModel.find({ userId });
    console.log("documets", documents);

    const decryptedDocuments = documents.map((doc) => {
      var bytes = CryptoJS.AES.decrypt(doc.url, "secret key 123");
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      console.log("doc url", originalText);
      return {
        ...doc,
        url: originalText,
      };
    });
    console.log(decryptedDocuments, "dec");

    res.status(200).send({
      success: true,
      message: "Documents fetched successfully",
      documents: decryptedDocuments,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error while getting documents",
    });
  }
};

exports.getDocumentsUsers = async (req, res) => {
  try {
    const { userId } = req.body;
    const documents = await documentModel.find({ userId });

    res.status(201).send({
      success: true,
      message: "documents fetched Successfully",
      documents,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting documents",
    });
  }
};

exports.createDocuments = async (req, res) => {
  try {
    const { userId, name, url, type, size } = req.body;

    console.log("hello world");
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !userId:
        return res.status(500).send({ error: "userId is Required" });
      case !url:
        return res.status(500).send({ error: "url is Required" });
      case !type:
        return res.status(500).send({ error: "type is Required" });
      case !size:
        return res.status(500).send({ error: "size is Required" });
    }
    // const encryptedFileUrl = key.encrypt(url, "base64");
    // console.log(encryptedFileUrl);
    var ciphertext = CryptoJS.AES.encrypt(url, "secret key 123").toString();
    console.log(ciphertext);

    const newDocument = new documentModel({
      userId,
      name,
      url: ciphertext,
      type,
      size,
    }); // Create new instance
    await newDocument.save();

    res.status(201).send({
      success: true,
      message: "Document created Successfully",
      newDocument,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Creating document",
    });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const { documentId } = req.body;

    const document = await documentModel.findById(documentId);

    if (!document) {
      return res.status(404).send({ error: "Document not found" });
    }

    await documentModel.findByIdAndDelete(documentId);

    res.status(200).send({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting document",
    });
  }
};
