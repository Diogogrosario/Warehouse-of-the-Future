#!/bin/sh

gdir="$(git rev-parse --git-dir)"
prehook="${gdir}/hooks/pre-commit"
hookf="${gdir}/hooks/mesh_communication.git-code-format.pre-commit.sh"

echo "If it doesn't work, just remove the .git/hooks/pre-commit file, where .git is the git directory of this project. Thank you!" || exit 69

rm -f -- "$prehook" "$hookf"
