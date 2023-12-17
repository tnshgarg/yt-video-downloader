const fs = require("fs");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const { SingleBar, Presets } = require("cli-progress");

async function downloadYouTubeVideoWithAudio(videoUrl, outputFilePath) {
  try {
    const videoInfo = await ytdl.getInfo(videoUrl);
    const videoFormat = ytdl.chooseFormat(videoInfo.formats, {
      quality: "highestvideo",
    });
    const audioFormat = ytdl.chooseFormat(videoInfo.formats, {
      quality: "highestaudio",
    });

    const videoReadableStream = ytdl(videoUrl, { format: videoFormat });
    const audioReadableStream = ytdl(videoUrl, { format: audioFormat });

    const fileWriteStreamVideo = fs.createWriteStream("tempVideo.mp4");
    const fileWriteStreamAudio = fs.createWriteStream("tempAudio.mp3");

    const videoSize = parseInt(videoFormat.contentLength);
    const audioSize = parseInt(audioFormat.contentLength);
    const totalSize = videoSize + audioSize;

    const progressBar = new SingleBar({}, Presets.shades_classic);
    progressBar.start(totalSize, 0);

    const videoPromise = new Promise((resolve, reject) => {
      videoReadableStream.pipe(fileWriteStreamVideo);

      videoReadableStream.on("data", (chunk) => {
        progressBar.increment(chunk.length);
      });

      fileWriteStreamVideo.on("finish", () => {
        progressBar.stop();
        resolve();
      });

      fileWriteStreamVideo.on("error", reject);
    });

    const audioPromise = new Promise((resolve, reject) => {
      audioReadableStream.pipe(fileWriteStreamAudio);

      audioReadableStream.on("data", (chunk) => {
        progressBar.increment(chunk.length);
      });

      fileWriteStreamAudio.on("finish", resolve);
      fileWriteStreamAudio.on("error", reject);
    });

    await Promise.all([videoPromise, audioPromise]);

    await mergeVideoAndAudio("tempVideo.mp4", "tempAudio.mp3", outputFilePath);

    // Clean up temporary files
    fs.unlinkSync("tempVideo.mp4");
    fs.unlinkSync("tempAudio.mp3");

    console.log("Video with audio downloaded and merged successfully");
  } catch (error) {
    console.error(
      "Error downloading and merging video with audio:",
      error.message
    );
    throw error;
  }
}

async function mergeVideoAndAudio(videoPath, audioPath, outputFilePath) {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(videoPath)
      .input(audioPath)
      .videoCodec("copy")
      .audioCodec("aac")
      .output(outputFilePath)
      .on("end", resolve)
      .on("error", reject)
      .run();
  });
}

function generateRandomVideoName() {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(7); // Generates a random alphanumeric string

  return `video_${timestamp}_${randomString}`;
}

const videoUrl = process.argv[2];
const outputFilePath = `/Users/tanishgarg/Downloads/${generateRandomVideoName()}.mp4`;

downloadYouTubeVideoWithAudio(videoUrl, outputFilePath).catch((error) =>
  console.error("Download error:", error)
);
