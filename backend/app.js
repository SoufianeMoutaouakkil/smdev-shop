const getSmartApi = require("@smart-api/mongoose");
require("dotenv").config();
const express = require("express");
const path = require("path");

// server side
const configPath = path.join(__dirname, "config");
const smartApi = getSmartApi({ configPath, apiName: "/my-api" });

// client side
const distPath = path.join(__dirname, "frontend/dist");
smartApi.use(express.static(distPath));
smartApi.get("*", (req, res) => {
    console.log("req.url: ", req.url);
    res.sendFile(path.join(distPath, "index.html"));
});

module.exports = smartApi;
