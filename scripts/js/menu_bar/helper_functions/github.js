"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubIssueFromTemplate = exports.GitHubIssue = exports.GitHubRepo = exports.get_issue_url = exports.GitHubRepo_MenuBar_Item = void 0;
const electron_util_1 = require("electron-util");
class GitHubRepo {
    constructor(metadata) {
        this.owner = '';
        this.repo_name = '';
        this.url = '';
        const { owner, repo_name, url, } = metadata;
        this.owner = owner;
        this.repo_name = repo_name;
        if (url) {
            this.url = url;
        }
        else {
            this.url = `https://github.com/${owner}/${repo_name}`;
        }
    }
    ;
}
exports.GitHubRepo = GitHubRepo;
const GitHubRepo_MenuBar_Item = (metadata) => {
    const { label, repo } = metadata;
    const { owner, repo_name, url } = repo;
    var result;
    if (url) {
        result = electron_util_1.openUrlMenuItem({
            label: label,
            url: url
        });
    }
    else {
        result = electron_util_1.openUrlMenuItem({
            label: label,
            url: `https://github.com/${owner}/${repo_name}`,
        });
    }
    ;
    return result;
};
exports.GitHubRepo_MenuBar_Item = GitHubRepo_MenuBar_Item;
class GitHubIssue {
    constructor(metadata) {
        this.assignees = '';
        this.labels = '';
        this.template = '';
        this.title = '';
        const { assignees, labels, template, title, } = metadata;
        this.assignees = assignees;
        this.labels = labels;
        this.template = template;
        this.title = title;
    }
    ;
}
exports.GitHubIssue = GitHubIssue;
const get_issue_url = (repo, issue) => {
    const { owner, repo_name } = repo;
    const { assignees, labels, template, title } = issue;
    const metadata_labels = [
        `assignees=${assignees}`,
        `labels=${labels}`,
        `template=${template}`,
        `title=${title}`,
    ];
    const [assignees_input, labels_input, template_input, title_input,] = metadata_labels;
    const metadata = `${assignees_input}&${labels_input}&${template_input}&${title_input}`;
    const issue_url = `https://github.com/${owner}/${repo_name}/issues/new?${metadata}`;
    return issue_url;
};
exports.get_issue_url = get_issue_url;
class GitHubIssueFromTemplate {
    constructor(template) {
        const { label, repo, issue, } = template;
        return electron_util_1.openUrlMenuItem({
            label: label,
            url: get_issue_url(repo, issue)
        });
    }
}
exports.GitHubIssueFromTemplate = GitHubIssueFromTemplate;
