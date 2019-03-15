const rootUrl =
  "https://raw.githubusercontent.com/dmnsgn/async-preloader/master/test/assets/";

export const items = new Map()
  .set("default", { id: "myDefaultFile", src: `${rootUrl}default` })
  .set("txt", { id: "myTextFile", src: `${rootUrl}text.txt` })
  .set("json", { id: "myJsonFile", src: `${rootUrl}json.json` })
  .set("jpg", { id: "myImageFile", src: `${rootUrl}image.jpg` })
  .set("mp4", { id: "myVideoFile", src: `${rootUrl}video.mp4` })
  .set("mp3", { id: "myAudioFile", src: `${rootUrl}audio.mp3` })
  .set("xml", { id: "myXmlFile", src: `${rootUrl}xml.xml` })
  .set("svg", { id: "mySvgFile", src: `${rootUrl}xml.svg` })
  .set("html", { id: "myHtmlFile", src: `${rootUrl}xml.html` })
  .set("defaultXml", {
    id: "myXmlDefaultFile",
    src: `${rootUrl}xml`,
    loader: "Xml"
  });

export const expected = new Map()
  .set("string", `test string\n`)
  .set(
    "html",
    new DOMParser().parseFromString(
      /* html */ `<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
</head>
<body>

</body>
</html>
\n`,
      "text/html"
    )
  )
  .set(
    "svg",
    new DOMParser().parseFromString(
      /* html */ `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="100" viewBox="0 0 3 2">
  <rect width="1" height="2" x="0" fill="#008d46" />
  <rect width="1" height="2" x="1" fill="#ffffff" />
  <rect width="1" height="2" x="2" fill="#d2232c" />
</svg>
\n`,
      "image/svg+xml"
    )
  )
  .set(
    "xml",
    new DOMParser().parseFromString(
      /* xml */ `<?xml version="1.0"?>
<planet>
	<ocean>
		<name>Arctic</name>
		<area>13,000</area>
		<depth>1,200</depth>
	</ocean>
	<ocean>
		<name>Atlantic</name>
		<area>87,000</area>
		<depth>3,900</depth>
	</ocean>
	<ocean>
		<name>Pacific</name>
		<area>180,000</area>
		<depth>4,000</depth>
	</ocean>
	<ocean>
		<name>Indian</name>
		<area>75,000</area>
		<depth>3,900</depth>
	</ocean>
	<ocean>
		<name>Southern</name>
		<area>20,000</area>
		<depth>4,500</depth>
	</ocean>
</planet>

\n`,
      "application/xml"
    )
  )
  .set(
    "defaultXml",
    new DOMParser().parseFromString(
      /* xml */ `<?xml version="1.0"?>
<planet>
	<ocean>
		<name>Arctic</name>
		<area>13,000</area>
		<depth>1,200</depth>
	</ocean>
	<ocean>
		<name>Atlantic</name>
		<area>87,000</area>
		<depth>3,900</depth>
	</ocean>
	<ocean>
		<name>Pacific</name>
		<area>180,000</area>
		<depth>4,000</depth>
	</ocean>
	<ocean>
		<name>Indian</name>
		<area>75,000</area>
		<depth>3,900</depth>
	</ocean>
	<ocean>
		<name>Southern</name>
		<area>20,000</area>
		<depth>4,500</depth>
	</ocean>
</planet>

\n`,
      "application/xml"
    )
  )
  .set("json", { test: "json" });

export const fontItem = {
  id: "myFont",
  src: "Open Sans Regular",
  loader: "Font"
};

export const manifestSrc = `${rootUrl}manifest.json`;
