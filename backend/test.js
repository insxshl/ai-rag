require("dotenv").config();

const model = require("./src/config/groq");

async function test() {
  try {
    const result = await model.generateContent(
      "Say hello in one sentence."
    );

    const response =
      result.response.text();

    console.log(response);
  } catch (error) {
    console.log("ERROR:");
    console.log(error);
  }
}

test();