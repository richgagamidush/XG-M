
const { zokou } = require("../framework/zokou");
const { uploadtoimgur } = require("../framework/imgur"); // Ensure this path and export are correct
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

zokou({
  nomCom: "vision",
  aliases: ["analize", "generate"],
  reaction: '🤖',
  categorie: "search"
}, async (dest, zk, commandeOptions) => {
  const { repondre, msgRepondu, auteurMessage, arg } = commandeOptions;
  const text = arg.join(" ").trim(); // Get the instruction text

  if (msgRepondu) {
    console.log(msgRepondu);

    // Check if the user has provided both an image and an instruction
  if (!msg || !instruction) {
    message.reply("You need to tag an image and provide some instructions. Either you did not give an instruction or did not tag an image.");
    return;
  }

  // Check if the message contains an image
  let imageMessage;
  if (msg.imageMessage) {
    imageMessage = msg.imageMessage;
  } else {
    message.reply("You have not tagged an image.");
    return;
  }

  try {
    // Download the image from the message
    let downloadedImage = await client.downloadAndSaveMediaMessage(imageMessage);

    // Upload the image to imgur
    let imageUrl = await uploadToImgur(downloadedImage);

    // Notify the user that the image is being analyzed
    message.reply("Please wait, the AI is analyzing the image...");

    // Call an external API to analyze the image based on the provided instruction
    let analysisResult = await (await fetch(`https://bk9.fun/ai/geminiimg?url=${imageUrl}&q=${instruction}`)).json();

    // Send the analysis result to the user
    const response = {
      text: analysisResult.BK9  // Assuming BK9 contains the analysis result
    };

    await client.sendMessage(message.chat, response, {
      quoted: message
    });

  } catch (error) {
    message.reply("An error occurred: " + error);
  }
};
