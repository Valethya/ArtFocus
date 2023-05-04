import winston from "winston";

const customLevelOptions = {
  levels: { fatal: 0, error: 1, warning: 2, info: 3, http: 4, debug: 5 },
  colors: {
    fatal: "red",
    error: "brightRed",
    warning: "yellow",
    info: "blue",
    http: "green",
    debug: "magenta",
  },
};
export default customLevelOptions;
