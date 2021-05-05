"use strict";
const ogs = require("open-graph-scraper");
const serverless = require("serverless-http");
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient({region:"ap-south-1"});
//using express middleware
const express = require("express");
const app = express();

app.use(express.json()); //parse the json body
app.use((req, res, next) => {
  const params = {
    TableName: "og-metadata",
    Key: {
      requestUrl: req.body.url,
    },
  };
  dynamoDb.get(params, (err, result) => {
    //check if the og metadata exists in dynamodb cache
    if (result && result.Item) {
      console.log("from cache");
      res.send(result.Item);
    } else {
    //else forward request to get og-metadata
      next();
    }
  });
});

app.post("/metadata", (req, res) => {
  const url = req.body.url; //get URL from req body
  const options = { url };
  ogs(options, (error, results, response) => {
    //open graph scrapper returns :
    //error (in case of error)
    //results (all og params)
    //response (entire html)
    if (!error) {
      const urlOg = {
        TableName: "og-metadata",
        Item: results,
      };
      //save og-metadata to dynamodb cache
      dynamoDb.put(urlOg, (err, status) => {
        res.send(results);
      });
    } else {
      res.status(503).send(error);
    }
  });
});

module.exports.hello = serverless(app);
