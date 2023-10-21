let defaultImageName = "";
defaultImageName = "taylor";
defaultImageName = "moon";
defaultImageName = "bladeRunner";

const urls = {
  pythonServerUrl: "http://127.0.0.1:8000/",
  reactUrl: "http://localhost:5173",
};

const paths = { rawImagesPath: "../../../static2/rawImages/inUse/" };

const rawImages = [
  {
    imageName: "bladeRunner",
    apiName: "bladerunner",
    fileName: "bladeRunnerRaw001.jpg",
  },
  { imageName: "moon", apiName: "moon", fileName: "moonManRaw002.jpg" },
  { imageName: "taylor", apiName: "taylor", fileName: "taylorRaw001.png" },
  { imageName: "picnic", apiName: "", fileName: "picnicRaw001.jpg" },
  { imageName: "et", apiName: "", fileName: "etRaw001.jpg" },
];

const getApiNameFromImageName = ({ imageName }) => {
  return (
    rawImages.find((image) => image.imageName === imageName)?.apiName ||
    "apiName not found"
  );
};

export default {
  urls,
  rawImages,
  paths,
  getApiNameFromImageName,
  defaultImageName,
};
