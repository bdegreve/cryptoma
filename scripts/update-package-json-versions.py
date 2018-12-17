import os
import json
import subprocess
from collections import OrderedDict


def main(package_path):
    with open(package_path, 'r') as fp:
        data = json.load(fp, object_pairs_hook=OrderedDict)

    cwd = os.path.dirname(os.path.abspath(package_path))
    update_version_numbers(data["dependencies"], cwd)
    update_version_numbers(data["devDependencies"], cwd)

    raw = json.dumps(data, fp, indent=2, separators=(',', ': '))
    if not raw.endswith('\n'):
        raw += '\n'
    with open(package_path, 'w', newline='\n') as fp:
        fp.write(raw)


def update_version_numbers(dependencies, cwd):
    installed = json.loads(
        subprocess.check_output(
            ["npm.cmd", "list", "--json", "--depth=1"] + list(dependencies),
            cwd=cwd,
            universal_newlines=True))
    for key in dependencies:
        version = dependencies[key]
        if version.startswith('^'):
            prefix = '^'
        elif version.startswith('~'):
            prefix = '~'
        else:
            prefix = ''
        info = installed["dependencies"][key]
        dependencies[key] = prefix + info["version"]
        print("{}: {}".format(key, dependencies[key]))


if __name__ == "__main__":
    import sys
    package_path = sys.argv[0] if len(sys.argv) > 1 else "package.json"
    main(package_path)
