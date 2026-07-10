import fs from "fs";
import path from "path";
import zlib from "zlib";

const html = fs.readFileSync("Qinetic-standalone.html", "utf8");
const outDir = "scripts/unpacked";
const assetsDir = path.join(outDir, "assets");

function extractScript(type) {
  const re = new RegExp(
    `<script type="${type.replace("/", "\\/")}">([\\s\\S]*?)<\\/script>`
  );
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

const manifest = JSON.parse(extractScript("__bundler/manifest"));
const templateRaw = JSON.parse(extractScript("__bundler/template"));
const extResources = JSON.parse(extractScript("__bundler/ext_resources") || "[]");

fs.mkdirSync(assetsDir, { recursive: true });

const fileMap = {};
for (const [uuid, entry] of Object.entries(manifest)) {
  const binaryStr = Buffer.from(entry.data, "base64");
  let finalBytes = binaryStr;
  if (entry.compressed) {
    finalBytes = zlib.gunzipSync(binaryStr);
  }

  const ext =
    entry.mime?.includes("javascript")
      ? ".js"
      : entry.mime?.includes("woff2")
        ? ".woff2"
        : entry.mime?.includes("png")
          ? ".png"
          : entry.mime?.includes("svg")
            ? ".svg"
            : entry.mime?.includes("css")
              ? ".css"
              : ".bin";

  const filename = `${uuid}${ext}`;
  fs.writeFileSync(path.join(assetsDir, filename), finalBytes);
  fileMap[uuid] = `assets/${filename}`;
}

let template = templateRaw;
for (const uuid of Object.keys(manifest)) {
  template = template.split(uuid).join(fileMap[uuid]);
}

fs.writeFileSync(path.join(outDir, "template.html"), template);

const textMatches = [...template.matchAll(/>([^<]{4,200})</g)]
  .map((m) => m[1].trim().replace(/\s+/g, " "))
  .filter((t) => !t.startsWith("{") && !t.includes("function") && !t.startsWith("/*"));

console.log("Template length:", template.length);
console.log("Manifest entries:", Object.keys(manifest).length);
console.log("Ext resources:", extResources.length);

console.log("\n--- Text content ---");
[...new Set(textMatches)].slice(0, 80).forEach((t) => console.log(t));

console.log("\n--- IDs ---");
console.log([...new Set([...template.matchAll(/id="([^"]+)"/g)].map((m) => m[1]))].join(", "));

console.log("\n--- Inline style blocks ---");
const styleBlocks = [...template.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)];
console.log("Style block count:", styleBlocks.length);
styleBlocks.forEach((block, i) => {
  const content = block[1].trim();
  console.log(`\nStyle ${i + 1} (${content.length} chars), preview:`);
  console.log(content.slice(0, 800));
});

console.log("\n--- Script src ---");
[...template.matchAll(/<script[^>]*src="([^"]+)"[^>]*>/g)].forEach((m) =>
  console.log(m[1])
);
