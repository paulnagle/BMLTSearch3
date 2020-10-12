#!/bin/bash -v

echo "***package-android.sh****"


if [[ "$TRAVIS_BRANCH" != "master" ]]
then
    echo "Skipping package Android for non-master branch"
    exit
fi

mkdir -p output

cp  platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk output/bmlt-search-travis-release-unsigned.apk
