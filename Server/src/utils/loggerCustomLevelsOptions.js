import winston from "winston";

const customLevelOptions = {
  levels: { fatal: 0, error: 1, warn: 2, info: 3, http: 4, debug: 5 },
  colors: {
    debug: "blue",
    http: "green",
    info: "cyan",
    warning: "yellow",
    error: "red",
    fatal: "magenta",
  },
};
export default customLevelOptions;
