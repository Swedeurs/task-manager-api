export const preset = "ts-jest";
export const testEnvironment = "node";
export const transform = {
    "^.+\\.tsx?$": "ts-jest",
};
export const moduleFileExtensions = ["ts", "js", "json", "node"];
export const transformIgnorePatterns = ["<rootDir>/node_modules/"];
