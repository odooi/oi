#!/bin/bash
community=$(cd -- "$(dirname "$0")" &> /dev/null && cd ../../.. && pwd)
tooling="$community/addons/web/tooling"
testRealPath="$(realpath --relative-to=. "$tooling/hooks")"
if [[ $testRealPath == "" ]]; then
    echo "Please install realpath"
    exit 1
fi

enableInDir () {
    cd "$1" || exit
    hooksPath="$(realpath --relative-to=. "$tooling/hooks")"
    git config core.hooksPath "$hooksPath"
    cp "$tooling/_eslintignore" .eslintignore
    cp "$tooling/_eslintrc.json" .eslintrc.json
    cp "$tooling/_jsconfig.json" jsconfig.json
    cp "$tooling/_package.json" package.json
    if [[ $2 == "copy" ]]; then
        # -i is not supported on mac
        sed "s@addons@$pathFromPlusToCommunity/addons@g" jsconfig.json > tmp.json
        mv tmp.json jsconfig.json
        # copy over node_modules and package-lock to avoid double "npm install"
        cp "$community/package-lock.json" package-lock.json
        cp -a "$community/node_modules" node_modules
    else
        npm install
    fi
    cd - &> /dev/null
}

read -p "Do you want the tooling installed in plus too ? [y, n]" willingToInstallToolingInPlus
if [[ $willingToInstallToolingInPlus != "n" ]]
then
    read -p "What is the relative path from community to plus ? (../plus)" pathToPlus
    pathToPlus=${pathToPlus:-../plus}
    pathToPlus=$(realpath "$community/$pathToPlus")
    pathFromPlusToCommunity=$(realpath --relative-to="$pathToPlus" "$community")
fi

enableInDir "$community"

if [[ $willingToInstallToolingInPlus != "n" ]]
then
    enableInDir "$pathToPlus" copy
fi

echo ""
echo "JS tooling have been added to the roots"
echo "Make sure to refresh the eslint and typescript service and configure your IDE so it uses the config files"
echo 'For VSCode, look inside your .vscode/settings.json file ("editor.defaultFormatter": "dbaeumer.vscode-eslint")'
echo ""
