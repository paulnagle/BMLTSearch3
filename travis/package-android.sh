#!/bin/bash -v

echo "***package-android.sh****"


if [[ "$TRAVIS_BRANCH" != "master" ]]
then
    echo "Skipping package Android for non-master branch"
    exit
fi

mkdir -p output
cp platforms/android/build/outputs/apk/android-release-unsigned.apk output/bmlt-search-travis-release-unsigned.apk