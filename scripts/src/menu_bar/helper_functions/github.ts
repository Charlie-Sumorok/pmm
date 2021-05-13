import { openUrlMenuItem } from 'electron-util';

class GitHubRepo {
	owner = '';
	repo_name = '';
	url? = '';
	constructor(metadata: GitHubRepo) {
		const { owner, repo_name, url } = metadata;
		this.owner = owner;
		this.repo_name = repo_name;
		if (url) {
			this.url = url;
		} else {
			this.url = `https://github.com/${owner}/${repo_name}`;
		}
	}
}

const gitHubRepo_MenuBar_Item = ({
	label,
	repo,
}: {
	label: string;
	repo: GitHubRepo;
}) => {
	const { owner, repo_name, url } = repo;

	return openUrlMenuItem({
		label,
		url: url ?? `https://github.com/${owner}/${repo_name}`,
	});
};

class GitHubIssue {
	assignees?: string = '';
	labels?: string = '';
	template?: string = '';
	title?: string = '';

	constructor(metadata: GitHubIssue) {
		const { assignees, labels, template, title } = metadata;
		this.assignees = assignees;
		this.labels = labels;
		this.template = template;
		this.title = title;
	}
}

const get_issue_url = (repo: GitHubRepo, issue: GitHubIssue) => {
	const { owner, repo_name } = repo;
	const { assignees, labels, template, title } = issue;
	const metadata_labels = [
		`assignees=${assignees}`,
		`labels=${labels}`,
		`template=${template}`,
		`title=${title}`,
	];
	const [
		assignees_input,
		labels_input,
		template_input,
		title_input,
	] = metadata_labels;
	const metadata = `${assignees_input}&${labels_input}&${template_input}&${title_input}`;

	const issue_url = `https://github.com/${owner}/${repo_name}/issues/new?${metadata}`;
	return issue_url;
};

interface IssueTemplate_MenuBar {
	label: string;

	repo: GitHubRepo;
	issue: GitHubIssue;
}

const gitHubIssueFromTemplate = (template: IssueTemplate_MenuBar) => {
	const { label, repo, issue } = template;
	return openUrlMenuItem({
		label,
		url: get_issue_url(repo, issue),
	});
};

export {
	gitHubRepo_MenuBar_Item,
	get_issue_url,
	GitHubRepo,
	GitHubIssue,
	gitHubIssueFromTemplate,
};
