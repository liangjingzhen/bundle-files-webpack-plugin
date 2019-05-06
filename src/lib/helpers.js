import * as fs from "fs";

export function bundleFiles(list) {
    let content = "";
    for (let i = 0; i < list.length; i++) {
        content += fs.readFileSync(list[i], "utf-8") + "\n";
    }
    return content;
}