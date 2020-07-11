"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const open_1 = __importDefault(require("open"));
const assertions_1 = require("./assertions");
const parent_1 = require("./dbscan/parent");
const signale_1 = __importDefault(require("signale"));
class NirikshakReporter {
    onRunComplete(contextSet, results) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                signale_1.default.info(`Processing your test results`);
                if (!results.numTotalTests) {
                    signale_1.default.warn(`No tests ran.`);
                    return;
                }
                const htmlData = {
                    total: results.numTotalTests,
                    passed: results.numPassedTests,
                    failed: results.numFailedTests,
                };
                if (results.numFailedTests) {
                    const assertions = [];
                    results.testResults.forEach((t) => t.testResults.forEach((res) => res.status === "failed" &&
                        assertions.push(assertions_1.parseAssertion(res))));
                    let promise = null;
                    if (results.numFailedTests > 100) {
                        signale_1.default.info(`Starting clustering`);
                        promise = parent_1.runDBScanParallel({
                            dataset: assertions,
                            epsilon: 0.4,
                            minPoints: 7,
                        });
                    }
                    signale_1.default.info(`Starting grouping`);
                    htmlData.parsedAssertions = assertions_1.parseAssertions(assertions);
                    signale_1.default.complete(`Grouping done`);
                    if (promise) {
                        htmlData.clustering = yield promise;
                        signale_1.default.complete(`Clustering done`);
                    }
                }
                signale_1.default.info(`Writing report`);
                let htmlFile = (yield fs_extra_1.default.readFile(path_1.default.resolve(__dirname, "../static/index.html"))).toString();
                htmlFile = htmlFile.replace("{{testResult}}", JSON.stringify(htmlData));
                const dest = path_1.default.resolve("test-report.html");
                yield fs_extra_1.default.writeFile(dest, htmlFile);
                open_1.default(dest);
                signale_1.default.success("Report generated successfully");
            }
            catch (e) {
                signale_1.default.fatal(e);
            }
        });
    }
}
exports.default = NirikshakReporter;
//# sourceMappingURL=index.js.map