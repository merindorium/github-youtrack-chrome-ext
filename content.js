var youtrack_link = '';
var issue_re = new RegExp('(*-[0-9]{1,})', 'g');

var currentURL = window.location.href;

if (currentURL.includes('/commit/')) {
    processFullCommit();
}
else if (currentURL.includes('/commits/')) {
    processItemsList();
}

function addBtnToFullCommit(issueNumber, fullCommit) {
    var btn = document.createElement('a');
    btn.className = 'btn btn-outline float-right';
    btn.href = youtrack_link + issueNumber;
    btn.innerText = 'YouTrack';
    btn.style.marginRight = '5pt';
    btn.target="_blank";

    fullCommit.insertBefore(btn, fullCommit.children[1]);
}

function extractIssueFromCommit(commit) {
    var title = commit.getElementsByClassName('commit-title');

    if (title.length > 0) {
        return title[0].innerText.match(issue_re);
    }
    return null;
}

function processFullCommit() {
    var fullCommitBody = document.getElementsByClassName('commit full-commit');

    if (fullCommitBody.length > 0) {
        var fullCommit = fullCommitBody[0];
        var issueNumber = extractIssueFromCommit(fullCommit);

        if (issueNumber !== null) {
            addBtnToFullCommit(issueNumber, fullCommit);
        }
    }
}

function addBtnToListItem(issueNumber, commit) {
    var btn = document.createElement('a');
    btn.className = 'btn btn-outline';
    btn.href = youtrack_link + issueNumber;
    btn.innerText = 'YouTrack';
    btn.style.marginRight = '5pt';
    btn.target="_blank";

    commit.insertBefore(btn, commit.firstChild);
}

function processItemsList() {
    var itemsList = document.getElementsByClassName('commit commits-list-item');

    for (var i = 0; i < itemsList.length; i++) {
        var issueNumber = extractIssueFromCommit(itemsList[i]);

        if (issueNumber !== null) {
            addBtnToListItem(issueNumber, itemsList[i].getElementsByClassName('commit-links-cell')[0]);
        }
    }
}


