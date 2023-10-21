const urls = {
  pythonServerUrl: "http://127.0.0.1:8000/",
  reactUrl: "http://localhost:5173",
};

const paths = { rawImagesPath: "../../../static2/rawImages/inUse/" };

const rawImages = [
  {
    imageName: "bladeRunnerRaw",
    apiName: "bladeRunnerRaw",
    fileName: "bladeRunnerRaw001.jpg",
  },
  { imageName: "moonManRaw", apiName: "moon", fileName: "moonManRaw002.jpg" },
  { imageName: "taylorRaw", apiName: "taylor", fileName: "taylorRaw001.png" },
  { imageName: "picnicRaw", apiName: "", fileName: "picnicRaw001.jpg" },
  { imageName: "eTRaw", apiName: "", fileName: "eTRaw001.jpg" },
];

const getApiNameFromImageName = ({ imageName }) => {
  return (
    rawImages.find((image) => image.imageName === imageName)?.apiName ||
    "apiName not found"
  );
};

export default { urls, rawImages, paths, getApiNameFromImageName };
