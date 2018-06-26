const replace = require("replace-in-file"),
    config = {};
if (process.argv[2] == "nolicense") {
    const contributionOptions = {
        files: [
            "com.visualbi.echo/contribution.xml"
        ],
        from: /<defaultValue property=\"codestate\">active<\/defaultValue>/g,
        to: '<defaultValue property="codestate">enabled</defaultValue>'
    };
    try {
        let changes = replace.sync(contributionOptions);
        console.log("Modified files:", changes.join(", "));
    } catch (error) {
        console.error("Error occurred:", error);
    }
} else {
    config.date = process.argv[2]
    config.key = process.argv[3]
    config.hardstop = process.argv[4]
    config.logo = process.argv[5]
    const contributionOptions = {
        files: [
            "com.visualbi.echo/contribution.xml"
        ],
        from: /<defaultValue property=\"codestate\">active<\/defaultValue>/g,
        to: '<defaultValue property="codestate">active</defaultValue>'
    };
    try {
        let changes = replace.sync(contributionOptions);
        console.log("Modified files:", changes.join(", "));
    } catch (error) {
        console.error("Error occurred:", error);
    }
    contributionOptions.from = /<defaultValue property=\"dateexp\">2020-12-19<\/defaultValue>/g;
    contributionOptions.to = ` <defaultValue property="dateexp">${config.date}</defaultValue>`;
    try {
        let changes = replace.sync(contributionOptions);
        console.log("Modified files:", changes.join(", "));
    } catch (error) {
        console.error("Error occurred:", error);
    }
    contributionOptions.from = /<defaultValue property=\"imglog\">false<\/defaultValue>/g;
    contributionOptions.to = ` <defaultValue property="imglog">${config.logo}</defaultValue>`;
    try {
        let changes = replace.sync(contributionOptions);
        console.log("Modified files:", changes.join(", "));
    } catch (error) {
        console.error("Error occurred:", error);
    }
    contributionOptions.from = /<defaultValue property=\"regkey\">{239487-23423423-234234}<\/defaultValue>/g;
    contributionOptions.to = ` <defaultValue property="regkey">${config.key}</defaultValue>`;
    try {
        let changes = replace.sync(contributionOptions);
        console.log("Modified files:", changes.join(", "));
    } catch (error) {
        console.error("Error occurred:", error);
    }
    contributionOptions.from = /<defaultValue property=\"harddate\">2018-07-01<\/defaultValue>/g;
    contributionOptions.to = ` <defaultValue property="harddate">${config.hardstop}</defaultValue>`;
    try {
        let changes = replace.sync(contributionOptions);
        console.log("Modified files:", changes.join(", "));
    } catch (error) {
        console.error("Error occurred:", error);
    }
}
