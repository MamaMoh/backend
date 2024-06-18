const express = require("express");
const router = express.Router();

// @route GET api/posts/test
// @desc Tests post route
// @access Public
router.get("/test", (req, res) =>
  /* 	#swagger.tags = ['Post']
#swagger.description = 'Endpoint to Tests post route' */ res.json({
    msg: "posts work",
  })
);


// @route POST api/posts
// @desc Create post
// @access Private
router.post(
  "/",
  async (req, res) => {

console.log(req.body.requestBody);
const image = req.body.requestBody.imageUrl;
const apiToken = req.body.requestBody.apiToken;

const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      version: 'fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003',
      input: {
        image,
      },
    }),
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    console.log(error.detail);
    return;
  }

  const prediction = await response.json();
  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
  }
);














router.post(
    "/:id",
    async (req, res) => {
  
        const response = await fetch(
            "https://api.replicate.com/v1/predictions/" + req.params.id,
            {
              headers: {
                Authorization: `Bearer ${req.body.apiToken}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              mode:"no-cors",
            }
          );
  
          if (response.status !== 200) {
            let error = await response.json();
            res.statusCode = 500;
            res.end(JSON.stringify({ detail: error.detail }));
            return;
          }
  
    const prediction = await response.json();
    res.statusCode = 201;
    res.end(JSON.stringify(prediction));
    }
  );

  

module.exports = router;