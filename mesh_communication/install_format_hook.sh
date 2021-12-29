#!/bin/sh

[ "$#" -ne 1 ] && echo "Usage: $0 <pom.xml>" && exit 1

pomxml="$(readlink -f "$1")"

gdir="$(git rev-parse --git-dir)"
prehook="${gdir}/hooks/pre-commit"
hookf="${gdir}/hooks/mesh_communication.git-code-format.pre-commit.sh"

printf "%s\n\"%s\"" "#!/bin/sh" "$hookf" >"$prehook"
chmod +x "$prehook"

format_code_cmd="mvn -f \"${pomxml}\" git-code-format:format-code git-code-format:format-code | grep -F '[ERROR]' && exit 1"
recommit_files_cmd="git diff --cached --name-only --diff-filter=ACM -z | xargs -0 -I '{}' git add -u -- '{}'"
printf -- "%s\n%s\n%s" \
  "#!/bin/sh" \
  "$format_code_cmd" \
  "$recommit_files_cmd" >"$hookf"
chmod +x "$hookf"
