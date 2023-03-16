#! /usr/bin/env bash

if [[ $(git status --porcelain docs) ==  "" ]]; then
    echo "Docs are up to date."
    exit 0
else
    echo "Docs have not been updated. Please run 'yarn documentation' and commit the changes."
    exit 1 
fi
