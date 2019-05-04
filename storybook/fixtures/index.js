const createProcess = ({
  _id,
  title,
  description = "demo",
  elements,
  stepMode
}) => {
  return {
    description: {
      _id,
      title,
      description,
      uid: `${_id.toUpperCase()}_DEMO`,
      steps: [
        {
          _id: "59bf14940774e451fcd2f0de",
          stepType: "CLIENT",
          commandLabel: "next",
          mode: stepMode || "DEFAULT",
          form: {
            elements
          }
        }
      ]
    }
  };
};

export default {
  input: createProcess({ elements: require("./input.json"), _id: "input" }),
  section: createProcess({
    elements: require("./section.json"),
    _id: "section"
  }),
  selectset: createProcess({
    elements: require("./selectset.json"),
    _id: "selectset"
  }),
  select: createProcess({ elements: require("./select.json"), _id: "select" }),
  webview: createProcess({
    elements: require("./webview.json"),
    stepMode: "VIEW",
    _id: "webview"
  }),
  image: createProcess({ elements: require("./image.json"), _id: "image" }),
  grid: createProcess({
    elements: require("./grid.json"),
    _id: "grid",
    stepMode: "VIEW"
  }),
  fileupload: createProcess({
    elements: require("./fileupload.json"),
    _id: "fileupload"
  }),
  actionview: createProcess({
    elements: require("./actionview.json"),
    stepMode: "VIEW",
    _id: "actionview"
  }),
  list: createProcess({ elements: require("./list.json"), _id: "list" }),
  "fetch-grid-template": require("./fetch-grid-template.json"),
  label: createProcess({ elements: require("./label.json"), _id: "label" }),
  select: createProcess({ elements: require("./select.json"), _id: "select" }),
  gender: require("./gender.json"),
  sink: createProcess({ elements: require("./sink.json"), _id: "sink" })
};
