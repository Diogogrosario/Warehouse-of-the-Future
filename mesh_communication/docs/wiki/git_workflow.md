# Git Workflow

- Development:
  - There are one branch for each team, ours being **t2_development**
  - Noone should push directly to **t2_development** unless it's to update doc
    files
  - Every created branch must have the prefix "t2\_"
- Merges to **t2_development** must be pull requests and the person that
  requests cannot accept own pull requests
- Project owner should accept every pull request that relates to a User Story
- The person responsible of creating merge conflicts should help clear them
- Every merge that closes a user story must be pull requests
- Code practices:
  - Always run auto-formatter before the commit
  - Try to not leave more than one empty line in the code
- Use issues for:
  - User stories
  - Bug fixing
  - Discussing technologies or approaches to problems
- Issues should automatically close on the kanban board (github projects)
