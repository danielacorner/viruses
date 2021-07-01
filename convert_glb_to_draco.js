// convert .glb files in the public folder to "_draco.glb" equivalent draco-compressed files
// line running e.g.:
// $ gltf-pipeline -i C:\code\viruses\public\models\nanotech\dna_origami_object_80.glb -o C:\code\viruses\public\models\nanotech\dna_origami_object_80_draco.glb -d
const options = {
  dracoOptions: {
    compressMeshes: true,
    compressionLevel: 7,
  },
};

const fsExtra = require("fs-extra");
const { glbToGltf, gltfToGlb, processGltf } = require("gltf-pipeline");

const pathToModels = "./public/models/viruses/";

fsExtra.readdir(pathToModels, (err, files) => {
  files.forEach((file) => {
    if (file.slice(-4) === ".glb") {
      const outputFile = file.slice(0, -4) + "_draco.glb";
      const glb = fsExtra.readFileSync(pathToModels + file);
      // convert glb to gltf
      glbToGltf(glb).then(function (results) {
        console.log("🌟🚨 ~ results", results);
        // convert gltf to draco-gltf
        processGltf(results.gltf).then(function (dracoResults) {
          console.log("🌟🚨 ~ dracoResults", dracoResults);
          // convert back to glb
          gltfToGlb(dracoResults.gltf).then((glbResults) => {
            console.log("🌟🚨 ~ gltfToGlb ~ glbResults", glbResults);
            // fsExtra.writeJsonSync(pathToModels + outputFile, results.glb);
          });
        });
      });

      // const result = await processGlb(glb, options).then(function (results) {
      //   console.log("🌟🚨 ~ results", results);
      //   fsExtra.writeFileSync(pathToModels + outputFile, results.glb);
      //   console.log(
      //     "🌟🚨 ~ pathToModels + outputFile",
      //     pathToModels + outputFile
      //   );
      // });
      // console.log("🌟🚨 ~ result ~ result", result);
    }
  });
  process.exit(0);
});

const bigOak = {
  readStorage: (databaseEntryName) => {
    return new Promise((resolve, reject) => {
      // go to database...
      // once database returns us the data,
      resolve(data);
    });
  },
};

// bigOak.readStorage("some key").
