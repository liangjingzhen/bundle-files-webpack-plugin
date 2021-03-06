import {ConcatSource} from "webpack-sources";
import * as fs from "fs";

function bundleFiles(list) {
    let content = "";
    for (let i = 0; i < list.length; i++) {
        content += fs.readFileSync(list[i], "utf-8") + "\n";
    }
    return content;
}

class BundleFilesPlugin {
    constructor(options = {}) {
        this.options = options;
        this.files = this.options.files || [];
        this.targets = this.options.targets || [];
        this.excludes = this.options.excludes || [];
    }

    apply(compiler) {
        const files = this.files;
        const targets = this.targets;
        const excludes = this.excludes;
        let content = "";
        if (files.length > 0) {
            content = bundleFiles(files);
        }
        compiler.hooks.compilation.tap("BundleFilesPlugin", compilation => {
            compilation.hooks.optimizeChunkAssets.tap("BundleFilesPlugin", (chunks) => {
                for (const chunk of chunks) {
                    for (const file of chunk.files) {
                        if (excludes.includes(file)) {
                            continue;
                        }
                        if (targets.length > 0) {
                            if (targets.includes(file)) {
                                compilation.assets[file] = new ConcatSource(
                                    content,
                                    compilation.assets[file]
                                );
                            }
                        } else {
                            compilation.assets[file] = new ConcatSource(
                                content,
                                compilation.assets[file]
                            );
                        }
                    }
                }
            });
        });
    }
}


export default BundleFilesPlugin;