export const items = new Map()
  .set("default", { id: "myDefaultFile", src: "assets/default" })
  .set("txt", { id: "myTextFile", src: "assets/text.txt" })
  .set("json", { id: "myJsonFile", src: "assets/json.json" })
  .set("jpg", { id: "myImageFile", src: "assets/image.jpg" })
  .set("mp4", { id: "myVideoFile", src: "assets/video.mp4" })
  .set("mp3", { id: "myAudioFile", src: "assets/audio.mp3" })
  .set("xml", { id: "myXmlFile", src: "assets/xml.xml" })
  .set("svg", { id: "mySvgFile", src: "assets/xml.svg" })
  .set("html", { id: "myHtmlFile", src: "assets/xml.html" })
  .set("font", { id: "myFont", src: "Open Sans Regular", loader: "Font" });

export const expected = new Map()
  .set("string", `test string\n`)
  .set("font", "myFont")
  .set("json", { test: "json" });

export const manifestSrc = "assets/manifest.json";
